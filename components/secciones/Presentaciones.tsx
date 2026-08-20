import Image from "next/image";
import TituloSeccion from "@/components/ui/TituloSeccion";
import { productos } from "@/lib/productos";
import { formatoMXN } from "@/lib/formato";
import bolsa40 from "@/public/img/bolsa-40g.jpg";
import bolsa120 from "@/public/img/bolsa-120g.jpg";
import bolsa300 from "@/public/img/bolsa-300g.jpg";
import bolsa600 from "@/public/img/bolsa-600g.jpg";

const fotos = {
  "nuez-40g": bolsa40,
  "nuez-120g": bolsa120,
  "nuez-300g": bolsa300,
  "nuez-600g": bolsa600,
} as const;

export default function Presentaciones() {
  return (
    <section id="presentaciones" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <TituloSeccion centrado>Elige tu bolsa</TituloSeccion>
        <p className="mx-auto mt-4 max-w-[46ch] text-center text-text-secondary">
          La misma receta en cuatro tamaños. Empieza por donde quieras.
        </p>

        <div className="cards-scroll mt-12 md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {productos.map((p) => (
            <article key={p.id} className="card">
              <div className="card-foto">
                <Image
                  src={fotos[p.id as keyof typeof fotos]}
                  alt={`Bolsa de ${p.gramos} g de nuez pecana Maison Nux`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 767px) 78vw, (max-width: 1023px) 45vw, 260px"
                />
              </div>
              <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-text-secondary">
                Cont. net. {p.gramos} g
              </p>
              <p className="mt-1 font-mono text-lg text-text-primary">
                {formatoMXN(p.precioCentavos)}
                <span className="filete-precio" aria-hidden="true" />
              </p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-text-secondary">
                {p.texto}
              </p>
              <span className="corner tl" aria-hidden="true" />
              <span className="corner tr" aria-hidden="true" />
              <span className="corner bl" aria-hidden="true" />
              <span className="corner br" aria-hidden="true" />
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-text-secondary">
          Todas llevan la misma nuez y la misma receta. Cambia el tamaño, no la
          calidad.
        </p>
      </div>
    </section>
  );
}
