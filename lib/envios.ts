// Cálculo de envío por zona y monto. Ningún componente decide precios por su
// cuenta: todo sale de la configuración (tabla Configuracion de Neon, con
// lib/config-envios.ts como respaldo).

import type { ConfigEnvios, ZonaEnvio } from "./config-envios";

export type ResultadoEnvio =
  | { tipo: "bajo-minimo"; faltanCentavos: number }
  | { tipo: "gratis"; zona: ZonaEnvio }
  | { tipo: "costo"; zona: ZonaEnvio; costoCentavos: number }
  | { tipo: "cotizar"; zona: ZonaEnvio };

export function zonaParaDestino(
  config: ConfigEnvios,
  estado: string,
  codigoPostal: string
): ZonaEnvio {
  const cp = codigoPostal.trim();
  const porCP = config.zonas.find((z) => z.codigosPostales?.includes(cp));
  if (porCP) return porCP;
  const porEstado = config.zonas.find(
    (z) => Array.isArray(z.estados) && z.estados.includes(estado)
  );
  if (porEstado) return porEstado;
  const resto = config.zonas.find((z) => z.estados === "resto");
  if (!resto) throw new Error("La configuración de envíos no tiene zona 'resto'");
  return resto;
}

export function calcularEnvio(
  config: ConfigEnvios,
  subtotalCentavos: number,
  estado: string,
  codigoPostal: string
): ResultadoEnvio {
  if (subtotalCentavos < config.pedidoMinimoCentavos) {
    return {
      tipo: "bajo-minimo",
      faltanCentavos: config.pedidoMinimoCentavos - subtotalCentavos,
    };
  }
  const zona = zonaParaDestino(config, estado, codigoPostal);
  const tramo = [...zona.tramos]
    .sort((a, b) => a.desdeCentavos - b.desdeCentavos)
    .filter((t) => t.desdeCentavos <= subtotalCentavos)
    .pop();
  if (!tramo) return { tipo: "cotizar", zona };
  if (tramo.costoCentavos === "cotizar") return { tipo: "cotizar", zona };
  if (tramo.costoCentavos === 0) return { tipo: "gratis", zona };
  return { tipo: "costo", zona, costoCentavos: tramo.costoCentavos };
}

// Cuánto falta para el envío gratis de la zona del cliente.
// null = en esta zona el envío nunca es gratis (zona extendida).
// 0 = ya califica.
export function faltaParaEnvioGratis(
  config: ConfigEnvios,
  subtotalCentavos: number,
  estado: string,
  codigoPostal: string
): { faltanCentavos: number; umbralCentavos: number } | null {
  const zona = zonaParaDestino(config, estado, codigoPostal);
  const tramoGratis = zona.tramos.find((t) => t.costoCentavos === 0);
  if (!tramoGratis) return null;
  return {
    umbralCentavos: tramoGratis.desdeCentavos,
    faltanCentavos: Math.max(0, tramoGratis.desdeCentavos - subtotalCentavos),
  };
}
