"use client";

import { useRef, useState } from "react";
import { agregarAlCarrito } from "@/lib/carrito-store";

export default function AgregarAlCarrito({
  productoId,
}: {
  productoId: string;
}) {
  const [agregado, setAgregado] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const alHacerClic = () => {
    agregarAlCarrito(productoId);
    setAgregado(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAgregado(false), 1400);
  };

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={alHacerClic}
        className="btn-primario w-full text-center"
      >
        {agregado ? "Agregado" : "Agregar al carrito"}
      </button>
      <p className="mt-2 text-center font-mono text-[0.65rem] uppercase tracking-[0.12em] text-text-secondary">
        Envío gratis en pedidos desde $750
      </p>
    </div>
  );
}
