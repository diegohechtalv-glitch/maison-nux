// Bloque en mono, aire de etiqueta de empaque (design package §6.4).
const filas = [
  {
    label: "Ingredientes",
    texto:
      "Nuez pecana seleccionada, azúcar de caña pura, aceite vegetal, sal de mar.",
  },
  { label: "Libre de", texto: "Conservadores y sabores artificiales." },
  {
    label: "Alérgenos",
    texto:
      "Contiene nuez pecana. Puede contener trazas de otros frutos secos.",
  },
  {
    label: "Conservación",
    texto:
      "Mantén el empaque cerrado. Después de abrirlo, refrigera para preservar su crocancia.",
  },
];

export default function Ingredientes() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="border border-(--hairline) bg-panel px-7 py-8 shadow-[var(--shadow-soft)] md:px-10">
          <dl className="space-y-5 font-mono text-[0.85rem] leading-relaxed">
            {filas.map((f) => (
              <div key={f.label} className="md:grid md:grid-cols-[10rem_1fr] md:gap-4">
                <dt className="uppercase tracking-[0.14em] text-accent-deep">
                  {f.label}
                </dt>
                <dd className="mt-1 text-text-primary md:mt-0">{f.texto}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
