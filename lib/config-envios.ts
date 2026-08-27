// ============================================================================
// CONFIGURACIÓN DE ENVÍOS — ⚠️ VALORES PROVISIONALES, PENDIENTES DE CONFIRMAR
//
// Juan Fran todavía no cotiza paqueterías. Los costos, los umbrales de envío
// gratis, el pedido mínimo, los estados de cada zona y los códigos postales de
// zona extendida son MARCADORES DE POSICIÓN (los de CLAUDE.md).
//
// Nada de esto requiere tocar código para cambiarse: esta configuración se
// siembra en la tabla `Configuracion` de Neon (clave "envios") y el sitio la
// lee de ahí en vivo. Para cambiar números o estados: editar esa fila (admin
// en la fase 6, o consola de Neon). Este archivo es solo el VALOR INICIAL y
// el respaldo si la base no responde.
//
// Candado de la fase 7 en CLAUDE.md: confirmar todo esto antes de producción.
// ============================================================================

export type TramoEnvio = {
  // El tramo aplica desde este subtotal (en centavos) hacia arriba.
  desdeCentavos: number;
  // Costo del envío en centavos. 0 = gratis. "cotizar" = no hay tarifa
  // automática: se acuerda por separado antes de pagar.
  costoCentavos: number | "cotizar";
};

export type ZonaEnvio = {
  id: string;
  nombre: string;
  // Estados que pertenecen a la zona. "resto" = todos los que no estén en
  // otra zona. La zona extendida no se decide por estado sino por CP.
  estados: string[] | "resto";
  // Códigos postales (5 dígitos) que fuerzan esta zona, gane quien gane por
  // estado. Solo la zona extendida los usa.
  codigosPostales?: string[];
  tramos: TramoEnvio[];
};

export type ConfigEnvios = {
  notaProvisional: string;
  pedidoMinimoCentavos: number;
  zonas: ZonaEnvio[];
};

export const CONFIG_ENVIOS_PROVISIONAL: ConfigEnvios = {
  notaProvisional:
    "PROVISIONAL: costos, umbrales, estados por zona y CPs pendientes de confirmar con paqueterías (candado de fase 7).",

  // Por debajo de este subtotal no se permite completar el pedido.
  pedidoMinimoCentavos: 15000, // $150

  zonas: [
    {
      id: "occidente",
      nombre: "Jalisco y Occidente",
      estados: [
        "Jalisco",
        "Nayarit",
        "Colima",
        "Michoacán",
        "Aguascalientes",
        "Guanajuato",
        "Zacatecas",
      ],
      tramos: [
        { desdeCentavos: 15000, costoCentavos: 9000 }, // $150–$499.99 → $90
        { desdeCentavos: 50000, costoCentavos: 0 },    // $500 en adelante → gratis
      ],
    },
    {
      id: "nacional",
      nombre: "Resto del país",
      estados: "resto",
      tramos: [
        { desdeCentavos: 15000, costoCentavos: 12000 }, // $150–$749.99 → $120
        { desdeCentavos: 75000, costoCentavos: 0 },     // $750 en adelante → gratis
      ],
    },
    {
      id: "extendida",
      nombre: "Zona extendida",
      estados: [],
      // CPs con sobrecosto de paquetería. Lista de EJEMPLO para poder probar
      // la maquinaria; la real la carga Juan Fran cuando cotice (puede
      // lanzarse vacía). En esta zona el envío NUNCA es gratis.
      codigosPostales: ["23970", "40900"],
      tramos: [
        { desdeCentavos: 15000, costoCentavos: "cotizar" }, // $150–$749.99 → se cotiza
        { desdeCentavos: 75000, costoCentavos: 12000 },     // $750 en adelante → $120
      ],
    },
  ],
};

// Los 32 estados, para el selector del carrito y el checkout.
export const ESTADOS_MEXICO = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche",
  "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila", "Colima", "Durango",
  "Estado de México", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco",
  "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla",
  "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora",
  "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas",
];
