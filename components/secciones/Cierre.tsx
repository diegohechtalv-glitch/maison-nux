import Image from "next/image";
import logo from "@/public/img/logo-maison-nux.png";

export default function Cierre() {
  return (
    <section className="py-24">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-7 px-6 text-center">
        <Image src={logo} alt="" aria-hidden="true" className="h-16 w-auto" sizes="200px" />
        <h2 className="text-4xl md:text-5xl">¿Nos pedimos una bolsa?</h2>
        <a href="#presentaciones" className="btn-primario">
          Elegir mi bolsa
        </a>
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-text-secondary">
          Envío gratis desde $750. Pedido mínimo $150.
        </p>
      </div>
    </section>
  );
}
