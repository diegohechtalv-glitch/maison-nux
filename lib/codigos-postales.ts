// Validación de código postal contra estado (pendiente obligatorio de la
// fase 4 en CLAUDE.md). En México los dos primeros dígitos del CP identifican
// la entidad; esta tabla cubre los rangos estándar. En las fronteras entre
// estados puede haber CPs raros: si un cliente real reclama un rechazo
// legítimo, se ajusta aquí el rango.

const RANGOS: Array<{ estado: string; desde: number; hasta: number }> = [
  { estado: "Ciudad de México", desde: 1, hasta: 16 },
  { estado: "Aguascalientes", desde: 20, hasta: 20 },
  { estado: "Baja California", desde: 21, hasta: 22 },
  { estado: "Baja California Sur", desde: 23, hasta: 23 },
  { estado: "Campeche", desde: 24, hasta: 24 },
  { estado: "Coahuila", desde: 25, hasta: 27 },
  { estado: "Colima", desde: 28, hasta: 28 },
  { estado: "Chiapas", desde: 29, hasta: 30 },
  { estado: "Chihuahua", desde: 31, hasta: 33 },
  { estado: "Durango", desde: 34, hasta: 35 },
  { estado: "Guanajuato", desde: 36, hasta: 38 },
  { estado: "Guerrero", desde: 39, hasta: 41 },
  { estado: "Hidalgo", desde: 42, hasta: 43 },
  { estado: "Jalisco", desde: 44, hasta: 49 },
  { estado: "Estado de México", desde: 50, hasta: 57 },
  { estado: "Michoacán", desde: 58, hasta: 61 },
  { estado: "Morelos", desde: 62, hasta: 62 },
  { estado: "Nayarit", desde: 63, hasta: 63 },
  { estado: "Nuevo León", desde: 64, hasta: 67 },
  { estado: "Oaxaca", desde: 68, hasta: 71 },
  { estado: "Puebla", desde: 72, hasta: 75 },
  { estado: "Querétaro", desde: 76, hasta: 76 },
  { estado: "Quintana Roo", desde: 77, hasta: 77 },
  { estado: "San Luis Potosí", desde: 78, hasta: 79 },
  { estado: "Sinaloa", desde: 80, hasta: 82 },
  { estado: "Sonora", desde: 83, hasta: 85 },
  { estado: "Tabasco", desde: 86, hasta: 86 },
  { estado: "Tamaulipas", desde: 87, hasta: 89 },
  { estado: "Tlaxcala", desde: 90, hasta: 90 },
  { estado: "Veracruz", desde: 91, hasta: 96 },
  { estado: "Yucatán", desde: 97, hasta: 97 },
  { estado: "Zacatecas", desde: 98, hasta: 99 },
];

export function esCpValido(cp: string): boolean {
  return /^\d{5}$/.test(cp);
}

export function estadoDeCp(cp: string): string | null {
  if (!esCpValido(cp)) return null;
  const prefijo = parseInt(cp.slice(0, 2), 10);
  const r = RANGOS.find((x) => prefijo >= x.desde && prefijo <= x.hasta);
  return r ? r.estado : null;
}

export function cpCoincideConEstado(cp: string, estado: string): boolean {
  return estadoDeCp(cp) === estado;
}
