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
  ];
}
