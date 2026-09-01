"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { guardarConfigEnvios } from "@/app/admin/acciones";
import type { ConfigEnvios } from "@/lib/config-envios";

// En el formulario los montos se escriben en PESOS (más natural), y la acción
// del servidor los convierte a centavos, que es como vive todo en la base.
const aPesos = (centavos: number) => (centavos / 100).toString();

function Boton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primario admin-btn" disabled={pending}>
      {pending ? "Guardando…" : "Guardar cambios"}
    </button>
  );
}

export default function EditorEnvios({ config }: { config: ConfigEnvios }) {
  const [resultado, accion] = useActionState(guardarConfigEnvios, {});

  return (
    <form action={accion} className="admin-forma">
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

      {resultado.error && (
        <p className="admin-error" role="alert">
          {resultado.error}
        </p>
      )}
      {resultado.ok && (
        <p className="admin-ok" role="status">
          {resultado.ok}
        </p>
      )}

      <Boton />
    </form>
  );
}
