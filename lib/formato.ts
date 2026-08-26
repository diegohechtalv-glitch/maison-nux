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
