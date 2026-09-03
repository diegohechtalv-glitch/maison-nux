import type { Metadata } from "next";
import PaginaLegal from "@/components/secciones/PaginaLegal";
import { NEGOCIO } from "@/lib/negocio";
import { CONTACTO } from "@/lib/contacto";

export const metadata: Metadata = {
  title: "Aviso de privacidad · Maison Nux",
  description:
    "Qué datos personales pedimos en Maison Nux, para qué los usamos y cómo puedes acceder a ellos, corregirlos o pedir que los borremos.",
};

// Describe lo que el sitio HACE de verdad: los campos que pide el checkout,
// los servicios que tocan esos datos y las cookies que realmente existen.
// Si cambia el flujo de compra, hay que actualizar esta página.
export default function AvisoDePrivacidad() {
  return (
    <PaginaLegal
      titulo="Aviso de privacidad"
      entrada="Te pedimos los datos mínimos para prepararte y mandarte tu pedido. Nada más. Aquí te decimos exactamente cuáles son, quién los ve y cómo pedirnos que los borremos."
    >
      <h2>Quién es responsable de tus datos</h2>
      <div className="dato">
        <p>
          <strong>{NEGOCIO.nombreFiscal}</strong> ({NEGOCIO.regimen}), que
          opera bajo el nombre comercial de {NEGOCIO.nombreComercial}.
        </p>
        <p>Domicilio: {NEGOCIO.domicilio}.</p>
        <p>
          Correo:{" "}
          <a href={`mailto:${CONTACTO.correo}`}>{CONTACTO.correo}</a>
          {" · "}WhatsApp:{" "}
          <a href={CONTACTO.whatsappLink} target="_blank" rel="noreferrer">
            {CONTACTO.whatsappLegible}
          </a>
        </p>
      </div>
      <p>
        Este aviso se emite conforme a la Ley Federal de Protección de Datos
        Personales en Posesión de los Particulares.
      </p>

      <h2>Qué datos te pedimos</h2>
      <p>
        Solo los que hacen falta para que tu pedido llegue a tu puerta, y solo
        cuando decides comprar:
      </p>
      <ul>
        <li>Tu nombre.</li>
        <li>Tu correo electrónico.</li>
        <li>Tu teléfono de WhatsApp.</li>
        <li>
          Tu dirección de envío: calle y número, colonia, ciudad, estado y
          código postal.
        </li>
      </ul>
      <p>
        Navegar por la página, ver las presentaciones o armar un carrito no
        requiere ningún dato tuyo.
      </p>

      <h3>Datos que nunca vemos</h3>
      <p>
        <strong>Los de tu tarjeta.</strong> El cobro ocurre completo dentro de
        Mercado Pago: tu número de tarjeta, su vencimiento y su código de
        seguridad se capturan allá y nunca pasan por esta página ni se guardan
        en nuestros sistemas. De un pago nosotros solo recibimos un número de
        referencia y el aviso de si fue aprobado o rechazado.
      </p>

      <h3>Datos sensibles</h3>
      <p>
        No recabamos datos personales sensibles: ni de salud, ni religiosos, ni
        ideológicos, ni de ningún otro tipo de los que la ley considera
        sensibles.
      </p>

      <h2>Para qué los usamos</h2>
      <ul>
        <li>Preparar tu pedido y calcular el costo de envío de tu zona.</li>
        <li>
          Mandarte la confirmación de compra y el aviso de que tu paquete salió,
          con su número de guía.
        </li>
        <li>Contactarte si hay algo que aclarar sobre tu pedido.</li>
        <li>Llevar el registro de nuestras ventas.</li>
      </ul>
      <p>
        No usamos tus datos para mandarte publicidad ni promociones, y no te
        damos de alta en ninguna lista de correos por comprar.
      </p>

      <h2>Con quién los compartimos</h2>
      <p>
        No vendemos, rentamos ni intercambiamos tus datos. Solo los comparten
        los servicios que hacen falta para que tu pedido funcione, cada uno con
        lo mínimo que necesita:
      </p>
      <ul>
        <li>
          <strong>Mercado Pago</strong>, para procesar tu pago. Recibe tu correo
          y el monto.
        </li>
        <li>
          <strong>Resend</strong>, para entregarte los correos del pedido.
          Recibe tu nombre, tu correo y el contenido del mensaje.
        </li>
        <li>
          <strong>Neon</strong>, que es donde vive nuestra base de datos.
        </li>
        <li>
          <strong>Vercel</strong>, que es donde vive la página.
        </li>
        <li>
          <strong>La paquetería</strong> que lleve tu pedido, que necesita tu
          nombre, dirección y teléfono para entregártelo.
        </li>
      </ul>
      <p>
        Los servidores de Neon, Vercel y Resend están fuera de México, así que
        tus datos se almacenan y procesan en el extranjero. Al comprar aceptas
        esa transferencia, que se hace solo con los fines descritos arriba.
      </p>

      <h2>Cookies y almacenamiento en tu navegador</h2>
      <p>
        <strong>No usamos cookies de publicidad ni de rastreo</strong>, y no
        tenemos ninguna herramienta de análisis siguiéndote por la página.
      </p>
      <p>Lo único que guardamos en tu navegador es:</p>
      <ul>
        <li>
          <strong>Tu carrito</strong>, junto con el estado y código postal que
          escribiste para calcular el envío. Vive solo en tu dispositivo, no se
          nos manda, y lo borras vaciando el carrito o limpiando los datos del
          sitio.
        </li>
      </ul>
      <p>
        Hay además una cookie de sesión, pero es del panel de administración y
        solo existe para la persona que administra la tienda. Un cliente nunca
        la recibe.
      </p>

      <h2>Cuánto tiempo los conservamos</h2>
      <p>
        Los datos de un pedido se conservan mientras sean necesarios para
        cumplirlo y para respaldar el registro de la venta. Puedes pedirnos que
        los eliminemos antes, como se explica abajo.
      </p>

      <h2>Tus derechos ARCO</h2>
      <p>En cualquier momento puedes pedirnos:</p>
      <ul>
        <li>
          <strong>Acceso:</strong> saber qué datos tuyos tenemos.
        </li>
        <li>
          <strong>Rectificación:</strong> corregirlos si están mal.
        </li>
        <li>
          <strong>Cancelación:</strong> que los borremos de nuestros registros.
        </li>
        <li>
          <strong>Oposición:</strong> que dejemos de usarlos para un fin
          concreto.
        </li>
      </ul>
      <p>
        Escríbenos a{" "}
        <a href={`mailto:${CONTACTO.correo}`}>{CONTACTO.correo}</a> desde el
        mismo correo con el que compraste, dinos qué quieres y con qué pedido se
        relaciona. Te contestamos en un plazo máximo de 20 días hábiles.
      </p>
      <p>
        Si un dato es necesario para cumplir un pedido que sigue en curso, o para
        conservar el comprobante de una venta ya hecha, te lo diremos con
        claridad al responderte.
      </p>

      <h2>Cambios a este aviso</h2>
      <p>
        Si cambiamos algo, publicaremos la versión nueva en esta misma página con
        su fecha. Te sugerimos revisarla cuando vuelvas a comprar.
      </p>

      <h2>Si algo no te parece</h2>
      <p>
        Puedes acudir al Instituto Nacional de Transparencia, Acceso a la
        Información y Protección de Datos Personales (INAI). Pero antes,
        escríbenos: lo más probable es que lo resolvamos de inmediato.
      </p>
    </PaginaLegal>
  );
}
