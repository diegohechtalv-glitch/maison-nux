import Image from "next/image";
import Link from "next/link";
import logo from "@/public/img/logo-maison-nux.png";

// Columnas según TEXTOS §7. La columna Legal y la línea de contacto entran
// cuando existan los textos legales y los datos (WhatsApp, correo, Instagram).
export default function Footer() {
  return (
    <footer className="border-t border-(--hairline) bg-panel">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <Image src={logo} alt="Maison Nux" className="h-12 w-auto" sizes="150px" />
          <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-text-secondary">
            100% artesanal · Nuez pecana
          </p>
        </div>
        <nav aria-label="Tienda">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent-deep">
            Tienda
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a className="hover:text-accent-deep" href="/#presentaciones">
                Presentaciones
              </a>
            </li>
            <li>
              <Link className="hover:text-accent-deep" href="/envios">
                Envíos
              </Link>
            </li>
            <li>
              <a className="hover:text-accent-deep" href="/#preguntas">
                Preguntas frecuentes
              </a>
            </li>
          </ul>
        </nav>
        <nav aria-label="Nosotros">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent-deep">
            Nosotros
          </p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link className="hover:text-accent-deep" href="/historia">
                La historia
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-(--hairline)">
        <p className="mx-auto max-w-6xl px-6 py-6 text-center text-sm text-text-secondary">
          Maison Nux · Hecho a mano en México · © 2026
        </p>
      </div>
    </footer>
  );
}
