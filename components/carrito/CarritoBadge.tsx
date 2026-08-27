"use client";

import Link from "next/link";
import { useCarrito } from "@/lib/carrito-store";

export default function CarritoBadge() {
  const items = useCarrito();
  const total = items.reduce((n, i) => n + i.cantidad, 0);
  return (
    <Link
      href="/carrito"
      className="btn-secundario !px-4 !py-2 text-sm"
      aria-label={`Carrito, ${total} ${total === 1 ? "artículo" : "artículos"}`}
    >
      Carrito{total > 0 ? ` · ${total}` : ""}
    </Link>
  );
}
