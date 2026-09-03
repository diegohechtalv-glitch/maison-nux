import type { Metadata } from "next";
import PaginaLegal from "@/components/secciones/PaginaLegal";
import { CONTACTO } from "@/lib/contacto";

export const metadata: Metadata = {
  title: "Política de devoluciones · Maison Nux",
  description:
    "Qué hacer si tu pedido de Maison Nux llegó dañado, incompleto o equivocado, y cómo cancelar antes de que salga.",
};

export default function Devoluciones() {
  return (
    <PaginaLegal
      titulo="Política de devoluciones"
      entrada="Es un alimento, así que no podemos recibirlo de vuelta una vez que salió. Pero si algo llegó mal, lo resolvemos."
    >
      <h2>Por qué no aceptamos devoluciones</h2>
      <p>
        La nuez es un producto alimenticio sin conservadores. Una vez que sale
        de nuestras manos no hay forma de garantizar cómo se guardó, así que no
        podemos revenderla ni recibirla de regreso. Es una cuestión de seguridad
        alimentaria, no de política comercial.
      </p>
      <p>
        Eso <strong>no</strong> significa que te quedes con un problema. Sigue
        leyendo.
      </p>

      <h2>Si tu pedido llegó mal</h2>
      <p>
        Te lo reponemos sin costo, o te devolvemos tu dinero, si al recibirlo:
      </p>
      <ul>
        <li>El empaque venía roto, abierto o dañado.</li>
        <li>Falta algo de lo que pediste.</li>
        <li>Te llegó una presentación distinta a la que compraste.</li>
        <li>El producto llegó en mal estado.</li>
      </ul>

      <h3>Qué hacer</h3>
      <p>
        Escríbenos por{" "}
        <a href={CONTACTO.whatsappLink} target="_blank" rel="noreferrer">
          WhatsApp
        </a>{" "}
        o a <a href={`mailto:${CONTACTO.correo}`}>{CONTACTO.correo}</a> dentro de
        los <strong>5 días naturales</strong> siguientes a la entrega, con:
      </p>
      <ul>
        <li>Tu número de pedido.</li>
        <li>Una o dos fotos de lo que llegó, incluyendo el empaque.</li>
      </ul>
      <p>
        Te contestamos en un máximo de 2 días hábiles y acordamos contigo si
        prefieres la reposición o el reembolso. No tienes que regresarnos el
        producto.
      </p>

      <h3>Cómo llega el reembolso</h3>
      <p>
        Si eliges reembolso, se hace por el mismo medio con el que pagaste, a
        través de Mercado Pago. El tiempo en que se refleja depende de tu banco:
        normalmente entre 5 y 10 días hábiles.
      </p>

      <h2>Si quieres cancelar</h2>
      <p>
        Puedes cancelar sin costo mientras tu pedido{" "}
        <strong>no haya salido</strong>. Escríbenos en cuanto lo decidas y te
        devolvemos el total, incluido el envío.
      </p>
      <p>
        Una vez que el paquete está con la paquetería ya no se puede cancelar,
        porque el envío ya se pagó y el producto ya salió.
      </p>

      <h2>Si el paquete no llega</h2>
      <p>
        Escríbenos con tu número de pedido. Levantamos la aclaración con la
        paquetería usando el número de guía y le damos seguimiento contigo hasta
        resolverlo. Si el paquete se pierde en tránsito, te lo reponemos.
      </p>

      <h2>Lo que no cubre</h2>
      <ul>
        <li>
          Que el sabor no te haya gustado. Es dulce y salada a la vez, y eso
          divide opiniones: por eso existe la presentación de 40 gramos, para
          probar.
        </li>
        <li>
          Producto que se echó a perder por no refrigerarse después de abrir.
        </li>
        <li>
          Entregas fallidas por una dirección incompleta o equivocada. En ese
          caso te lo reenviamos cubriendo tú el costo del nuevo envío.
        </li>
      </ul>
    </PaginaLegal>
  );
}
