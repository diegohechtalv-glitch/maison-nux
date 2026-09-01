"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { entrar } from "@/app/admin/acciones";

function Boton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primario admin-btn" disabled={pending}>
      {pending ? "Comprobando…" : "Entrar"}
    </button>
  );
}

export default function FormaEntrar() {
  const [estado, accion] = useActionState(entrar, {});
  return (
    <form action={accion} className="admin-forma">
      {/* Los gestores de contraseñas esperan un campo de usuario junto al de
          contraseña para poder guardarla. El panel tiene un solo usuario. */}
      <input
        type="text"
        name="usuario"
        value="maison-nux"
        autoComplete="username"
        readOnly
        hidden
      />
      <label className="etiqueta-campo" htmlFor="password">
        Contraseña
      </label>
      <input
        id="password"
        name="password"
        type="password"
        className="campo"
        autoComplete="current-password"
        autoFocus
        required
      />
      {estado.error && (
        <p className="admin-error" role="alert">
          {estado.error}
        </p>
      )}
      <Boton />
    </form>
  );
}
