import TituloSeccion from "@/components/ui/TituloSeccion";

const cosas = [
  {
    titulo: "La receta",
    texto:
      "De mi bisabuela francesa. No la cambié: le añadí lo que aprendí en mi cocina mexicana.",
  },
  {
    titulo: "El punto dulce y salado",
    texto:
      "Ni postre ni botana. El caramelo justo, la sal de mar justa. Ese equilibrio es todo el trabajo.",
  },
  {
    titulo: "Hecha a mano",
    texto:
      "En tandas pequeñas. Sin conservadores, sin sabores artificiales. Solo nuez pecana, azúcar de caña, aceite vegetal y sal de mar.",
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
