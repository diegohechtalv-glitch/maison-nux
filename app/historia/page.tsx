import type { Metadata } from "next";
import Header from "@/components/secciones/Header";
import Footer from "@/components/secciones/Footer";
import Ornamento from "@/components/ui/Ornamento";

export const metadata: Metadata = {
  title: "La historia · Maison Nux",
  description:
    "La receta que cruzó el Atlántico: de la cocina de una bisabuela francesa a la cocina mexicana de Raquel.",
};

// Texto de TEXTOS-PAGINA §3, con las rayas sustituidas según lo aprobado.
// La firma "— Raquel" se conserva: es firma, no prosa.
export default function Historia() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="pt-28">
        <article className="mx-auto max-w-2xl px-6 pb-10">
          <h1 className="text-center text-4xl md:text-5xl">
            La receta que cruzó el Atlántico
          </h1>
          <div className="mt-10 space-y-6 text-lg leading-relaxed">
            <p className="font-medium">Hola, soy Raquel.</p>
            <p>
              Esta receta no la inventé yo. Venía de mi bisabuela francesa,
              escrita como se escribían antes: con medidas aproximadas y mucha
              confianza en las manos de quien la iba a hacer.
            </p>
            <p>
              Cuando llegó a mi cocina, la hice tal cual. Y después la hice otra
              vez, y otra, hasta que empezó a parecerse a mí. Le añadí el
              corazón de mi cocina mexicana: la nuez pecana de aquí, el punto de
              sal que aquí sí se entiende. Y en algún momento dejó de ser solo
              la receta de mi bisabuela para volverse también la mía.
            </p>
            <p>
              Eso es Maison Nux. <em>Maison</em> por la casa de donde viene.{" "}
              <em>Nux</em> por lo que hay dentro. Y en medio, el equilibrio
              entre tradición y sabor que llevo años buscando en cada tanda.
            </p>
            <p>
              La sigo haciendo en tandas pequeñas, a mano, con los mismos cuatro
              ingredientes de siempre. No porque sea más eficiente, no lo es,
              sino porque es la única forma en que sabe a lo que tiene que
              saber.
            </p>
            <p>Gracias por dejarla entrar a tu casa.</p>
            <p className="font-display text-2xl italic">— Raquel</p>
          </div>
          <Ornamento />
        </article>
      </main>
      <Footer />
    </>
  );
}
