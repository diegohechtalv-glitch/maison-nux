const formateador = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
});

// centavos (entero) -> "$1,234.00 MXN"
export function formatoMXN(centavos: number): string {
  return `${formateador.format(centavos / 100)} MXN`;
}
