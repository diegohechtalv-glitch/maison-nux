"use client";

import { useActionState, useCallback, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { guardarConfigEnvios } from "@/app/admin/acciones";
import type { ConfigEnvios } from "@/lib/config-envios";

// En el formulario los montos se escriben en PESOS (más natural), y la acción
// del servidor los convierte a centavos, que es como vive todo en la base.
const aPesos = (centavos: number) => (centavos / 100).toString();

const AVISO = "Tienes cambios sin guardar. Si sales ahora se pierden.";

// Retrato del formulario para saber si de verdad cambió algo. Comparar el
// contenido (y no solo "tocó una tecla") hace que deshacer un cambio vuelva a
// dejar el formulario limpio.
function retrato(form: HTMLFormElement): string {
  return JSON.stringify([...new FormData(form).entries()]);
}

function BarraGuardar({
  sucio,
  resultado,
}: {
  sucio: boolean;
  resultado: { error?: string; ok?: string };
}) {
  const { pending } = useFormStatus();

  const estado = pending
    ? "guardando"
    : sucio
      ? resultado.error
        ? "error"
        : "sucio"
      : resultado.ok
        ? "ok"
        : null;

  if (estado === null) return null;

  const mensaje =
    estado === "guardando"
      ? "Guardando…"
      : estado === "error"
        ? resultado.error
        : estado === "ok"
          ? resultado.ok
          : "Tienes cambios sin guardar.";

  return (
    <div className="admin-barra-guardar" data-estado={estado}>
      <p
        className="admin-barra-guardar-texto"
        role={estado === "error" ? "alert" : "status"}
        aria-live={estado === "error" ? "assertive" : "polite"}
      >
        {mensaje}
      </p>
      {estado !== "ok" && (
        <button
          type="submit"
          className="btn-primario admin-btn admin-barra-guardar-btn"
          disabled={pending}
        >
          {pending ? "Guardando…" : "Guardar cambios"}
        </button>
      )}
    </div>
  );
}

export default function EditorEnvios({ config }: { config: ConfigEnvios }) {
  const [resultado, accion] = useActionState(guardarConfigEnvios, {});
  const formRef = useRef<HTMLFormElement>(null);
  const baseRef = useRef<string | null>(null);
  const [sucio, setSucio] = useState(false);

  // Retrato de partida, una vez montado el formulario.
  useEffect(() => {
    if (formRef.current) baseRef.current = retrato(formRef.current);
  }, []);

  const revisar = useCallback(() => {
    if (!formRef.current || baseRef.current === null) return;
    setSucio(retrato(formRef.current) !== baseRef.current);
  }, []);

  // Tras guardar bien, lo que hay en pantalla pasa a ser el nuevo punto de
  // partida: la barra deja de avisar de cambios pendientes.
  useEffect(() => {
    if (resultado.ok && formRef.current) {
      baseRef.current = retrato(formRef.current);
      setSucio(false);
    }
  }, [resultado.ok]);

  // Avisos al salir. Solo se arman cuando hay algo que perder.
  useEffect(() => {
    if (!sucio) return;

    // 1. Cerrar la pestaña o recargar: diálogo del navegador.
    const alDescargar = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = AVISO;
    };
    window.addEventListener("beforeunload", alDescargar);

    // 2. Navegar dentro del panel (Pedidos, Envíos, volver): los enlaces de
    //    Next no recargan la página, así que beforeunload no los alcanza.
    //    Se intercepta el clic antes de que React lo procese.
    const alClic = (e: MouseEvent) => {
      const destino = (e.target as HTMLElement | null)?.closest?.("a[href]");
      if (!(destino instanceof HTMLAnchorElement)) return;
      if (destino.target === "_blank" || destino.hasAttribute("download")) return;
      if (destino.getAttribute("href")?.startsWith("#")) return;
      if (!window.confirm(`${AVISO}\n\n¿Salir de todos modos?`)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    document.addEventListener("click", alClic, true);

    // 3. "Salir" es un botón de formulario, no un enlace.
    const alEnviar = (e: SubmitEvent) => {
      if (e.target === formRef.current) return; // guardar sí procede
      if (!window.confirm(`${AVISO}\n\n¿Salir de todos modos?`)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    document.addEventListener("submit", alEnviar, true);

    return () => {
      window.removeEventListener("beforeunload", alDescargar);
      document.removeEventListener("click", alClic, true);
      document.removeEventListener("submit", alEnviar, true);
    };
  }, [sucio]);

  return (
    <form
      ref={formRef}
      action={accion}
      onInput={revisar}
      onChange={revisar}
      className="admin-forma admin-forma-envios"
    >
      <label className="etiqueta-campo" htmlFor="pedidoMinimo">
        Pedido mínimo para poder enviar (pesos)
      </label>
      <input
        id="pedidoMinimo"
        name="pedidoMinimo"
        className="campo"
        inputMode="decimal"
        defaultValue={aPesos(config.pedidoMinimoCentavos)}
        required
      />

      {config.zonas.map((zona) => (
        <fieldset key={zona.id} className="admin-zona">
          <legend>{zona.nombre}</legend>

          {zona.codigosPostales !== undefined ? (
            <p className="admin-nota">
              Esta zona se decide por código postal, no por estado.
            </p>
          ) : zona.estados === "resto" ? (
            <p className="admin-nota">
              Esta zona cubre todos los estados que no estén en otra zona.
            </p>
          ) : (
            <>
              <label className="etiqueta-campo" htmlFor={`estados_${zona.id}`}>
                Estados (separados por comas)
              </label>
              <textarea
                id={`estados_${zona.id}`}
                name={`estados_${zona.id}`}
                className="campo admin-area"
                rows={3}
                defaultValue={zona.estados.join(", ")}
              />
            </>
          )}

          {zona.codigosPostales !== undefined && (
            <>
              <label className="etiqueta-campo" htmlFor={`cps_${zona.id}`}>
                Códigos postales de esta zona (5 dígitos, separados por comas)
              </label>
              <textarea
                id={`cps_${zona.id}`}
                name={`cps_${zona.id}`}
                className="campo admin-area"
                rows={3}
                defaultValue={(zona.codigosPostales ?? []).join(", ")}
              />
            </>
          )}

          <p className="etiqueta-campo">Costos por monto del pedido</p>
          {zona.tramos.map((tramo, i) => (
            <div key={i} className="admin-tramo">
              <div>
                <label
                  className="etiqueta-campo"
                  htmlFor={`desde_${zona.id}_${i}`}
                >
                  Desde (pesos)
                </label>
                <input
                  id={`desde_${zona.id}_${i}`}
                  name={`desde_${zona.id}_${i}`}
                  className="campo"
                  inputMode="decimal"
                  defaultValue={aPesos(tramo.desdeCentavos)}
                />
              </div>
              <div>
                <label
                  className="etiqueta-campo"
                  htmlFor={`costo_${zona.id}_${i}`}
                >
                  Cuesta (pesos, 0 = gratis)
                </label>
                <input
                  id={`costo_${zona.id}_${i}`}
                  name={`costo_${zona.id}_${i}`}
                  className="campo"
                  defaultValue={
                    tramo.costoCentavos === "cotizar"
                      ? "cotizar"
                      : aPesos(tramo.costoCentavos)
                  }
                />
              </div>
            </div>
          ))}
          <p className="admin-nota">
            Escribe la palabra <strong>cotizar</strong> en el costo cuando no
            haya tarifa automática y tengas que acordarla aparte.
          </p>
        </fieldset>
      ))}

      <BarraGuardar sucio={sucio} resultado={resultado} />
    </form>
  );
}
