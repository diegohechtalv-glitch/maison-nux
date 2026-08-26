import Image from "next/image";
import fotoHero from "@/public/img/bolsa-120g.jpg";

// Respaldo sin recorrido: reduced motion, conexión lenta o equipo corto.
// Tiene que verse terminada, no como el plan B.
export default function HeroStatic() {
  return (
    <section className="hero-static" aria-label="Maison Nux">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-7 px-6 pb-16 pt-28 text-center">
        <h1 className="text-4xl leading-tight">
          Una receta francesa con corazón mexicano
        </h1>
        <p className="max-w-[38ch] text-lg text-text-secondary">
          Nuez pecana caramelizada a mano, con el toque perfecto dulce y salado.
        </p>
        <a href="#presentaciones" className="btn-primario">
          Ver presentaciones
        </a>
        <Image
          src={fotoHero}
          alt="Bolsa de 120 g de nuez pecana Maison Nux"
          className="mt-4 w-full max-w-sm"
          sizes="(max-width: 720px) 90vw, 384px"
          placeholder="blur"
          priority
        />
      </div>
    </section>
  );
}
