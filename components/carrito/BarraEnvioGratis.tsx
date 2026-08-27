"use client";

// La pieza que más vende de toda la tienda (TEXTOS §4). Los carritos más
// probables ($720 y $740) quedan a $30 y $10 del umbral: cuando faltan menos
// de $60, la barra ofrece la bolsa de 40 g con un botón de un clic.

import { agregarAlCarrito } from "@/lib/carrito-store";
import { formatoPrecioCorto } from "@/lib/formato";
import { productos } from "@/lib/productos";

const UMBRAL_SUGERENCIA_CENTAVOS = 6000; // faltan menos de $60 → sugerir 40 g

export default function BarraEnvioGratis({
  subtotalCentavos,
  pedidoMinimoCentavos,
  faltante,
}: {
  subtotalCentavos: number;
  pedidoMinimoCentavos: number;
  // null = en la zona del cliente el envío nunca es gratis (zona extendida)
  faltante: { faltanCentavos: number; umbralCentavos: number } | null;
}) {
  if (subtotalCentavos < pedidoMinimoCentavos) {
    return (
      <div className="barra-envio">
        <p className="font-normal">
          El pedido mínimo para envío es de{" "}
          {formatoPrecioCorto(pedidoMinimoCentavos)}.
        </p>
      </div>
    );
  }

  if (faltante === null) {
    return (
      <div className="barra-envio">
        <p className="text-text-secondary">
          En tu zona el envío siempre tiene costo.
        </p>
      </div>
    );
  }

  const { faltanCentavos, umbralCentavos } = faltante;

  if (faltanCentavos === 0) {
    return (
      <div className="barra-envio">
        <p className="font-medium text-accent-deep">Tu envío es gratis.</p>
        <div className="barra-pista" aria-hidden="true">
          <div className="barra-relleno" style={{ width: "100%" }} />
        </div>
      </div>
    );
  }

  const bolsa40 = productos.find((p) => p.gramos === 40);
  const progreso = Math.min(100, (subtotalCentavos / umbralCentavos) * 100);

  return (
    <div className="barra-envio">
      <p>
        Te faltan{" "}
        <strong className="font-medium">
          {formatoPrecioCorto(faltanCentavos)}
        </strong>{" "}
        para envío gratis.
      </p>
      <div
        className="barra-pista"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progreso)}
        aria-label="Progreso hacia el envío gratis"
      >
        <div className="barra-relleno" style={{ width: `${progreso}%` }} />
      </div>
      {bolsa40 && faltanCentavos < UMBRAL_SUGERENCIA_CENTAVOS && (
        <button
          type="button"
          className="btn-secundario mt-3 w-full text-center"
          onClick={() => agregarAlCarrito(bolsa40.id)}
        >
          + Agregar bolsa de 40 g · {formatoPrecioCorto(bolsa40.precioCentavos)}
        </button>
      )}
    </div>
  );
}
