import Header from "@/components/secciones/Header";
import Hero from "@/components/hero/Hero";
import BandaConfianza from "@/components/secciones/BandaConfianza";
import Presentaciones from "@/components/secciones/Presentaciones";
import TresCosas from "@/components/secciones/TresCosas";
import Ornamento from "@/components/ui/Ornamento";
import Historia from "@/components/secciones/Historia";
import Ingredientes from "@/components/secciones/Ingredientes";
import Envios from "@/components/secciones/Envios";
import Faq from "@/components/secciones/Faq";
import Cierre from "@/components/secciones/Cierre";
import Footer from "@/components/secciones/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <BandaConfianza />
        <Presentaciones />
        <TresCosas />
        <Ornamento />
        <Historia />
        <Ingredientes />
        <Envios />
        <Faq />
        <Cierre />
      </main>
      <Footer />
    </>
  );
}
