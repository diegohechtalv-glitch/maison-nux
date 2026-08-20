import Image from "next/image";
import Reveal from "./Reveal";
import ornamento from "@/public/img/ornamento-nuez.png";

// La rama botánica como separador de secciones, al 55% de opacidad.
export default function Ornamento() {
  return (
    <Reveal className="py-14">
      <Image
        src={ornamento}
        alt=""
        aria-hidden="true"
        className="ornamento mx-auto w-44"
        sizes="176px"
      />
    </Reveal>
  );
}
