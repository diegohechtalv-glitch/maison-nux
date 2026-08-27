import type { Metadata } from "next";
import Header from "@/components/secciones/Header";
import Footer from "@/components/secciones/Footer";
import { prisma } from "@/lib/db";
import { formatoMXN, formatoPrecioCorto } from "@/lib/formato";

export const metadata: Metadata = {
  title: "Tu pedido · Maison Nux",
};

export const dynamic = "force-dynamic";

// Página de confirmación. OJO: muestra el estado real de la base; si el pago
// aún no confirma por el webhook, dice "pendiente" con honestidad.
export default async function PaginaPedido({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let pedido = null;
  try {
    pedido = await prisma.pedido.findUnique({
      where: { id },
      include: { items: true },
    });
  } catch {
    pedido = null;
  }

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="pt-28">
        <div className="mx-auto max-w-xl px-6 pb-24 text-center">
          {!pedido ? (
            <>
              <h1 className="text-4xl">No encontramos ese pedido</h1>
              <p className="mt-6 text-text-secondary">
                Si acabas de pagar, dale un momento y recarga esta página.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl">
                {pedido.estado === "pagado"
                  ? "Gracias por tu pedido."
                  : pedido.estado === "fallido"
                    ? "El pago no se completó"
                    : "Estamos confirmando tu pago"}
              </h1>
              <p className="mt-4 font-mono text-sm uppercase tracking-[0.14em] text-text-secondary">
                Pedido #{pedido.numero}
              </p>

              <ul className="mt-8 space-y-1 border-y border-(--hairline) py-5 text-left">
                {pedido.items.map((i) => (
                  <li key={i.id} className="flex justify-between">
                    <span>
                      {i.cantidad} × {i.gramos} g · {i.nombre}
                    </span>
                    <span className="font-mono">
                      {formatoPrecioCorto(i.precioCentavos * i.cantidad)}
                    </span>
                  </li>
                ))}
                <li className="flex justify-between pt-2 text-text-secondary">
                  <span>Envío</span>
                  <span className="font-mono">
                    {pedido.envioCentavos === 0
                      ? "Gratis"
                      : formatoMXN(pedido.envioCentavos)}
                  </span>
                </li>
                <li className="flex justify-between font-medium">
                  <span>Total</span>
                  <span className="font-mono">
                    {formatoMXN(pedido.totalCentavos)}
                  </span>
                </li>
              </ul>

              {pedido.estado === "pagado" && (
                <p className="mt-6 leading-relaxed text-text-secondary">
                  Te mandé la confirmación a tu correo. En cuanto salga tu
                  paquete te aviso con el número de guía.
                </p>
              )}
              {pedido.estado === "pendiente" && (
                <p className="mt-6 leading-relaxed text-text-secondary">
                  Mercado Pago nos avisa en cuanto tu pago quede confirmado.
                  Esta página se actualiza al recargarla.
                </p>
              )}
              {pedido.estado === "fallido" && (
                <p className="mt-6 leading-relaxed text-text-secondary">
                  No se hizo ningún cargo. Puedes intentarlo de nuevo desde tu
                  carrito.
                </p>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
