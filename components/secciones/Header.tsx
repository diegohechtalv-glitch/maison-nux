import Image from "next/image";
import Link from "next/link";
import logo from "@/public/img/logo-maison-nux.png";
import CarritoBadge from "@/components/carrito/CarritoBadge";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-(--hairline) bg-[color-mix(in_srgb,var(--canvas)_84%,transparent)] backdrop-blur-md">
      <a href="#main" className="skip-link">
        Ir al contenido
      </a>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="Maison Nux, inicio">
          <Image src={logo} alt="Maison Nux" className="h-11 w-auto" sizes="140px" priority />
        </Link>
        <div className="flex items-center gap-6">
        <nav aria-label="Principal" className="hidden gap-8 text-sm font-normal tracking-wide md:flex">
          <a className="hover:text-accent-deep" href="/#presentaciones">
            Presentaciones
          </a>
          <Link className="hover:text-accent-deep" href="/historia">
            La historia
          </Link>
          <Link className="hover:text-accent-deep" href="/envios">
            Envíos
          </Link>
          <a className="hover:text-accent-deep" href="/#preguntas">
            Preguntas
          </a>
        </nav>
        <CarritoBadge />
        </div>
      </div>
    </header>
  );
}
