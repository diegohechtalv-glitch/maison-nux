// Aplica las migraciones de prisma/migrations a Neon POR HTTPS.
//
// ¿Por qué existe? El entorno de construcción (Claude Code Web) no puede abrir
// conexiones directas de Postgres (puerto 5432); solo sale por HTTPS. Neon
// acepta SQL por HTTPS, así que este script aplica cada migration.sql
// pendiente y la registra en _prisma_migrations con el mismo formato y
// checksum que usa Prisma. Resultado: en cualquier máquina normal (Vercel,
// la laptop de Juan Fran), `prisma migrate deploy` ve el historial como si
// Prisma lo hubiera aplicado él mismo.
//
// Uso:  node scripts/migrar-por-https.mjs        (lee DIRECT_URL de .env.local)

import { neon, neonConfig } from "@neondatabase/serverless";
import { createHash, randomUUID } from "node:crypto";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { setGlobalDispatcher, EnvHttpProxyAgent } from "undici";

// El fetch de Node no usa el proxy HTTPS del entorno por sí solo; esto lo activa.
setGlobalDispatcher(new EnvHttpProxyAgent());

function leerEnvLocal(clave) {
  const linea = readFileSync(".env.local", "utf8")
    .split("\n")
    .find((l) => l.startsWith(clave + "="));
  if (!linea) throw new Error(`Falta ${clave} en .env.local`);
  return linea.slice(clave.length + 1).replace(/^"|"$/g, "");
}

const sql = neon(leerEnvLocal("DIRECT_URL"));

// Divide un migration.sql en sentencias individuales (el driver HTTPS ejecuta
// una por llamada). Suficiente para DDL simple; sin funciones ni triggers.
function sentencias(texto) {
  return texto
    .split(/;\s*(?:\r?\n|$)/)
    .map((bloque) =>
      bloque
        .split("\n")
        .filter((linea) => !linea.trim().startsWith("--"))
        .join("\n")
        .trim()
    )
    .filter((s) => s.length > 0);
}

await sql`CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
  "id" VARCHAR(36) NOT NULL PRIMARY KEY,
  "checksum" VARCHAR(64) NOT NULL,
  "finished_at" TIMESTAMPTZ,
  "migration_name" VARCHAR(255) NOT NULL,
  "logs" TEXT,
  "rolled_back_at" TIMESTAMPTZ,
  "started_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "applied_steps_count" INTEGER NOT NULL DEFAULT 0
)`;

const aplicadas = new Set(
  (await sql`SELECT migration_name FROM "_prisma_migrations" WHERE rolled_back_at IS NULL`).map(
    (r) => r.migration_name
  )
);

const dirs = readdirSync("prisma/migrations", { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

for (const nombre of dirs) {
  const ruta = `prisma/migrations/${nombre}/migration.sql`;
  if (!existsSync(ruta)) continue;
  if (aplicadas.has(nombre)) {
    console.log(`ya aplicada: ${nombre}`);
    continue;
  }
  const texto = readFileSync(ruta, "utf8");
  const checksum = createHash("sha256").update(texto).digest("hex");
  const inicio = new Date();
  console.log(`aplicando: ${nombre}`);
  const lista = sentencias(texto);
  if (lista.length === 0) {
    throw new Error(`La migración ${nombre} no produjo sentencias; revisa el divisor.`);
  }
  let pasos = 0;
  for (const st of lista) {
    await sql.query(st);
    pasos++;
  }
  await sql.query(
    `INSERT INTO "_prisma_migrations" (id, checksum, finished_at, migration_name, started_at, applied_steps_count)
     VALUES ($1, $2, now(), $3, $4, $5)`,
    [randomUUID(), checksum, nombre, inicio, pasos]
  );
  console.log(`  ${pasos} sentencias, registrada en _prisma_migrations`);
}
console.log("Migraciones al día.");
