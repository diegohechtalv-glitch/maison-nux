// Correos transaccionales con Resend. Copy verbatim de TEXTOS §9.
// Si RESEND_API_KEY no está configurada, los correos se omiten sin romper el
// flujo del pedido (el webhook nunca debe fallar por un correo).

import { Resend } from "resend";
import { formatoMXN, formatoPrecioCorto } from "./formato";

type DatosPedido = {
  numero: number;
  nombre: string;
  correo: string;
  telefono: string;
  direccion: string; // calle, colonia, ciudad, estado, CP ya unidos
  zonaNombre: string;
  items: Array<{ nombre: string; gramos: number; cantidad: number; precioCentavos: number }>;
  envioCentavos: number;
  totalCentavos: number;
};

function remitente(): string {
  // Mientras no haya dominio propio (fase 7), Resend permite enviar desde
  // onboarding@resend.dev únicamente al correo de la cuenta: suficiente para
  // el modo prueba. Con dominio verificado se cambia por pedidos@tudominio.
  return process.env.CORREO_REMITENTE ?? "Maison Nux <onboarding@resend.dev>";
}

function detalleProductos(items: DatosPedido["items"]): string {
  return items
    .map(
      (i) =>
        `${i.cantidad} × ${i.gramos} g · ${i.nombre} — ${formatoPrecioCorto(
          i.precioCentavos * i.cantidad
        )}`
    )
    .join("\n");
}

export async function enviarCorreosDePago(pedido: DatosPedido): Promise<void> {
  const clave = process.env.RESEND_API_KEY;
  if (!clave) return;
  const resend = new Resend(clave);
  const envioTexto =
    pedido.envioCentavos === 0 ? "Gratis" : formatoMXN(pedido.envioCentavos);

  // Al cliente (TEXTOS §9, verbatim)
  await resend.emails.send({
    from: remitente(),
    to: pedido.correo,
    subject: `Tu pedido Maison Nux #${pedido.numero}`,
    text: `Hola ${pedido.nombre},

Gracias por tu pedido. Ya lo estamos preparando.

Pedido #${pedido.numero}
${detalleProductos(pedido.items)}
Envío: ${envioTexto}
Total: ${formatoMXN(pedido.totalCentavos)}

Te llega a:
${pedido.direccion}

En cuanto salga te aviso con el número de guía.

Gracias por dejar entrar esta receta a tu casa.

— Raquel`,
  });

  // A Juan Fran (aviso interno; asunto sin emoji ni raya, pendiente de
  // bendición: el original de TEXTOS traía 🔔 y em dash)
  const interno = process.env.CONTACTO_EMAIL;
  if (!interno) return;
  await resend.emails.send({
    from: remitente(),
    to: interno,
    subject: `Pedido nuevo #${pedido.numero} · ${formatoMXN(pedido.totalCentavos)}`,
    text: `Pedido #${pedido.numero} · ${formatoMXN(pedido.totalCentavos)}
${pedido.nombre} · ${pedido.telefono}
${detalleProductos(pedido.items)}
${pedido.direccion} · ${pedido.zonaNombre}
Envío: ${envioTexto}`,
  });
}
