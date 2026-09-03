import type { MetadataRoute } from "next";
import { sitioUrl } from "@/lib/sitio";

// A propósito NO se lista /admin: robots.txt es público y ahí estaríamos
// anunciando la dirección del panel. El panel ya va con etiqueta noindex, que
// es lo que de verdad lo mantiene fuera de Google.
// Sí se excluyen los pasos de compra: no son contenido que deba indexarse, y
// /pedido/[id] muestra datos del comprador.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/carrito", "/checkout", "/pedido/"],
    },
    sitemap: `${sitioUrl()}/sitemap.xml`,
  };
}
