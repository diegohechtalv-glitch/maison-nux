import type { Metadata } from "next";
import { sitioUrl } from "@/lib/sitio";
import { Cormorant_Garamond, Jost, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(sitioUrl()),
  title: "Maison Nux · Nuez pecana artesanal dulce y salada",
  description:
    "Nuez pecana caramelizada a mano, con el toque perfecto dulce y salado. Receta familiar francesa, hecha en México. Envío gratis desde $750.",
  openGraph: {
    title: "Maison Nux · Nuez pecana artesanal",
    description:
      "Nuez pecana caramelizada a mano, con el toque perfecto dulce y salado. Receta familiar francesa, hecha en México. Envío gratis desde $750.",
    images: [{ url: "/img/bolsa-600g.jpg", width: 1200, height: 1200, alt: "Bolsa de 600 g de nuez pecana Maison Nux" }],
    locale: "es_MX",
    type: "website",
    siteName: "Maison Nux",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maison Nux · Nuez pecana artesanal",
    description:
      "Nuez pecana caramelizada a mano, con el toque perfecto dulce y salado. Receta familiar francesa, hecha en México. Envío gratis desde $750.",
    images: ["/img/bolsa-600g.jpg"],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${jost.variable} ${plexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
