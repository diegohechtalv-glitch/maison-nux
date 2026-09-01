import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { decidirEstadoPedido, obtenerPago, verificarFirmaWebhook } from "@/lib/mp";
import { enviarCorreosDePago } from "@/lib/correos";
import { leerConfigEnvios } from "@/lib/config-envios-server";

export const dynamic = "force-dynamic";

// La ÚNICA puerta que marca un pedido como pagado: firma verificada + consulta
// del pago directamente a Mercado Pago. El regreso del navegador no cuenta.
// Nota de privacidad: aquí no se escriben datos del cliente en logs.

export async function POST(req: Request) {
  const secreto = process.env.MP_WEBHOOK_SECRET;
  if (!secreto || !process.env.MP_ACCESS_TOKEN) {
    return NextResponse.json({ error: "no configurado" }, { status: 503 });
  }

  const url = new URL(req.url);
  const dataId =
    url.searchParams.get("data.id") ?? url.searchParams.get("id");
  const tipo = url.searchParams.get("type") ?? url.searchParams.get("topic");

  const firmaValida = verificarFirmaWebhook({
    xSignature: req.headers.get("x-signature"),
    xRequestId: req.headers.get("x-request-id"),
    dataId,
    secreto,
  });
  if (!firmaValida) {
    return NextResponse.json({ error: "firma inválida" }, { status: 401 });
  }

  if (tipo !== "payment" || !dataId) {
    // Evento que no es de pago: se reconoce y se ignora.
    return NextResponse.json({ ok: true });
  }

  const pago = await obtenerPago(dataId);
  if (!pago) {
    // Mercado Pago reintenta si respondemos con error.
    return NextResponse.json({ error: "pago no consultable" }, { status: 500 });
  }
  const pedidoId = pago.external_reference;
  if (!pedidoId) return NextResponse.json({ ok: true });

  const pedido = await prisma.pedido.findUnique({
    where: { id: pedidoId },
    include: { items: true },
  });
  if (!pedido) return NextResponse.json({ ok: true });

  // La tabla de decisión vive en lib/mp.ts para poder probarla aparte.
  // Idempotente: un pedido ya pagado no retrocede ni reenvía correos, y un
  // pago pendiente o rechazado nunca llega a "pagado".
  const nuevoEstado = decidirEstadoPedido(pago.status, pedido.estado);

  // Fase 6: un reembolso o contracargo sobre un pedido que ya avanzó NO cambia
  // el estado (decisión de Juan Fran). Solo se anota para que el panel lo
  // muestre como alerta y él decida qué hacer.
  if (
    ["refunded", "charged_back", "in_mediation"].includes(pago.status) &&
    pedido.mpAlerta !== pago.status
  ) {
    await prisma.pedido.update({
      where: { id: pedido.id },
      data: { mpAlerta: pago.status, mpAlertaEn: new Date() },
    });
    // NO se corta aquí: si además toca cambiar el estado (un contracargo
    // sobre un pedido que seguía pendiente lo baja a fallido), eso se aplica
    // abajo igual que siempre, y encima queda la alerta visible en el panel.
  }

  if (nuevoEstado) {
    await prisma.pedido.update({
      where: { id: pedido.id },
      data: { estado: nuevoEstado, mpPaymentId: dataId },
    });
    if (nuevoEstado === "pagado") {
      try {
        const config = await leerConfigEnvios();
        const zona = config.zonas.find((z) => z.id === pedido.zonaId);
        await enviarCorreosDePago({
          numero: pedido.numero,
          nombre: pedido.nombre,
          correo: pedido.correo,
          telefono: pedido.telefono,
          direccion: `${pedido.calle}, ${pedido.colonia}, ${pedido.ciudad}, ${pedido.estadoEnvio}, CP ${pedido.codigoPostal}`,
          zonaNombre: zona?.nombre ?? pedido.zonaId,
          items: pedido.items,
          envioCentavos: pedido.envioCentavos,
          totalCentavos: pedido.totalCentavos,
        });
      } catch {
        // Un correo caído nunca tumba la confirmación del pago.
      }
    }
  }

  return NextResponse.json({ ok: true });
}
