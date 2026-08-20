import type { Metadata } from "next";
import Header from "@/components/secciones/Header";
import Footer from "@/components/secciones/Footer";

export const metadata: Metadata = {
  title: "Envíos · Maison Nux",
  description:
    "Enviamos a todo México por paquetería. Costos por zona y monto del pedido, y envío gratis desde $750.",
};

const tabla = [
  { monto: "Menos de $150", z1: "No se envía", z2: "No se envía", z3: "No se envía" },
  { monto: "$150 a $499", z1: "$90", z2: "$120", z3: "Se cotiza" },
  { monto: "$500 a $749", z1: "Gratis", z2: "$120", z3: "Se cotiza" },
  { monto: "$750 o más", z1: "Gratis", z2: "Gratis", z3: "$120" },
];

// Copy de TEXTOS-PAGINA §5. Los tiempos de entrega entran cuando Juan Fran
// confirme los reales de su paquetería.
export default function Envios() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="pt-28">
        <div className="mx-auto max-w-3xl px-6 pb-20">
          <h1 className="text-center text-4xl md:text-5xl">Envíos</h1>
          <p className="mx-auto mt-6 max-w-[52ch] text-center text-lg leading-relaxed">
            Enviamos a todo México por paquetería. El costo depende de a dónde
            va tu pedido y de cuánto sumó.
          </p>

          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-sm">
              <thead>
                <tr className="border-b border-(--hairline) font-mono text-[0.7rem] uppercase tracking-[0.12em] text-accent-deep">
                  <th className="px-3 py-3 text-left font-normal">
                    Monto del pedido
                  </th>
                  <th className="px-3 py-3 text-left font-normal">
                    Jalisco y Occidente
                  </th>
                  <th className="px-3 py-3 text-left font-normal">
                    Resto del país
                  </th>
                  <th className="px-3 py-3 text-left font-normal">
                    Zona extendida
                  </th>
                </tr>
              </thead>
              <tbody>
                {tabla.map((f) => (
                  <tr key={f.monto} className="border-b border-(--hairline)">
                    <td className="px-3 py-3">{f.monto}</td>
                    <td className={`px-3 py-3 ${f.z1 === "Gratis" ? "font-medium text-accent-deep" : ""}`}>
                      {f.z1}
                    </td>
                    <td className={`px-3 py-3 ${f.z2 === "Gratis" ? "font-medium text-accent-deep" : ""}`}>
                      {f.z2}
                    </td>
                    <td className="px-3 py-3">{f.z3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="mt-14 text-2xl">Zonas</h2>
          <ul className="mt-5 space-y-4 leading-relaxed">
            <li>
              <strong className="font-medium">Jalisco y Occidente:</strong>{" "}
              Jalisco, Nayarit, Colima, Michoacán, Aguascalientes, Guanajuato y
              Zacatecas.
            </li>
            <li>
              <strong className="font-medium">Resto del país:</strong> los demás
              estados.
            </li>
            <li>
              <strong className="font-medium">Zona extendida:</strong> algunos
              códigos postales que la paquetería cobra con sobrecosto. En esa
              zona el envío siempre tiene costo. Al poner tu código postal en el
              checkout te decimos si es tu caso, antes de que pagues.
            </li>
          </ul>

          <p className="mt-10">
            <strong className="font-medium">Pedido mínimo:</strong> $150.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
