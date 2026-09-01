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
  registrarFallo,
  bloqueadoPorIntentos,
} from "@/lib/admin-auth";
import { enviarCorreoDeEnvio } from "@/lib/correos";
import { leerConfigEnvios } from "@/lib/config-envios-server";
import { ESTADOS_MEXICO, type ConfigEnvios, type TramoEnvio } from "@/lib/config-envios";
import { formatoMXN } from "@/lib/formato";

async function exigirSesion(): Promise<void> {
  if (!(await haySesion())) redirect("/admin/entrar");
}

export type EstadoForma = { error?: string; ok?: string };

// Topes de cordura para que un dedazo no deje la tienda cobrando disparates.
const TOPE_ENVIO_CENTAVOS = 500000; // $5,000 de envío
const TOPE_MINIMO_CENTAVOS = 200000; // $2,000 de pedido mínimo

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
  if (await bloqueadoPorIntentos()) {
    return {
      error: "Demasiados intentos fallidos. Espera unos minutos y vuelve a intentar.",
    };
  }
  const intento = String(datos.get("password") ?? "");
  if (!contrasenaCorrecta(intento)) {
    await registrarFallo();
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

  const pedido = await prisma.pedido.findUnique({ where: { id } });
  if (!pedido) return { error: "Ese pedido ya no existe." };

  // El estado se cambia con una sola sentencia condicional: si entre la
  // lectura y la escritura el pedido dejó de estar pagado (un contracargo,
  // otra pestaña), no se pisa nada.
  const marcado = await prisma.pedido.updateMany({
    where: { id, estado: { in: ["pagado", "enviado"] } },
    data: {
      estado: "enviado",
      paqueteria,
      guia,
      enviadoEn: pedido.enviadoEn ?? new Date(),
    },
  });
  if (marcado.count === 0) {
    return {
      error: `Un pedido en estado "${pedido.estado}" no se puede marcar como enviado.`,
    };
  }
  revalidatePath("/admin");
  revalidatePath(`/admin/pedidos/${id}`);
  revalidatePath(`/pedido/${id}`);

  // Guardia contra el doble correo. Se RECLAMA el derecho a mandarlo con una
  // escritura condicional atómica: solo la primera petición consigue
  // avisoEnvioEn = null -> fecha, así que dos clics simultáneos no pueden
  // mandar dos correos. Si el correo falla después, el sello se devuelve.
  const reclamo = await prisma.pedido.updateMany({
    where: { id, avisoEnvioEn: null },
    data: { avisoEnvioEn: new Date() },
  });
  if (reclamo.count === 0) {
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
  } catch (e) {
    // Se libera el sello para poder reintentar el aviso.
    await prisma.pedido.update({
      where: { id },
      data: { avisoEnvioEn: null },
    });
    revalidatePath(`/admin/pedidos/${id}`);
    const motivo = e instanceof Error ? e.message : "";
    return {
      error:
        "El pedido quedó marcado como enviado, pero el correo al cliente no salió. Vuelve a picar el botón para reintentarlo." +
        (motivo ? ` (Motivo: ${motivo})` : ""),
    };
  }

  revalidatePath(`/admin/pedidos/${id}`);
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
  if (minimo === null) {
    return {
      error:
        "El pedido mínimo no es un número válido. Usa punto para los decimales, por ejemplo 150 o 150.50",
    };
  }
  if (minimo > TOPE_MINIMO_CENTAVOS) {
    return {
      error: `El pedido mínimo (${formatoMXN(minimo)}) se ve equivocado. El tope de seguridad es ${formatoMXN(TOPE_MINIMO_CENTAVOS)}.`,
    };
  }

  const zonas: ConfigEnvios["zonas"] = [];
  const estadosVistos = new Map<string, string>(); // estado -> zona que lo tiene

  for (const zona of actual.zonas) {
    // Una zona que se decide por código postal (la extendida) no lleva
    // estados a propósito: no se le pide ninguno ni se valida como si los
    // tuviera.
    const porCodigoPostal = zona.codigosPostales !== undefined;
    let estados: string[] | "resto" = zona.estados;

    if (zona.estados !== "resto" && !porCodigoPostal) {
      estados = String(datos.get(`estados_${zona.id}`) ?? "")
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean);
      if (estados.length === 0) {
        return { error: `La zona "${zona.nombre}" se quedó sin estados.` };
      }
      // Los estados se comparan letra por letra contra el selector del
      // carrito: un acento o una mayúscula de más cambiarían la tarifa de
      // todo un estado sin que nadie lo note.
      const malos = estados.filter((e) => !ESTADOS_MEXICO.includes(e));
      if (malos.length > 0) {
        return {
          error: `No reconozco estos estados: ${malos.join(", ")}. Escríbelos igual que aparecen en el selector del carrito.`,
        };
      }
      const repetido = estados.find((e) => estadosVistos.has(e));
      if (repetido) {
        return {
          error: `"${repetido}" está en dos zonas a la vez: "${estadosVistos.get(repetido)}" y "${zona.nombre}".`,
        };
      }
      estados.forEach((e) => estadosVistos.set(e, zona.nombre));
    }

    let codigosPostales = zona.codigosPostales;
    if (porCodigoPostal) {
      const crudos = String(datos.get(`cps_${zona.id}`) ?? "")
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);
      const invalidos = crudos.filter((c) => !/^\d{5}$/.test(c));
      if (invalidos.length > 0) {
        return {
          error: `Estos códigos postales de "${zona.nombre}" no tienen 5 dígitos: ${invalidos.join(", ")}.`,
        };
      }
      codigosPostales = [...new Set(crudos)];
    }

    const tramos: TramoEnvio[] = [];
    for (let i = 0; i < zona.tramos.length; i++) {
      const desde = pesosACentavos(datos.get(`desde_${zona.id}_${i}`));
      const costoCrudo = String(datos.get(`costo_${zona.id}_${i}`) ?? "").trim();
      if (desde === null) {
        return {
          error: `Un monto "desde" de la zona "${zona.nombre}" no es válido. Usa un número, por ejemplo 500.`,
        };
      }
      if (costoCrudo.toLowerCase() === "cotizar") {
        tramos.push({ desdeCentavos: desde, costoCentavos: "cotizar" });
        continue;
      }
      const costo = pesosACentavos(costoCrudo);
      if (costo === null) {
        return {
          error: `Un costo de la zona "${zona.nombre}" no es válido. Usa un número o la palabra "cotizar".`,
        };
      }
      if (costo > TOPE_ENVIO_CENTAVOS) {
        return {
          error: `Un costo de la zona "${zona.nombre}" (${formatoMXN(costo)}) se ve equivocado. El tope de seguridad es ${formatoMXN(TOPE_ENVIO_CENTAVOS)}.`,
        };
      }
      // Regla del proyecto: en la zona extendida el envío nunca es gratis.
      if (costo === 0 && porCodigoPostal) {
        return {
          error: `En "${zona.nombre}" el envío nunca puede ser gratis. Pon un costo o la palabra "cotizar".`,
        };
      }
      tramos.push({ desdeCentavos: desde, costoCentavos: costo });
    }

    // Los tramos se ordenan de menor a mayor: el cálculo de envío toma el
    // último tramo cuyo "desde" alcanza el subtotal.
    tramos.sort((a, b) => a.desdeCentavos - b.desdeCentavos);

    const duplicado = tramos.find(
      (t, i) => i > 0 && t.desdeCentavos === tramos[i - 1].desdeCentavos
    );
    if (duplicado) {
      return {
        error: `La zona "${zona.nombre}" tiene dos tramos que empiezan en ${formatoMXN(duplicado.desdeCentavos)}.`,
      };
    }
    // Si el tramo más bajo empieza por encima del pedido mínimo queda un
    // hueco: un carrito válido no encontraría tarifa y el checkout lo
    // rechazaría pidiendo cotizar.
    if (tramos.length === 0 || tramos[0].desdeCentavos > minimo) {
      return {
        error: `En "${zona.nombre}" el primer tramo empieza en ${
          tramos.length ? formatoMXN(tramos[0].desdeCentavos) : "nada"
        }, pero el pedido mínimo es ${formatoMXN(minimo)}. Habría pedidos sin costo de envío y no se podrían pagar.`,
      };
    }

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
  return {
    ok: `Guardado. Pedido mínimo ${formatoMXN(minimo)}. Aplica a los pedidos nuevos, no a los que ya se hicieron.`,
  };
}

// Convierte pesos a centavos enteros. null si no es un monto válido.
// Se valida la FORMA, no solo el resultado: Number() acepta "1e3" y "0x10",
// y borrar las comas a ciegas convertiría "90,50" (coma decimal, muy común al
// copiar de una cotización) en $9,050.
const FORMA_MONTO = /^\d{1,3}(,\d{3})*(\.\d{1,2})?$|^\d+(\.\d{1,2})?$/;

function pesosACentavos(valor: FormDataEntryValue | null | string): number | null {
  const texto = String(valor ?? "")
    .trim()
    .replace(/[$\s]/g, "");
  if (texto === "" || !FORMA_MONTO.test(texto)) return null;
  const n = Number(texto.replace(/,/g, ""));
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.round(n * 100);
}
