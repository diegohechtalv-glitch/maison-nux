"use client";

import { useEffect, useState } from "react";
import { useCarrito } from "@/lib/carrito-store";
import { productos } from "@/lib/productos";
import { formatoMXN } from "@/lib/formato";
import {
  CONFIG_ENVIOS_PROVISIONAL,
  ESTADOS_MEXICO,
  type ConfigEnvios,
} from "@/lib/config-envios";
import { calcularEnvio } from "@/lib/envios";
import { cpCoincideConEstado, esCpValido, estadoDeCp } from "@/lib/codigos-postales";

const CLAVE_DESTINO = "maison-nux-destino-v1";

export default function CheckoutCliente() {
  const items = useCarrito();
  const [config, setConfig] = useState<ConfigEnvios>(CONFIG_ENVIOS_PROVISIONAL);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [calle, setCalle] = useState("");
  const [colonia, setColonia] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [estado, setEstado] = useState("");
  const [cp, setCp] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
  const envio =
    estado !== "" ? calcularEnvio(config, subtotal, estado, cp) : null;
  const envioCentavos =
    envio?.tipo === "costo" ? envio.costoCentavos : 0;
  const total = subtotal + envioCentavos;

  // Aviso de CP en vivo, antes de intentar pagar
  const avisoCp =
    esCpValido(cp) && estado !== "" && !cpCoincideConEstado(cp, estado)
      ? (() => {
          const sugerido = estadoDeCp(cp);
          return sugerido
            ? `Ese código postal es de ${sugerido}, no de ${estado}.`
            : "No reconocemos ese código postal.";
        })()
      : null;

  const listo =
    lineas.length > 0 &&
    nombre.trim() !== "" &&
    correo.trim() !== "" &&
    telefono.replace(/\D/g, "").length === 10 &&
    calle.trim() !== "" &&
    colonia.trim() !== "" &&
    ciudad.trim() !== "" &&
    estado !== "" &&
    esCpValido(cp) &&
    avisoCp === null &&
    envio !== null &&
    envio.tipo !== "bajo-minimo" &&
    envio.tipo !== "cotizar";

  const pagar = async () => {
    setEnviando(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lineas.map((l) => ({
            productoId: l.productoId,
            cantidad: l.cantidad,
          })),
          nombre,
          correo,
          telefono,
          calle,
          colonia,
          ciudad,
          estado,
          codigoPostal: cp,
        }),
      });
      const datos = await res.json();
      if (!res.ok) {
        setErrorMsg(datos.error ?? "Algo salió mal. Intenta de nuevo.");
        setEnviando(false);
        return;
      }
      window.location.href = datos.url; // a la pantalla de Mercado Pago
    } catch {
      setErrorMsg("No pudimos conectar. Revisa tu internet e intenta de nuevo.");
      setEnviando(false);
    }
  };

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
    <div className="mx-auto max-w-2xl px-6 pb-24">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block md:col-span-2">
          <span className="etiqueta-campo">Nombre completo</span>
          <input className="campo" value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="name" />
        </label>
        <label className="block">
          <span className="etiqueta-campo">Correo</span>
          <input className="campo" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} autoComplete="email" />
        </label>
        <label className="block">
          <span className="etiqueta-campo">WhatsApp (10 dígitos)</span>
          <input className="campo" inputMode="numeric" maxLength={10} value={telefono} onChange={(e) => setTelefono(e.target.value.replace(/\D/g, ""))} autoComplete="tel-national" />
        </label>
        <label className="block md:col-span-2">
          <span className="etiqueta-campo">Calle y número</span>
          <input className="campo" value={calle} onChange={(e) => setCalle(e.target.value)} autoComplete="address-line1" />
        </label>
        <label className="block">
          <span className="etiqueta-campo">Colonia</span>
          <input className="campo" value={colonia} onChange={(e) => setColonia(e.target.value)} autoComplete="address-line2" />
        </label>
        <label className="block">
          <span className="etiqueta-campo">Ciudad</span>
          <input className="campo" value={ciudad} onChange={(e) => setCiudad(e.target.value)} autoComplete="address-level2" />
        </label>
        <label className="block">
          <span className="etiqueta-campo">Estado</span>
          <select className="campo" value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="">Elige tu estado</option>
            {ESTADOS_MEXICO.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="etiqueta-campo">Código postal</span>
          <input className="campo" inputMode="numeric" maxLength={5} value={cp} onChange={(e) => setCp(e.target.value.replace(/\D/g, ""))} autoComplete="postal-code" />
        </label>
      </div>

      {avisoCp && (
        <p className="mt-3 text-sm font-normal text-[#8a3b12]">{avisoCp}</p>
      )}

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
          <dd className="font-mono font-medium">{formatoMXN(total)}</dd>
        </div>
      </dl>

      {envio?.tipo === "bajo-minimo" && (
        <p className="mt-4 text-sm text-text-secondary">
          El pedido mínimo para envío es de $150.
        </p>
      )}
      {envio?.tipo === "cotizar" && (
        <p className="mt-4 text-sm text-text-secondary">
          Tu código postal es de zona extendida: el costo del envío se acuerda
          contigo antes de pagar.
        </p>
      )}
      {errorMsg && (
        <p className="mt-4 text-sm font-normal text-[#8a3b12]">{errorMsg}</p>
      )}

      <button
        type="button"
        className="btn-primario mt-8 w-full text-center disabled:cursor-not-allowed disabled:opacity-40"
        disabled={!listo || enviando}
        onClick={pagar}
      >
        {enviando ? "Conectando con Mercado Pago…" : "Pagar con Mercado Pago"}
      </button>
      <p className="mt-2 text-center font-mono text-[0.65rem] uppercase tracking-[0.12em] text-text-secondary">
        Pago seguro en la pantalla de Mercado Pago
      </p>
    </div>
  );
}
