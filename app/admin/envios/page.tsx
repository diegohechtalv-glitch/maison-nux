import { redirect } from "next/navigation";
import { haySesion } from "@/lib/admin-auth";
import { leerConfigEnvios } from "@/lib/config-envios-server";
import EditorEnvios from "@/components/admin/EditorEnvios";

export const dynamic = "force-dynamic";

export default async function AdminEnvios() {
  if (!(await haySesion())) redirect("/admin/entrar");
  const config = await leerConfigEnvios();
  return (
    <>
      <h1 className="admin-titulo">Zonas y costos de envío</h1>
      <div className="admin-alerta admin-alerta-suave">
        <strong>Los cambios aplican a los pedidos nuevos.</strong>
        <p>
          Un pedido que ya se hizo conserva el costo de envío que se le cobró en
          su momento. Nada de lo que cambies aquí lo modifica.
        </p>
      </div>
      <EditorEnvios config={config} />
    </>
  );
}
