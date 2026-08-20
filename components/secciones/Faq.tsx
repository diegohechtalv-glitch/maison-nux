import TituloSeccion from "@/components/ui/TituloSeccion";

// Solo estas cinco (design package §6.6). La de pagos entra en la fase 4,
// las que dependen de datos pendientes entran cuando existan.
const preguntas = [
  {
    q: "¿Por qué hay que refrigerarla después de abrir?",
    a: "Porque no lleva conservadores. Es la misma razón por la que sabe como sabe.",
  },
  {
    q: "¿Contiene alérgenos?",
    a: "Sí. Es nuez pecana, y puede contener trazas de otros frutos secos. Si hay alergia en casa, tenlo en cuenta.",
  },
  {
    q: "¿Es la misma receta en todos los tamaños?",
    a: "La misma nuez y la misma receta. Solo cambia cuánta te llevas.",
  },
  {
    q: "¿Cuándo es gratis el envío?",
    a: "Desde $750 en la mayor parte del país, y desde $500 si estás en Jalisco o el Occidente. Al poner tu código postal te decimos si el tuyo tiene costo.",
  },
  {
    q: "¿Hacen pedidos grandes o para empresa?",
    a: "Sí. Escríbenos por WhatsApp y lo vemos.",
  },
];

export default function Faq() {
  return (
    <section id="preguntas" className="scroll-mt-20 py-16">
      <div className="mx-auto max-w-2xl px-6">
        <TituloSeccion centrado>Preguntas frecuentes</TituloSeccion>
        <div className="mt-10">
          {preguntas.map((p) => (
            <details key={p.q} className="faq-item">
              <summary>{p.q}</summary>
              <p className="pb-5 leading-relaxed text-text-secondary">{p.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
