"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  useCarrito,
  fijarCantidad,
  quitarDelCarrito,
} from "@/lib/carrito-store";
import { productos } from "@/lib/productos";
import { formatoMXN, formatoPrecioCorto } from "@/lib/formato";
import {
  CONFIG_ENVIOS_PROVISIONAL,
  ESTADOS_MEXICO,
  type ConfigEnvios,
} from "@/lib/config-envios";
import { calcularEnvio, faltaParaEnvioGratis } from "@/lib/envios";
import BarraEnvioGratis from "./BarraEnvioGratis";
import bolsa40 from "@/public/img/bolsa-40g.jpg";
import bolsa120 from "@/public/img/bolsa-120g.jpg";
import bolsa300 from "@/public/img/bolsa-300g.jpg";
import bolsa600 from "@/public/img/bolsa-600g.jpg";

const fotos = {
  "nuez-40g": bolsa40,
  "nuez-120g": bolsa120,
  "nuez-300g": bolsa300,
  "nuez-600g": bolsa600,
} as const;

const CLAVE_DESTINO = "maison-nux-destino-v1";

export default function CarritoCliente() {
  const items = useCarrito();
  // La configuración arranca con el respaldo del archivo y se sustituye por
  // la fila viva de Neon en cuanto responde el API.
  const [config, setConfig] = useState<ConfigEnvios>(CONFIG_ENVIOS_PROVISIONAL);
  const [estado, setEstado] = useState("");
  const [cp, setCp] = useState("");

  useEffect(() => {
    fetch("/api/config-envios")
      .then((r) => (r.ok ? r.json() : null))
      .then((c) => c && setConfig(c))
      .catch(() => {});
    try {
      const crudo = window.localStorage.getItem(CLAVE_DESTINO);
      if (crudo) {
        const d = JSON.parse(crudo);
        if (typeof d.estado === "string") setEstado(d.estado);
        if (typeof d.cp === "string") setCp(d.cp);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        CLAVE_DESTINO,
        JSON.stringify({ estado, cp })
      );
    } catch {}
  }, [estado, cp]);

  const lineas = items
    .map((i) => {
      const p = productos.find((x) => x.id === i.productoId);
      return p ? { ...i, producto: p } : null;
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const subtotal = lineas.reduce(
    (n, l) => n + l.producto.precioCentavos * l.cantidad,
    0
  );

  // Sin estado elegido, la barra usa la zona "resto del país" (umbral $750);
  // al elegir Jalisco u Occidente, el umbral mostrado baja a $500 (TEXTOS §4).
  const estadoParaBarra = estado || "Ciudad de México";
  const envio = estado ? calcularEnvio(config, subtotal, estado, cp) : null;
  const faltante = faltaParaEnvioGratis(config, subtotal, estadoParaBarra, cp);

  const bajoMinimo = subtotal < config.pedidoMinimoCentavos;
  const totalCentavos =
    subtotal + (envio && envio.tipo === "costo" ? envio.costoCentavos : 0);

  const puedeContinuar =
    !bajoMinimo && estado !== "" && envio !== null && envio.tipo !== "cotizar";

  if (lineas.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 pb-24 text-center">
        <p className="text-lg text-text-secondary">Tu carrito está vacío.</p>
        <a href="/#presentaciones" className="btn-primario mt-8 inline-block">
          Ver presentaciones
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24">
      <ul className="divide-y divide-(--hairline)">
        {lineas.map((l) => (
          <li key={l.productoId} className="flex items-center gap-4 py-5">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden bg-panel-warm">
              <Image
                src={fotos[l.productoId as keyof typeof fotos]}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg leading-snug">
                {l.producto.gramos} g · {l.producto.nombre}
              </p>
              <p className="font-mono text-sm text-text-secondary">
                {formatoPrecioCorto(l.producto.precioCentavos)} c/u
              </p>
            </div>
            <div className="flex items-center gap-1" aria-label="Cantidad">
              <button
                type="button"
                className="btn-cantidad"
                aria-label="Quitar uno"
                onClick={() => fijarCantidad(l.productoId, l.cantidad - 1)}
              >
                −
              </button>
              <span className="w-8 text-center font-mono">{l.cantidad}</span>
              <button
                type="button"
                className="btn-cantidad"
                aria-label="Agregar uno"
                onClick={() => fijarCantidad(l.productoId, l.cantidad + 1)}
              >
                +
              </button>
            </div>
            <p className="w-20 text-right font-mono">
              {formatoPrecioCorto(l.producto.precioCentavos * l.cantidad)}
            </p>
            <button
              type="button"
              className="text-sm text-text-secondary underline-offset-2 hover:underline"
              onClick={() => quitarDelCarrito(l.productoId)}
            >
              Quitar
            </button>
          </li>
        ))}
      </ul>

      <BarraEnvioGratis
        subtotalCentavos={subtotal}
        pedidoMinimoCentavos={config.pedidoMinimoCentavos}
        faltante={faltante}
      />

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1 block font-mono text-[0.7rem] uppercase tracking-[0.14em] text-text-secondary">
            Estado a donde va tu pedido
          </span>
          <select
            className="campo"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="">Elige tu estado</option>
            {ESTADOS_MEXICO.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block font-mono text-[0.7rem] uppercase tracking-[0.14em] text-text-secondary">
            Código postal
          </span>
          <input
            className="campo"
            inputMode="numeric"
            maxLength={5}
            placeholder="5 dígitos"
            value={cp}
            onChange={(e) => setCp(e.target.value.replace(/\D/g, ""))}
          />
        </label>
      </div>

      <dl className="mt-8 space-y-2 border-t border-(--hairline) pt-6">
        <div className="flex justify-between">
          <dt className="text-text-secondary">Subtotal</dt>
          <dd className="font-mono">{formatoMXN(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-text-secondary">Envío</dt>
          <dd className="font-mono">
            {!estado && "Elige tu estado"}
            {envio?.tipo === "bajo-minimo" && "—"}
            {envio?.tipo === "gratis" && "Gratis"}
            {envio?.tipo === "costo" && formatoMXN(envio.costoCentavos)}
            {envio?.tipo === "cotizar" && "Se cotiza"}
          </dd>
        </div>
        <div className="flex justify-between border-t border-(--hairline) pt-2 text-lg">
          <dt className="font-medium">Total</dt>
          <dd className="font-mono font-medium">{formatoMXN(totalCentavos)}</dd>
        </div>
      </dl>

      {envio?.tipo === "cotizar" && (
        <p className="mt-4 text-sm text-text-secondary">
          Tu código postal es de zona extendida: el costo del envío se acuerda
          contigo antes de pagar.
        </p>
      )}

      <button
        type="button"
        className="btn-primario mt-8 w-full text-center disabled:cursor-not-allowed disabled:opacity-40"
        disabled={!puedeContinuar}
      >
        Continuar al pago
      </button>
      <p className="mt-2 text-center font-mono text-[0.65rem] uppercase tracking-[0.12em] text-text-secondary">
        El pago se conecta en la fase 4
      </p>
    </div>
  );
}
