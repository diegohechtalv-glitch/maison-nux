import { redirect } from "next/navigation";
import { adminConfigurado, haySesion } from "@/lib/admin-auth";
import FormaEntrar from "@/components/admin/FormaEntrar";

export const dynamic = "force-dynamic";

export default async function EntrarPage() {
  if (await haySesion()) redirect("/admin");
  return (
    <div className="admin-entrar">
      <h1 className="admin-titulo">Panel de pedidos</h1>
      {adminConfigurado() ? (
        <FormaEntrar />
      ) : (
        <p className="admin-aviso">
          El panel todavía no tiene contraseña configurada. Hay que poner la
          variable ADMIN_PASSWORD en Vercel y volver a desplegar.
        </p>
      )}
    </div>
  );
}
