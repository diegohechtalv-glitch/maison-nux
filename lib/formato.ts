const formateador = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
});

// centavos (entero) -> "$1,234.00 MXN"
export function formatoMXN(centavos: number): string {
  return `${formateador.format(centavos / 100)} MXN`;
}

const formateadorCorto = new Intl.NumberFormat("es-MX", {
  maximumFractionDigits: 0,
});

// centavos (entero) -> "$50" — solo para el catálogo; el carrito y el
// checkout usan formatoMXN completo
export function formatoPrecioCorto(centavos: number): string {
  return `$${formateadorCorto.format(centavos / 100)}`;
}

// 521XXXXXXXXXX -> "33 1234 5678" o "656 123 4567", según la clave de área.
// En México solo CDMX (55 y 56), Guadalajara (33) y Monterrey (81) tienen
// clave de dos dígitos; el resto del país la tiene de tres.
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
