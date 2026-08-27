// Lee la configuración de envíos desde Neon (fila "envios" de Configuracion).
// Si la base no responde o la fila no existe todavía, cae al respaldo del
// archivo. Así el sitio nunca se queda sin reglas de envío.

import { prisma } from "./db";
import {
  CONFIG_ENVIOS_PROVISIONAL,
  type ConfigEnvios,
} from "./config-envios";

export async function leerConfigEnvios(): Promise<ConfigEnvios> {
  try {
    const fila = await prisma.configuracion.findUnique({
      where: { clave: "envios" },
    });
    if (fila && fila.datos) return fila.datos as unknown as ConfigEnvios;
  } catch {
    // sin base disponible: usar respaldo
  }
  return CONFIG_ENVIOS_PROVISIONAL;
}
