// La cerradura de /admin.
//
// Cómo funciona, en corto: Juan Fran escribe la contraseña, el servidor la
// compara contra ADMIN_PASSWORD (variable de Vercel, nunca del repo) y, si
// coincide, guarda una cookie FIRMADA con fecha de caducidad. La cookie no
// contiene la contraseña: si alguien la viera, no obtendría la clave.
//
// La firma NO usa la contraseña cruda como secreto: usa una clave derivada de
// ella con scrypt (una función deliberadamente lenta). Importa porque el
// mensaje firmado viaja en claro dentro de la cookie: quien la viera tendría
// un par (mensaje, firma) y podría adivinar la contraseña sin volver a tocar
// el sitio. Con scrypt cada intento cuesta ~100 ms en vez de ~1 nanosegundo.
// Se conserva la propiedad útil: al cambiar la contraseña, todas las sesiones
// viejas dejan de valer solas.

import { cookies } from "next/headers";
import crypto from "node:crypto";
import { prisma } from "./db";

const COOKIE = "maison_admin";
const DURACION_MS = 12 * 60 * 60 * 1000; // 12 horas

// Freno a la fuerza bruta. En Vercel cada petición corre en su propia
// instancia, así que un contador en memoria no serviría: se guarda en la
// misma tabla de configuración.
const CLAVE_INTENTOS = "admin_intentos";
const VENTANA_MS = 15 * 60 * 1000;
const MAX_FALLOS = 8;

function secreto(): string | null {
  const p = process.env.ADMIN_PASSWORD;
  // Una contraseña vacía o de juguete no protege nada: mejor dejar el panel
  // cerrado por completo que abrirlo con una clave trivial.
  if (!p || p.length < 8) return null;
  return p;
}

export function adminConfigurado(): boolean {
  return secreto() !== null;
}

// La derivación es cara a propósito, así que se hace una sola vez por
// proceso y se guarda en memoria.
let claveCache: { de: string; clave: Buffer } | null = null;

function claveDeFirma(contrasena: string): Buffer {
  if (claveCache && claveCache.de === contrasena) return claveCache.clave;
  const clave = crypto.scryptSync(contrasena, "maison-nux-admin-v1", 32, {
    N: 16384,
    r: 8,
    p: 1,
    maxmem: 64 * 1024 * 1024,
  });
  claveCache = { de: contrasena, clave };
  return clave;
}

function firmar(payload: string, contrasena: string): string {
  return crypto
    .createHmac("sha256", claveDeFirma(contrasena))
    .update(payload)
    .digest("hex");
}

// Comparación en tiempo constante: evita que se pueda adivinar la contraseña
// midiendo cuánto tarda en fallar.
function igualSeguro(a: string, b: string): boolean {
  const ba = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  // timingSafeEqual exige la misma longitud; se comparan los hashes para que
  // longitudes distintas no delaten nada.
  const ha = crypto.createHash("sha256").update(ba).digest();
  const hb = crypto.createHash("sha256").update(bb).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function contrasenaCorrecta(intento: string): boolean {
  const clave = secreto();
  if (!clave) return false;
  return igualSeguro(intento, clave);
}

export function crearToken(): string | null {
  const clave = secreto();
  if (!clave) return null;
  // Date.now() aquí es correcto: corre en el servidor al iniciar sesión.
  const expira = Date.now() + DURACION_MS;
  const payload = `v1.${expira}`;
  return `${payload}.${firmar(payload, clave)}`;
}

export function tokenValido(token: string | undefined): boolean {
  const clave = secreto();
  if (!clave || !token) return false;
  const partes = token.split(".");
  if (partes.length !== 3) return false;
  const [version, expiraTexto, firma] = partes;
  if (version !== "v1") return false;
  const expira = Number(expiraTexto);
  if (!Number.isFinite(expira) || Date.now() > expira) return false;
  const esperada = firmar(`${version}.${expiraTexto}`, clave);
  if (esperada.length !== firma.length) return false;
  try {
    return crypto.timingSafeEqual(
      Buffer.from(esperada, "hex"),
      Buffer.from(firma, "hex")
    );
  } catch {
    return false;
  }
}

export async function abrirSesion(): Promise<boolean> {
  const token = crearToken();
  if (!token) return false;
  const tarro = await cookies();
  tarro.set(COOKIE, token, {
    httpOnly: true, // el JavaScript de la página no puede leerla
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: DURACION_MS / 1000,
  });
  await limpiarIntentos();
  return true;
}

export async function cerrarSesion(): Promise<void> {
  const tarro = await cookies();
  tarro.delete({ name: COOKIE, path: "/admin" });
}

export async function haySesion(): Promise<boolean> {
  const tarro = await cookies();
  return tokenValido(tarro.get(COOKIE)?.value);
}

// ---------------------------------------------------------------------------
// Freno a los intentos de contraseña
//
// Si la base no responde, estas funciones fallan hacia el lado permisivo: el
// freno se pierde, pero la contraseña sigue siendo obligatoria. Es preferible
// a dejar a Juan Fran fuera de su propio panel porque Neon tuvo un hipo.

type Intentos = { fallos: number[] };

async function leerIntentos(): Promise<number[]> {
  try {
    const fila = await prisma.configuracion.findUnique({
      where: { clave: CLAVE_INTENTOS },
    });
    const datos = fila?.datos as Intentos | null;
    const ahora = Date.now();
    return (datos?.fallos ?? []).filter((t) => ahora - t < VENTANA_MS);
  } catch {
    return [];
  }
}

export async function bloqueadoPorIntentos(): Promise<boolean> {
  return (await leerIntentos()).length >= MAX_FALLOS;
}

export async function registrarFallo(): Promise<void> {
  const fallos = [...(await leerIntentos()), Date.now()];
  try {
    await prisma.configuracion.upsert({
      where: { clave: CLAVE_INTENTOS },
      update: { datos: { fallos } },
      create: { clave: CLAVE_INTENTOS, datos: { fallos } },
    });
  } catch {
    // sin base no hay freno; la contraseña sigue siendo obligatoria
  }
}

export async function limpiarIntentos(): Promise<void> {
  try {
    await prisma.configuracion.upsert({
      where: { clave: CLAVE_INTENTOS },
      update: { datos: { fallos: [] } },
      create: { clave: CLAVE_INTENTOS, datos: { fallos: [] } },
    });
  } catch {
    // no pasa nada: los viejos caducan solos por la ventana de tiempo
  }
}
