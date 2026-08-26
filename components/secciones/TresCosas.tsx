import TituloSeccion from "@/components/ui/TituloSeccion";

const cosas = [
  {
    titulo: "La receta",
    texto:
      "De mi bisabuela francesa. No la cambié: le añadí, apenas, lo que aprendí en mi cocina mexicana. Es la única en su tipo, y así seguirá.",
  },
  {
    titulo: "El equilibrio",
    texto:
      "No es garapiñada. No es una nuez dulce con sal encima. Es dulce y salado al mismo tiempo, en la misma mordida, sin que uno le gane al otro. Ese punto es todo el trabajo.",
  },
  {
    titulo: "Las manos",
    texto:
      "Tandas pequeñas, siempre. Sin conservadores ni sabores artificiales. Cuatro ingredientes: nuez pecana, azúcar de caña, aceite vegetal y sal de mar. Nada más, porque nada más hace falta.",
  },
];

export default function TresCosas() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <TituloSeccion centrado>Tres cosas que no negociamos</TituloSeccion>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {cosas.map((c, i) => (
            <div key={c.titulo} className="text-center md:text-left">
              <p className="font-mono text-sm text-accent-deep">{i + 1}</p>
              <h3 className="mt-2 text-2xl">{c.titulo}</h3>
              <p className="mt-3 leading-relaxed text-text-secondary">
                {c.texto}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
