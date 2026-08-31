import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { productos } from "@/lib/productos";
import { leerConfigEnvios } from "@/lib/config-envios-server";
import { calcularEnvio } from "@/lib/envios";
import { cpCoincideConEstado, esCpValido, estadoDeCp } from "@/lib/codigos-postales";

export const dynamic = "force-dynamic";

type Cuerpo = {
  items: Array<{ productoId: string; cantidad: number }>;
  nombre: string;
  correo: string;
  telefono: string;
  calle: string;
  colonia: string;
  ciudad: string;
  estado: string;
  codigoPostal: string;
};

function error(mensaje: string, status = 400) {
  return NextResponse.json({ error: mensaje }, { status });
}

export async function POST(req: Request) {
  let cuerpo: Cuerpo;
  try {
    cuerpo = await req.json();
  } catch {
    return error("Solicitud inválida");
  }

  const nombre = (cuerpo.nombre ?? "").trim();
  const correo = (cuerpo.correo ?? "").trim();
  const calle = (cuerpo.calle ?? "").trim();
  const colonia = (cuerpo.colonia ?? "").trim();
  const ciudad = (cuerpo.ciudad ?? "").trim();
  const estado = (cuerpo.estado ?? "").trim();
  const cp = (cuerpo.codigoPostal ?? "").trim();
  const digitosTel = (cuerpo.telefono ?? "").replace(/\D/g, "");

  if (!nombre || !calle || !colonia || !ciudad || !estado)
    return error("Completa todos los campos de la dirección.");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo))
    return error("Revisa tu correo: no parece válido.");
  if (digitosTel.length !== 10)
    return error("El teléfono debe tener 10 dígitos.");
  const telefono = `521${digitosTel}`; // convención del proyecto
  if (!esCpValido(cp)) return error("El código postal debe tener 5 dígitos.");
  if (!cpCoincideConEstado(cp, estado)) {
    const sugerido = estadoDeCp(cp);
    return error(
      sugerido
        ? `Ese código postal es de ${sugerido}, no de ${estado}. Revísalo para que tu pedido llegue bien.`
        : "No reconocemos ese código postal. Revísalo, por favor."
    );
  }

  // Recalcular TODO del lado del servidor: el navegador solo manda ids y
  // cantidades; los precios salen de lib/productos.ts y la configuración viva.
  const lineas = (cuerpo.items ?? [])
    .map((i) => {
      const p = productos.find((x) => x.id === i.productoId);
      const cantidad = Math.floor(Number(i.cantidad));
      return p && cantidad > 0 && cantidad <= 99 ? { producto: p, cantidad } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);
  if (lineas.length === 0) return error("Tu carrito está vacío.");

  const subtotal = lineas.reduce(
    (n, l) => n + l.producto.precioCentavos * l.cantidad,
    0
  );
  const config = await leerConfigEnvios();
  const envio = calcularEnvio(config, subtotal, estado, cp);
  if (envio.tipo === "bajo-minimo")
    return error("El pedido mínimo para envío es de $150.");
  if (envio.tipo === "cotizar")
    return error(
      "Tu código postal es de zona extendida: escríbenos para cotizar tu envío antes de pagar."
    );
  const envioCentavos = envio.tipo === "gratis" ? 0 : envio.costoCentavos;

  // Se limpia la diagonal final por si la variable quedó como
  // "https://tudominio.com/": sin esto, las URLs de regreso y del webhook
  // salen con doble diagonal y Mercado Pago apunta a páginas rotas.
  const sitio = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  if (!sitio || !process.env.MP_ACCESS_TOKEN) {
    return error(
      "El pago en línea aún no está configurado. Intenta más tarde.",
      503
    );
  }

  const pedido = await prisma.pedido.create({
    data: {
      nombre,
      correo,
      telefono,
      calle,
      colonia,
      ciudad,
      estadoEnvio: estado,
      codigoPostal: cp,
      zonaId: envio.zona.id,
      subtotalCentavos: subtotal,
      envioCentavos,
      totalCentavos: subtotal + envioCentavos,
      items: {
        create: lineas.map((l) => ({
          productoId: l.producto.id,
          nombre: l.producto.nombre,
          gramos: l.producto.gramos,
          precioCentavos: l.producto.precioCentavos,
          cantidad: l.cantidad,
        })),
      },
    },
  });

  const { crearPreferencia } = await import("@/lib/mp");
  try {
    const pref = await crearPreferencia({
      pedidoId: pedido.id,
      numero: pedido.numero,
      items: lineas.map((l) => ({
        titulo: `Nuez pecana Maison Nux ${l.producto.gramos} g`,
        cantidad: l.cantidad,
        precioCentavos: l.producto.precioCentavos,
      })),
      envioCentavos,
      correo,
      sitio,
    });
    await prisma.pedido.update({
      where: { id: pedido.id },
      data: { mpPreferenceId: pref.id },
    });
    return NextResponse.json({ url: pref.init_point, pedidoId: pedido.id });
  } catch {
    await prisma.pedido.update({
      where: { id: pedido.id },
      data: { estado: "fallido" },
    });
    return error(
      "No pudimos conectar con Mercado Pago. Intenta de nuevo en un momento.",
      502
    );
  }
}
