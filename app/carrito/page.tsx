import type { Metadata } from "next";
import Header from "@/components/secciones/Header";
import Footer from "@/components/secciones/Footer";
import CarritoCliente from "@/components/carrito/CarritoCliente";

export const metadata: Metadata = {
  title: "Carrito · Maison Nux",
  description: "Tu carrito de nuez pecana Maison Nux.",
};

export default function PaginaCarrito() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="pt-28">
        <h1 className="mb-10 text-center text-4xl md:text-5xl">Tu carrito</h1>
        <CarritoCliente />
      </main>
      <Footer />
    </>
  );
}
