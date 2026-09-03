import Image from "next/image";
import Link from "next/link";
import logo from "@/public/img/logo-maison-nux.png";
import { CONTACTO } from "@/lib/contacto";

// Columnas y línea de contacto según TEXTOS §7.
export default function Footer() {
  return (
    <footer className="border-t border-(--hairline) bg-panel">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
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
          <ul className="mt-2 text-sm">
            <li>
              <a className="inline-flex min-h-11 items-center hover:text-accent-deep" href="/#presentaciones">
                Presentaciones
              </a>
            </li>
            <li>
              <Link className="inline-flex min-h-11 items-center hover:text-accent-deep" href="/envios">
                Envíos
              </Link>
            </li>
            <li>
              <a className="inline-flex min-h-11 items-center hover:text-accent-deep" href="/#preguntas">
                Preguntas frecuentes
              </a>
            </li>
          </ul>
        </nav>
        <nav aria-label="Nosotros">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent-deep">
            Nosotros
          </p>
          <ul className="mt-2 text-sm">
            <li>
              <Link className="inline-flex min-h-11 items-center hover:text-accent-deep" href="/historia">
                La historia
              </Link>
            </li>
            <li>
              <a
                className="inline-flex min-h-11 items-center hover:text-accent-deep"
                href={CONTACTO.whatsappLink}
                target="_blank"
                rel="noreferrer"
              >
                Contacto
              </a>
            </li>
          </ul>
        </nav>
        <nav aria-label="Legal">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent-deep">
            Legal
          </p>
          <ul className="mt-2 text-sm">
            <li>
              <Link
                className="inline-flex min-h-11 items-center hover:text-accent-deep"
                href="/legal/aviso-de-privacidad"
              >
                Aviso de privacidad
              </Link>
            </li>
            <li>
              <Link
                className="inline-flex min-h-11 items-center hover:text-accent-deep"
                href="/legal/terminos"
              >
                Términos y condiciones
              </Link>
            </li>
            <li>
              <Link
                className="inline-flex min-h-11 items-center hover:text-accent-deep"
                href="/legal/devoluciones"
              >
                Política de devoluciones
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-(--hairline)">
        <p className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-2 px-6 py-5 text-center text-sm text-text-secondary">
          <a
            className="inline-flex min-h-11 items-center hover:text-accent-deep"
            href={CONTACTO.whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp {CONTACTO.whatsappLegible}
          </a>
          <span aria-hidden="true">·</span>
          <a
            className="inline-flex min-h-11 items-center hover:text-accent-deep"
            href={`mailto:${CONTACTO.correo}`}
          >
            {CONTACTO.correo}
          </a>
          <span aria-hidden="true">·</span>
          <a
            className="inline-flex min-h-11 items-center hover:text-accent-deep"
            href={CONTACTO.instagramLink}
            target="_blank"
            rel="noreferrer"
          >
            Instagram @{CONTACTO.instagramUsuario}
          </a>
        </p>
      </div>
      <div className="border-t border-(--hairline)">
        <p className="mx-auto max-w-6xl px-6 py-6 text-center text-sm text-text-secondary">
          Maison Nux · Hecho a mano en México · © 2026
        </p>
      </div>
    </footer>
  );
}
