// Seed por HTTPS (mismo motivo que migrar-por-https.mjs): siembra las 4
// presentaciones desde lib/productos.ts (única fuente de verdad) y la
// configuración provisional de envíos en la fila editable de Configuracion.
// Uso: node --experimental-strip-types scripts/seed-por-https.mjs

import { neon } from "@neondatabase/serverless";
import { readFileSync } from "node:fs";
import { setGlobalDispatcher, EnvHttpProxyAgent } from "undici";
import { productos } from "../lib/productos.ts";
import { CONFIG_ENVIOS_PROVISIONAL } from "../lib/config-envios.ts";

setGlobalDispatcher(new EnvHttpProxyAgent());

const url = readFileSync(".env.local", "utf8")
  .split("\n")
  .find((l) => l.startsWith("DIRECT_URL="))
  .slice("DIRECT_URL=".length)
  .replace(/^"|"$/g, "");
const sql = neon(url);

for (const p of productos) {
  await sql.query(
    `INSERT INTO "Producto" (id, gramos, "precioCentavos", foto, nombre, frase, parrafo, "actualizadoEn")
     VALUES ($1, $2, $3, $4, $5, $6, $7, now())
     ON CONFLICT (id) DO UPDATE SET
       gramos = EXCLUDED.gramos,
       "precioCentavos" = EXCLUDED."precioCentavos",
       foto = EXCLUDED.foto,
       nombre = EXCLUDED.nombre,
       frase = EXCLUDED.frase,
       parrafo = EXCLUDED.parrafo,
       "actualizadoEn" = now()`,
    [p.id, p.gramos, p.precioCentavos, p.foto, p.nombre, p.frase, p.parrafo]
  );
}

await sql.query(
  `INSERT INTO "Configuracion" (clave, datos, "actualizadoEn")
   VALUES ('envios', $1, now())
   ON CONFLICT (clave) DO NOTHING`,
  [JSON.stringify(CONFIG_ENVIOS_PROVISIONAL)]
);

const prods = await sql`SELECT id, gramos, "precioCentavos", nombre FROM "Producto" ORDER BY gramos`;
const conf = await sql`SELECT clave, "actualizadoEn", datos->>'pedidoMinimoCentavos' AS minimo,
  jsonb_array_length(datos->'zonas') AS zonas FROM "Configuracion" WHERE clave = 'envios'`;
console.log("Productos sembrados en Neon:");
for (const p of prods) console.log(`  ${p.id}: ${p.gramos} g · ${p.nombre} · ${p.precioCentavos} centavos`);
console.log("Configuración:", JSON.stringify(conf[0]));
