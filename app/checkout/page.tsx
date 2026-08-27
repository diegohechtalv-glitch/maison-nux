import type { Metadata } from "next";
import Header from "@/components/secciones/Header";
import Footer from "@/components/secciones/Footer";
import CheckoutCliente from "@/components/carrito/CheckoutCliente";

export const metadata: Metadata = {
  title: "Checkout · Maison Nux",
  description: "Completa tu pedido de nuez pecana Maison Nux.",
};

export default function PaginaCheckout() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="pt-28">
        <h1 className="mb-10 text-center text-4xl md:text-5xl">
          ¿A dónde va tu pedido?
        </h1>
        <CheckoutCliente />
      </main>
      <Footer />
    </>
  );
}
