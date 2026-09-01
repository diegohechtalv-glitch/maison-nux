// Mercado Pago del lado del servidor. El MP_ACCESS_TOKEN jamás llega al
// navegador: solo se usa aquí.

import crypto from "node:crypto";

const API = "https://api.mercadopago.com";

function token(): string {
  const t = process.env.MP_ACCESS_TOKEN;
  if (!t) throw new Error("Falta MP_ACCESS_TOKEN");
  return t;
}

export type PreferenciaCreada = { id: string; init_point: string };

export async function crearPreferencia(input: {
  pedidoId: string;
  numero: number;
  items: Array<{ titulo: string; cantidad: number; precioCentavos: number }>;
  envioCentavos: number;
  correo: string;
  sitio: string;
}): Promise<PreferenciaCreada> {
  const items = input.items.map((i) => ({
    id: i.titulo,
    title: i.titulo,
    quantity: i.cantidad,
    currency_id: "MXN",
    unit_price: i.precioCentavos / 100,
  }));
  if (input.envioCentavos > 0) {
    items.push({
      id: "envio",
      title: "Envío",
      quantity: 1,
      currency_id: "MXN",
      unit_price: input.envioCentavos / 100,
    });
  }
  const res = await fetch(`${API}/checkout/preferences`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
      "X-Idempotency-Key": input.pedidoId,
    },
    body: JSON.stringify({
      items,
      external_reference: input.pedidoId,
      payer: { email: input.correo },
      statement_descriptor: "MAISON NUX",
      notification_url: `${input.sitio}/api/mp/webhook`,
      back_urls: {
        success: `${input.sitio}/pedido/${input.pedidoId}`,
        pending: `${input.sitio}/pedido/${input.pedidoId}`,
        failure: `${input.sitio}/pedido/${input.pedidoId}`,
      },
      auto_return: "approved",
    }),
  });
  if (!res.ok) {
    throw new Error(`Mercado Pago respondió ${res.status} al crear la preferencia`);
  }
  const datos = (await res.json()) as { id: string; init_point: string };
  return { id: datos.id, init_point: datos.init_point };
}

// Decide a qué estado mueve un pago de Mercado Pago a un pedido, según el
// estado en el que el pedido está AHORA. Devuelve null cuando no hay nada que
// tocar. Es una función pura para poder probarla sin llamar a nadie.
export function decidirEstadoPedido(
  statusMP: string,
  estadoActual: string
): "pagado" | "fallido" | null {
  if (statusMP === "approved") {
    // Un pago aprobado confirma el pedido aunque un intento anterior lo haya
    // dejado en fallido: dentro del mismo checkout el cliente puede reintentar
    // con otra tarjeta. Un pedido que ya avanzó (pagado, enviado, entregado,
    // cancelado) no se toca.
    return estadoActual === "pendiente" || estadoActual === "fallido"
      ? "pagado"
      : null;
  }
  if (["rejected", "cancelled", "charged_back"].includes(statusMP)) {
    // Solo un pedido que todavía espera pago puede caer a fallido. Un pedido
    // ya pagado JAMÁS retrocede por un intento posterior rechazado.
    return estadoActual === "pendiente" ? "fallido" : null;
  }
  // pending, in_process, authorized, refunded, in_mediation: no se toca nada.
  // El pedido se queda como está y no sale ningún correo.
  return null;
}

export async function obtenerPago(paymentId: string): Promise<{
  status: string;
  external_reference?: string;
} | null> {
  const res = await fetch(`${API}/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  if (!res.ok) return null;
  return (await res.json()) as { status: string; external_reference?: string };
}

// Verificación de la firma del webhook (formato oficial de Mercado Pago):
// header x-signature = "ts=...,v1=..."; el manifiesto firmado es
// "id:<data.id>;request-id:<x-request-id>;ts:<ts>;" con HMAC-SHA256.
export function verificarFirmaWebhook(input: {
  xSignature: string | null;
  xRequestId: string | null;
  dataId: string | null;
  secreto: string;
}): boolean {
  if (!input.xSignature || !input.dataId) return false;
  const partes = Object.fromEntries(
    input.xSignature.split(",").map((p) => {
      const [k, ...v] = p.trim().split("=");
      return [k, v.join("=")];
    })
  ) as { ts?: string; v1?: string };
  if (!partes.ts || !partes.v1) return false;
  const manifiesto = `id:${input.dataId};request-id:${input.xRequestId ?? ""};ts:${partes.ts};`;
  const esperado = crypto
    .createHmac("sha256", input.secreto)
    .update(manifiesto)
    .digest("hex");
  const a = Buffer.from(esperado, "hex");
  const b = Buffer.from(partes.v1, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
