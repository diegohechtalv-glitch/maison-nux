import Link from "next/link";

// Única banda oscura de la página. Texto del design package (§6.3), con las
// rayas sustituidas por comas según lo aprobado por Juan Fran.
export default function Historia() {
  return (
    <section className="bg-ink-well py-24 text-text-on-dark">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="text-4xl md:text-5xl">Hola, soy Raquel</h2>
        <div className="mt-8 space-y-5 text-lg leading-relaxed opacity-95">
          <p>
            Maison Nux nació de una receta de mi bisabuela francesa. La hacía en
            casa, para la familia, y cuando llegó a mis manos le añadí el
            corazón de mi cocina mexicana.
          </p>
          <p>
            La sigo haciendo en tandas pequeñas, con los mismos cuatro
            ingredientes de siempre. No porque sea más eficiente, no lo es, sino
            porque es la única forma en que sabe a lo que tiene que saber.
          </p>
          <p>Gracias por dejarla entrar a tu casa.</p>
        </div>
        <p className="mt-8 font-display text-2xl italic">— Raquel</p>
        <Link href="/historia" className="btn-oscuro mt-10">
          Leer la historia completa
        </Link>
      </div>
    </section>
  );
}
