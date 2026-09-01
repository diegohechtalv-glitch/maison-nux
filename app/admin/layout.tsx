import type { Metadata } from "next";
import Link from "next/link";
import { haySesion } from "@/lib/admin-auth";
import { salir } from "./acciones";

// noindex en todo el panel. A propósito NO se agrega a robots.txt: ese archivo
// es público y ahí estaríamos anunciando la dirección del panel.
export const metadata: Metadata = {
  title: "Panel · Maison Nux",
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dentro = await haySesion();
  return (
    <div className="admin">
      {dentro && (
        <header className="admin-barra">
          <nav className="admin-nav" aria-label="Panel">
            <Link href="/admin">Pedidos</Link>
            <Link href="/admin/envios">Envíos</Link>
          </nav>
          <form action={salir}>
            <button type="submit" className="admin-salir">
              Salir
            </button>
          </form>
        </header>
      )}
      <main className="admin-cuerpo">{children}</main>
    </div>
  );
}
