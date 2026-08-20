import HeroScrub from "./HeroScrub";
import HeroStatic from "./HeroStatic";

// Los dos héroes viven en el DOM; las cinco media queries del gate deciden
// cuál se ve, y HeroScrub arma o desarma el scrub con las mismas cinco,
// en vivo (rotación, resize o cambio de reduced motion incluidos).
export default function Hero() {
  return (
    <>
      <HeroScrub />
      <HeroStatic />
    </>
  );
}
