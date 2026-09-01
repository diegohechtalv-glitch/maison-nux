import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { haySesion } from "@/lib/admin-auth";
import { prisma } from "@/lib/db";
import { leerConfigEnvios } from "@/lib/config-envios-server";
import { formatoMXN } from "@/lib/formato";
import {
  ETIQUETA_ALERTA,
  ETIQUETA_ESTADO,
  EXPLICACION_ALERTA,
  fechaLarga,
  telefonoLegible,
} from "@/lib/admin-formato";
import FormaEnviar from "@/components/admin/FormaEnviar";

export const dynamic = "force-dynamic";

export default async function DetallePedido({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await haySesion())) redirect("/admin/entrar");

  const { id } = await params;
  const pedido = await prisma.pedido.findUnique({
    where: { id },
    include: { items: true },
  });
  if (!pedido) notFound();

  const config = await leerConfigEnvios();
  const zona = config.zonas.find((z) => z.id === pedido.zonaId);

  return (
    <>
      <Link href="/admin" className="admin-volver">
        ← Pedidos
      </Link>

      <div className="admin-encabezado">
        <h1 className="admin-titulo">Pedido #{pedido.numero}</h1>
        <span className={`admin-chip admin-chip-${pedido.estado}`}>
          {ETIQUETA_ESTADO[pedido.estado] ?? pedido.estado}
        </span>
      </div>
      <p className="admin-nota">{fechaLarga(pedido.creadoEn)}</p>

      {pedido.mpAlerta && (
        <div className="admin-alerta" role="alert">
          <strong>{ETIQUETA_ALERTA[pedido.mpAlerta] ?? "Revisar en Mercado Pago"}</strong>
          <p>{EXPLICACION_ALERTA[pedido.mpAlerta] ?? "Revisa este pago en Mercado Pago."}</p>
        </div>
      )}

      <section className="admin-bloque">
        <h2 className="admin-subtitulo">Qué compró</h2>
        <ul className="admin-items">
          {pedido.items.map((i) => (
            <li key={i.id}>
              <span>
                {i.cantidad} × {i.gramos} g · {i.nombre}
              </span>
              <span>{formatoMXN(i.precioCentavos * i.cantidad)}</span>
            </li>
          ))}
        </ul>
        <dl className="admin-totales">
          <div>
            <dt>Subtotal</dt>
            <dd>{formatoMXN(pedido.subtotalCentavos)}</dd>
          </div>
          <div>
            <dt>Envío{zona ? ` · ${zona.nombre}` : ""}</dt>
            <dd>
              {pedido.envioCentavos === 0
                ? "Gratis"
                : formatoMXN(pedido.envioCentavos)}
            </dd>
          </div>
          <div className="admin-total">
            <dt>Total</dt>
            <dd>{formatoMXN(pedido.totalCentavos)}</dd>
          </div>
        </dl>
      </section>

      <section className="admin-bloque">
        <h2 className="admin-subtitulo">A dónde va</h2>
        <p className="admin-direccion">
          {pedido.nombre}
          <br />
          {pedido.calle}
          <br />
          {pedido.colonia}
          <br />
          {pedido.ciudad}, {pedido.estadoEnvio}, CP {pedido.codigoPostal}
        </p>
        <p className="admin-contacto">
          <a href={`https://wa.me/${pedido.telefono}`} rel="noreferrer">
            {telefonoLegible(pedido.telefono)}
          </a>
          <br />
          <a href={`mailto:${pedido.correo}`}>{pedido.correo}</a>
        </p>
      </section>

      <section className="admin-bloque">
        <h2 className="admin-subtitulo">Envío</h2>
        <FormaEnviar
          pedidoId={pedido.id}
          estado={pedido.estado}
          paqueteria={pedido.paqueteria}
          guia={pedido.guia}
          yaAvisado={pedido.avisoEnvioEn !== null}
        />
      </section>

      <section className="admin-bloque">
        <h2 className="admin-subtitulo">Mercado Pago</h2>
        <p className="admin-dato-mono">
          {pedido.mpPaymentId
            ? `Pago: ${pedido.mpPaymentId}`
            : "Sin pago registrado."}
        </p>
      </section>
    </>
  );
}
