import type { MetadataRoute } from "next";
import { sitioUrl } from "@/lib/sitio";

// Solo las páginas públicas. /admin, /carrito, /checkout y /pedido/[id] NO van
// aquí: el panel es privado y las otras tres son pasos de compra, no contenido
// que Google deba indexar.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = sitioUrl();
  const ahora = new Date();
  return [
    { url: base, lastModified: ahora, changeFrequency: "monthly", priority: 1 },
    {
      url: `${base}/historia`,
      lastModified: ahora,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${base}/envios`,
      lastModified: ahora,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/legal/aviso-de-privacidad`,
      lastModified: ahora,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/legal/terminos`,
      lastModified: ahora,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/legal/devoluciones`,
      lastModified: ahora,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
