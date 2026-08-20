import type { Metadata } from "next";
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: "Maison Nux · Nuez pecana artesanal dulce y salada",
  description:
    "Nuez pecana caramelizada a mano, con el toque perfecto dulce y salado. Receta familiar francesa, hecha en México. Envío gratis desde $750.",
  openGraph: {
    title: "Maison Nux · Nuez pecana artesanal",
    description:
      "Nuez pecana caramelizada a mano, con el toque perfecto dulce y salado. Receta familiar francesa, hecha en México. Envío gratis desde $750.",
    images: ["/img/bolsa-600g.jpg"],
    locale: "es_MX",
    type: "website",
  },
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
