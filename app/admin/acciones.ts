"use server";

// Las cuatro acciones del panel. TODAS revisan la sesión antes de tocar la
// base: una acción de servidor es una URL como cualquier otra y podría
// llamarse sin pasar por la pantalla.

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import {
  abrirSesion,
  adminConfigurado,
  cerrarSesion,
  contrasenaCorrecta,
  haySesion,
} from "@/lib/admin-auth";
import { enviarCorreoDeEnvio } from "@/lib/correos";
import { leerConfigEnvios } from "@/lib/config-envios-server";
import type { ConfigEnvios, TramoEnvio } from "@/lib/config-envios";

async function exigirSesion(): Promise<void> {
  if (!(await haySesion())) redirect("/admin/entrar");
}

export type EstadoForma = { error?: string; ok?: string };

// ---------------------------------------------------------------- entrar
export async function entrar(
  _previo: EstadoForma,
  datos: FormData
): Promise<EstadoForma> {
  if (!adminConfigurado()) {
    return {
      error:
        "El panel todavía no tiene contraseña configurada en el servidor.",
    };
  }
  const intento = String(datos.get("password") ?? "");
  if (!contrasenaCorrecta(intento)) {
    // Espera de un segundo: hace lento probar contraseñas a lo bruto.
    await new Promise((r) => setTimeout(r, 1000));
    return { error: "Contraseña incorrecta." };
  }
  await abrirSesion();
  redirect("/admin");
}

// ------------------------------------------------------------------ salir
export async function salir(): Promise<void> {
  await cerrarSesion();
  redirect("/admin/entrar");
}

// -------------------------------------------------------- marcar enviado
export async function marcarEnviado(
  _previo: EstadoForma,
  datos: FormData
): Promise<EstadoForma> {
  await exigirSesion();

  const id = String(datos.get("pedidoId") ?? "");
  const paqueteria = String(datos.get("paqueteria") ?? "").trim() || null;
  const guia = String(datos.get("guia") ?? "").trim() || null;
  if (!id) return { error: "Falta el pedido." };

  const pedido = await prisma.pedido.findUnique({
    where: { id },
    include: { items: true },
  });
  if (!pedido) return { error: "Ese pedido ya no existe." };

  // Solo un pedido pagado puede marcarse como enviado.
  if (pedido.estado !== "pagado" && pedido.estado !== "enviado") {
    return {
      error: `Un pedido en estado "${pedido.estado}" no se puede marcar como enviado.`,
    };
  }

  // Guardia contra el doble clic: el correo sale UNA vez. Se apoya en
  // avisoEnvioEn, no en el estado, para que si el correo falla se pueda
  // reintentar sin quedar atrapado.
  const yaAvisado = pedido.avisoEnvioEn !== null;

  await prisma.pedido.update({
    where: { id: pedido.id },
    data: {
      estado: "enviado",
      paqueteria,
      guia,
      enviadoEn: pedido.enviadoEn ?? new Date(),
    },
  });
  revalidatePath("/admin");
  revalidatePath(`/admin/pedidos/${pedido.id}`);
  revalidatePath(`/pedido/${pedido.id}`);

  if (yaAvisado) {
    return { ok: "Datos actualizados. El aviso al cliente ya se había enviado." };
  }

  try {
    await enviarCorreoDeEnvio({
      numero: pedido.numero,
      nombre: pedido.nombre,
      correo: pedido.correo,
      paqueteria,
      guia,
    });
  } catch {
    return {
      error:
        "El pedido quedó marcado como enviado, pero el correo al cliente no salió. Puedes reintentar el aviso.",
    };
  }

  // Solo se sella DESPUÉS de que el correo salió bien.
  await prisma.pedido.update({
    where: { id: pedido.id },
    data: { avisoEnvioEn: new Date() },
  });
  revalidatePath(`/admin/pedidos/${pedido.id}`);
  return { ok: "Marcado como enviado y aviso mandado al cliente." };
}

// ------------------------------------------------------- guardar envíos
export async function guardarConfigEnvios(
  _previo: EstadoForma,
  datos: FormData
): Promise<EstadoForma> {
  await exigirSesion();

  const actual = await leerConfigEnvios();

  const minimo = pesosACentavos(datos.get("pedidoMinimo"));
  if (minimo === null) return { error: "El pedido mínimo no es un número válido." };

  const zonas: ConfigEnvios["zonas"] = [];
  for (const zona of actual.zonas) {
    const estadosCrudos = datos.get(`estados_${zona.id}`);
    let estados: string[] | "resto" = zona.estados;
    if (zona.estados !== "resto") {
      estados = String(estadosCrudos ?? "")
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean);
      if (estados.length === 0) {
        return { error: `La zona "${zona.nombre}" se quedó sin estados.` };
      }
    }

    const cps = datos.get(`cps_${zona.id}`);
    const codigosPostales =
      zona.codigosPostales === undefined
        ? undefined
        : String(cps ?? "")
            .split(",")
            .map((c) => c.trim())
            .filter((c) => /^\d{5}$/.test(c));

    const tramos: TramoEnvio[] = [];
    for (let i = 0; i < zona.tramos.length; i++) {
      const desde = pesosACentavos(datos.get(`desde_${zona.id}_${i}`));
      const costoCrudo = String(datos.get(`costo_${zona.id}_${i}`) ?? "").trim();
      if (desde === null) {
        return { error: `Un monto "desde" de la zona "${zona.nombre}" no es válido.` };
      }
      if (costoCrudo.toLowerCase() === "cotizar") {
        tramos.push({ desdeCentavos: desde, costoCentavos: "cotizar" as const });
        continue;
      }
      const costo = pesosACentavos(costoCrudo);
      if (costo === null) {
        return {
          error: `Un costo de la zona "${zona.nombre}" no es válido. Usa un número o la palabra "cotizar".`,
        };
      }
      tramos.push({ desdeCentavos: desde, costoCentavos: costo });
    }
    // Los tramos se ordenan de menor a mayor: el cálculo de envío toma el
    // último tramo cuyo "desde" alcanza el subtotal.
    tramos.sort((a, b) => a.desdeCentavos - b.desdeCentavos);

    zonas.push({ ...zona, estados, codigosPostales, tramos });
  }

  const nueva: ConfigEnvios = {
    ...actual,
    pedidoMinimoCentavos: minimo,
    zonas,
  };

  await prisma.configuracion.upsert({
    where: { clave: "envios" },
    update: { datos: nueva as object },
    create: { clave: "envios", datos: nueva as object },
  });
  revalidatePath("/admin/envios");
  revalidatePath("/");
  revalidatePath("/envios");
  revalidatePath("/carrito");
  revalidatePath("/checkout");
  return { ok: "Guardado. Aplica a los pedidos nuevos, no a los que ya se hicieron." };
}

// Convierte "150" o "150.50" (pesos) a centavos enteros. null si no es válido.
function pesosACentavos(valor: FormDataEntryValue | null | string): number | null {
  const texto = String(valor ?? "").trim().replace(/[$,\s]/g, "");
  if (texto === "") return null;
  const n = Number(texto);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.round(n * 100);
}
