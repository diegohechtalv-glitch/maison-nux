"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { marcarEnviado } from "@/app/admin/acciones";

function Boton({ yaEnviado }: { yaEnviado: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="btn-primario admin-btn"
      disabled={pending} // el doble clic también se frena aquí
    >
      {pending
        ? "Guardando…"
        : yaEnviado
          ? "Guardar guía"
          : "Marcar como enviado"}
    </button>
  );
}

export default function FormaEnviar({
  pedidoId,
  estado,
  paqueteria,
  guia,
  yaAvisado,
}: {
  pedidoId: string;
  estado: string;
  paqueteria: string | null;
  guia: string | null;
  yaAvisado: boolean;
}) {
  const [resultado, accion] = useActionState(marcarEnviado, {});
  const yaEnviado = estado === "enviado";

  if (estado !== "pagado" && estado !== "enviado") {
    return (
      <p className="admin-nota">
        Solo se puede marcar como enviado un pedido pagado. Este está en
        estado &quot;{estado}&quot;.
      </p>
    );
  }

  return (
    <form action={accion} className="admin-forma">
      <input type="hidden" name="pedidoId" value={pedidoId} />

      <label className="etiqueta-campo" htmlFor="paqueteria">
        Paquetería (opcional)
      </label>
      <input
        id="paqueteria"
        name="paqueteria"
        className="campo"
        defaultValue={paqueteria ?? ""}
        placeholder="Estafeta, DHL, Fedex…"
        autoComplete="off"
      />

      <label className="etiqueta-campo" htmlFor="guia">
        Número de guía (opcional)
      </label>
      <input
        id="guia"
        name="guia"
        className="campo"
        defaultValue={guia ?? ""}
        inputMode="numeric"
        autoComplete="off"
      />

      <p className="admin-nota">
        {yaAvisado
          ? "El aviso al cliente ya salió. Guardar de nuevo actualiza los datos sin volver a mandarlo."
          : "Al marcarlo se le manda al cliente un correo avisando que su pedido va en camino, con la guía si la capturaste."}
      </p>

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

      <Boton yaEnviado={yaEnviado} />
    </form>
  );
}
