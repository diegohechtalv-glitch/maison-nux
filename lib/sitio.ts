// La dirección pública del sitio, en un solo lugar.
//
// Sale de NEXT_PUBLIC_SITE_URL (Vercel) y siempre se devuelve SIN diagonal
// final: pegarle "/algo" a una dirección que ya termina en "/" produce "//algo",
// que fue justo lo que rompió la página de gracias tras la primera compra.
export function sitioUrl(): string {
  const v = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
  return v && /^https?:\/\//.test(v) ? v : "http://localhost:3000";
}
