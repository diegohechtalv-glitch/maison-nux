import type { Metadata } from "next";
import Link from "next/link";
import PaginaLegal from "@/components/secciones/PaginaLegal";
import { NEGOCIO } from "@/lib/negocio";
import { CONTACTO } from "@/lib/contacto";

export const metadata: Metadata = {
  title: "Términos y condiciones · Maison Nux",
  description:
    "Las condiciones de compra en Maison Nux: precios, pagos, envíos, alérgenos y cómo se resuelve cualquier problema con tu pedido.",
};

export default function Terminos() {
  return (
    <PaginaLegal
      titulo="Términos y condiciones"
      entrada="Las reglas de comprar en esta página, escritas para entenderse. Al hacer un pedido, aceptas lo que dice aquí."
    >
      <h2>Quién te vende</h2>
      <div className="dato">
        <p>
          <strong>{NEGOCIO.nombreFiscal}</strong> ({NEGOCIO.regimen}), bajo el
          nombre comercial de {NEGOCIO.nombreComercial}.
        </p>
        <p>Domicilio: {NEGOCIO.domicilio}.</p>
        <p>
          Contacto:{" "}
          <a href={`mailto:${CONTACTO.correo}`}>{CONTACTO.correo}</a>
          {" · "}
          <a href={CONTACTO.whatsappLink} target="_blank" rel="noreferrer">
            WhatsApp {CONTACTO.whatsappLegible}
          </a>
        </p>
      </div>

      <h2>El producto</h2>
      <p>
        Vendemos nuez pecana artesanal, dulce y salada, en cuatro
        presentaciones: 40, 120, 300 y 600 gramos. Se prepara a mano y en lotes
        pequeños, así que puede haber diferencias mínimas de color y textura
        entre un lote y otro. Es parte de cómo se hace.
      </p>

      <h3>Alérgenos</h3>
      <p>
        <strong>
          El producto es nuez pecana y puede contener trazas de otros frutos
          secos.
        </strong>{" "}
        Si hay alergia a frutos secos en tu casa, tenlo en cuenta antes de
        comprar. Si tienes dudas, escríbenos antes.
      </p>

      <h3>Conservación</h3>
      <p>
        No lleva conservadores. Una vez abierta la bolsa hay que refrigerarla
        para que conserve su textura. Viene indicado en el empaque y en la
        página.
      </p>

      <h2>Precios y pagos</h2>
      <ul>
        <li>
          Todos los precios están en <strong>pesos mexicanos (MXN)</strong> y son
          los que aparecen en la página al momento de tu compra.
        </li>
        <li>
          El costo de envío se calcula y se te muestra antes de pagar, según tu
          estado y código postal. Puedes verlo en la{" "}
          <Link href="/envios">página de envíos</Link>.
        </li>
        <li>
          El pedido mínimo para envío es de $150 pesos.
        </li>
        <li>
          El pago se procesa en <strong>Mercado Pago</strong>. Los métodos
          disponibles son los que esa plataforma ofrezca en el momento.
        </li>
        <li>
          Podemos cambiar los precios cuando haga falta, pero{" "}
          <strong>nunca después de que ya pagaste</strong>: el precio de tu
          pedido es el que viste al comprar.
        </li>
      </ul>

      <h3>Cuándo queda confirmado tu pedido</h3>
      <p>
        Un pedido está confirmado solo cuando Mercado Pago nos avisa que el pago
        fue aprobado. Hasta ese momento aparece como pendiente. Al confirmarse
        te llega un correo con el detalle de tu compra.
      </p>
      <p>
        Si un pago es rechazado, el pedido queda marcado como fallido y no se te
        cobra nada. Puedes intentarlo de nuevo con otra tarjeta.
      </p>

      <h2>Envíos</h2>
      <ul>
        <li>Enviamos únicamente dentro de la República Mexicana.</li>
        <li>
          El costo depende de tu zona y del monto de tu pedido. Los detalles
          están en la <Link href="/envios">página de envíos</Link>.
        </li>
        <li>
          Hay códigos postales de zona extendida donde la paquetería cobra un
          sobrecosto. Si el tuyo es uno de ellos, te lo decimos en el checkout
          antes de que pagues, y ahí acordamos el envío por WhatsApp.
        </li>
        <li>
          Cuando tu paquete sale, te mandamos un correo con la paquetería y el
          número de guía para que puedas seguirlo.
        </li>
        <li>
          Los tiempos de entrega los define la paquetería. Los retrasos que
          ocurran en su poder no dependen de nosotros, pero si tu paquete se
          atora, escríbenos y le damos seguimiento contigo.
        </li>
      </ul>

      <h3>Tu dirección es tu responsabilidad</h3>
      <p>
        Revisa bien tu dirección y tu código postal antes de pagar. Si un pedido
        se devuelve porque la dirección estaba incompleta o equivocada, el
        reenvío tiene un costo adicional.
      </p>

      <h2>Cambios, cancelaciones y devoluciones</h2>
      <p>
        Están explicados en la{" "}
        <Link href="/legal/devoluciones">política de devoluciones</Link>.
      </p>

      <h2>Uso de la página</h2>
      <p>
        Los textos, fotos, videos y el logotipo de Maison Nux son nuestros y no
        pueden usarse con fines comerciales sin permiso por escrito.
      </p>
      <p>
        Hacemos lo posible por mantener la página funcionando y con información
        correcta, pero puede haber interrupciones por mantenimiento o por fallas
        de los servicios que usamos.
      </p>

      <h2>Ley aplicable</h2>
      <p>
        Estos términos se rigen por las leyes de los Estados Unidos Mexicanos.
        Cualquier controversia se resolverá ante los tribunales competentes de
        Jalisco, sin perjuicio de los derechos que la Ley Federal de Protección
        al Consumidor te reconoce como consumidor, incluida la posibilidad de
        acudir a la PROFECO.
      </p>

      <h2>Cambios a estos términos</h2>
      <p>
        Si cambian, publicamos la versión nueva en esta página con su fecha. La
        que aplica a tu pedido es la que estaba vigente cuando compraste.
      </p>
    </PaginaLegal>
  );
}
