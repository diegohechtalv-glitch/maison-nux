import { productos } from "@/lib/productos";
import { CONTACTO } from "@/lib/contacto";
import { sitioUrl } from "@/lib/sitio";

// Datos estructurados (TEXTOS §8): marcan cada presentación como Product con
// precio y moneda para que Google pueda mostrar el precio en los resultados,
// y la marca como Organization. Es JSON, no texto visible: no cambia nada de
// lo que ve el visitante.
export default function DatosEstructurados() {
  const base = sitioUrl();
  const datos = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${base}/#organizacion`,
        name: "Maison Nux",
        url: base,
        logo: `${base}/img/logo-maison-nux.png`,
        email: CONTACTO.correo,
        sameAs: [CONTACTO.instagramLink],
        areaServed: { "@type": "Country", name: "México" },
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#sitio`,
        url: base,
        name: "Maison Nux",
        inLanguage: "es-MX",
        publisher: { "@id": `${base}/#organizacion` },
      },
      ...productos.map((p) => ({
        "@type": "Product",
        "@id": `${base}/#${p.id}`,
        name: `Nuez pecana Maison Nux ${p.gramos} g · ${p.nombre}`,
        description: p.frase,
        image: `${base}${p.foto}`,
        brand: { "@type": "Brand", name: "Maison Nux" },
        weight: { "@type": "QuantitativeValue", value: p.gramos, unitCode: "GRM" },
        offers: {
          "@type": "Offer",
          price: (p.precioCentavos / 100).toFixed(2),
          priceCurrency: "MXN",
          availability: "https://schema.org/InStock",
          url: `${base}/#presentaciones`,
          seller: { "@id": `${base}/#organizacion` },
        },
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      // El contenido es nuestro y se serializa desde objetos propios, no de
      // entrada de usuario. Se escapan los "<" por si acaso.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(datos).replace(/</g, "\\u003c"),
      }}
    />
  );
}
