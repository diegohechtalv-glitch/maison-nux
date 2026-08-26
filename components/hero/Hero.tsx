import HeroScrub from "./HeroScrub";
import HeroStatic from "./HeroStatic";

// Los dos héroes viven en el DOM. El animado corre en escritorio Y celular;
// el estático es respaldo (reduced motion vía media query, conexión lenta o
// equipo corto vía la clase hero-degradado que pone HeroScrub).
export default function Hero() {
  return (
    <>
      <HeroScrub />
      <HeroStatic />
    </>
  );
}
