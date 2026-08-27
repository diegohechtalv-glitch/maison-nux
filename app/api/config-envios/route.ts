import { NextResponse } from "next/server";
import { leerConfigEnvios } from "@/lib/config-envios-server";

// Sin caché: un cambio en la fila de Neon se refleja al instante,
// sin redesplegar nada.
export const dynamic = "force-dynamic";

export async function GET() {
  const config = await leerConfigEnvios();
  return NextResponse.json(config);
}
