import Link from "next/link";
import { redirect } from "next/navigation";
import { haySesion } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { leerConfigEnvios } from "@/lib/config-envios-server";
import { formatoMXN } from "@/lib/formato";
import { fechaCorta, ETIQUETA_ALERTA, ETIQUETA_ESTADO } from "@/lib/admin-formato";

export const dynamic = "force-dynamic";

const FILTROS = [
  { id: "todos", texto: "Todos" },
  { id: "pagado", texto: "Pagados" },
  { id: "enviado", texto: "Enviados" },
  { id: "fallido", texto: "Fallidos" },
];

export default async function AdminPedidos({
  searchParams,
}: {
  searchParams: Promise<{ estado?: string }>;
}) {
  // La sesión se valida ANTES de pedirle un solo dato a la base.
  if (!(await haySesion())) redirect("/admin/entrar");

  const { estado } = await searchParams;
  const filtro = FILTROS.some((f) => f.id === estado) ? estado : "todos";

  const [pedidos, config] = await Promise.all([
    prisma.pedido.findMany({
      where: filtro && filtro !== "todos" ? { estado: filtro } : undefined,
      orderBy: { creadoEn: "desc" },
      take: 100,
      select: {
        id: true,
        numero: true,
        estado: true,
        nombre: true,
        totalCentavos: true,
        zonaId: true,
        creadoEn: true,
        mpAlerta: true,
      },
    }),
    leerConfigEnvios(),
  ]);

  const nombreZona = (id: string) =>
    config.zonas.find((z) => z.id === id)?.nombre ?? id;

  return (
    <>
      <h1 className="admin-titulo">Pedidos</h1>

      <nav className="admin-filtros" aria-label="Filtrar por estado">
        {FILTROS.map((f) => (
          <Link
            key={f.id}
            href={f.id === "todos" ? "/admin" : `/admin?estado=${f.id}`}
            className={`admin-filtro${filtro === f.id ? " es-activo" : ""}`}
            aria-current={filtro === f.id ? "page" : undefined}
          >
            {f.texto}
          </Link>
        ))}
      </nav>

      {pedidos.length === 0 ? (
        <p className="admin-vacio">
          {filtro === "todos"
            ? "Todavía no hay pedidos."
            : "No hay pedidos con ese estado."}
        </p>
      ) : (
        <ul className="admin-lista">
          {pedidos.map((p) => (
            <li key={p.id}>
              <Link href={`/admin/pedidos/${p.id}`} className="admin-fila">
                <span className="admin-fila-numero">#{p.numero}</span>
                <span className="admin-fila-cliente">{p.nombre}</span>
                <span className="admin-fila-fecha">{fechaCorta(p.creadoEn)}</span>
                <span className="admin-fila-zona">{nombreZona(p.zonaId)}</span>
                <span className="admin-fila-total">
                  {formatoMXN(p.totalCentavos)}
                </span>
                <span className={`admin-chip admin-chip-${p.estado}`}>
                  {ETIQUETA_ESTADO[p.estado] ?? p.estado}
                </span>
                {p.mpAlerta && (
                  <span className="admin-chip admin-chip-alerta">
                    {ETIQUETA_ALERTA[p.mpAlerta] ?? "Revisar"}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {pedidos.length === 100 && (
        <p className="admin-nota">
          Se muestran los 100 pedidos más recientes.
        </p>
      )}
    </>
  );
}
