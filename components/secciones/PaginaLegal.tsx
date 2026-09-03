import Header from "@/components/secciones/Header";
import Footer from "@/components/secciones/Footer";
import { NEGOCIO } from "@/lib/negocio";

// Marco común de las tres páginas legales. Ancho de lectura corto y
// jerarquía clara: son textos largos que nadie quiere leer en bloques anchos.
export default function PaginaLegal({
  titulo,
  entrada,
  children,
}: {
  titulo: string;
  entrada: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="pt-28">
        <div className="mx-auto max-w-2xl px-6 pb-20">
          <h1 className="text-4xl md:text-5xl">{titulo}</h1>
          <p className="mt-5 max-w-[58ch] text-lg leading-relaxed text-text-secondary">
            {entrada}
          </p>
          <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-text-secondary">
            Vigente desde el {NEGOCIO.vigenteDesde}
          </p>
          <div className="legal mt-12">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
