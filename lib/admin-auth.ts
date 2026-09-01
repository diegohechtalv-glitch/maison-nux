// La cerradura de /admin.
//
// Cómo funciona, en corto: Juan Fran escribe la contraseña, el servidor la
// compara contra ADMIN_PASSWORD (variable de Vercel, nunca del repo) y, si
// coincide, guarda una cookie FIRMADA con fecha de caducidad. La cookie no
// contiene la contraseña: si alguien la viera, no obtendría la clave.
//
// La firma se hace con HMAC-SHA256 usando la propia contraseña como secreto.
// Efecto secundario útil: al cambiar la contraseña, todas las sesiones viejas
// dejan de valer solas.

import { cookies } from "next/headers";
import crypto from "node:crypto";

const COOKIE = "maison_admin";
const DURACION_MS = 12 * 60 * 60 * 1000; // 12 horas

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

function firmar(payload: string, clave: string): string {
  return crypto.createHmac("sha256", clave).update(payload).digest("hex");
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
