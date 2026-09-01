// Etiquetas y formatos que solo usa el panel.

export const ETIQUETA_ESTADO: Record<string, string> = {
  pendiente: "Pendiente",
  pagado: "Pagado",
  enviado: "Enviado",
  entregado: "Entregado",
  cancelado: "Cancelado",
  fallido: "Fallido",
};

// Lo que Mercado Pago reporta cuando algo pasó DESPUÉS del pago. El estado del
// pedido no cambia solo: esto es un aviso para que Juan Fran decida.
export const ETIQUETA_ALERTA: Record<string, string> = {
  refunded: "Reembolsado en MP",
  charged_back: "Contracargo en MP",
  in_mediation: "En disputa en MP",
};

export const EXPLICACION_ALERTA: Record<string, string> = {
  refunded:
    "Mercado Pago reporta que este pago fue reembolsado. El pedido conserva su estado: decide tú si lo cancelas.",
  charged_back:
    "Mercado Pago reporta un contracargo: el comprador desconoció el cargo. El pedido conserva su estado: decide tú qué hacer.",
  in_mediation:
    "Mercado Pago abrió una disputa sobre este pago. El pedido conserva su estado hasta que se resuelva.",
};

const fecha = new Intl.DateTimeFormat("es-MX", {
  day: "2-digit",
  month: "short",
  timeZone: "America/Mexico_City",
});

const fechaHora = new Intl.DateTimeFormat("es-MX", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "America/Mexico_City",
});

export function fechaCorta(d: Date): string {
  return fecha.format(d);
}

export function fechaLarga(d: Date): string {
  return fechaHora.format(d);
}

// 521XXXXXXXXXX -> "33 1234 5678" o "656 123 4567", según la clave de área.
// En México solo CDMX (55), Guadalajara (33) y Monterrey (81) tienen clave de
// dos dígitos; el resto del país la tiene de tres.
const LADAS_DE_DOS = ["55", "56", "33", "81"];

export function telefonoLegible(tel: string): string {
  const d = tel.replace(/\D/g, "");
  const diez = d.startsWith("521") ? d.slice(3) : d;
  if (diez.length !== 10) return tel;
  if (LADAS_DE_DOS.includes(diez.slice(0, 2))) {
    return `${diez.slice(0, 2)} ${diez.slice(2, 6)} ${diez.slice(6)}`;
  }
  return `${diez.slice(0, 3)} ${diez.slice(3, 6)} ${diez.slice(6)}`;
}
