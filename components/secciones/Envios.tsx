import Link from "next/link";
import TituloSeccion from "@/components/ui/TituloSeccion";

export default function Envios() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <TituloSeccion centrado>Envíos a todo México</TituloSeccion>
        <div className="mt-6 space-y-1.5 text-lg leading-relaxed">
          <p>
            Envío <strong className="font-medium">gratis</strong> desde $750 en
            la mayor parte del país. Al poner tu código postal te decimos si el
            tuyo tiene costo.
          </p>
          <p>Si estás en Jalisco o el Occidente, desde $500.</p>
          <p>Pedido mínimo $150.</p>
        </div>
        <Link href="/envios" className="btn-secundario mt-9">
          Ver la política de envíos
        </Link>
      </div>
    </section>
  );
}
