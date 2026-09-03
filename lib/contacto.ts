// Datos de contacto públicos de la marca.
//
// Van en el repositorio a propósito: son datos que la propia página muestra a
// cualquiera que la abra, no secretos. Las variables de entorno los pueden
// sobrescribir sin tocar código (Vercel → Settings → Environment Variables),
// y el valor de aquí es el que rige si la variable no está puesta.

import { telefonoLegible } from "./formato";

const WHATSAPP_10 = (process.env.CONTACTO_WHATSAPP ?? "3329159052")
  .replace(/\D/g, "")
  .slice(-10);

export const CONTACTO = {
  // Convención del proyecto: 521 + 10 dígitos (aprendido a la mala en el CRM).
  whatsappLink: `https://wa.me/521${WHATSAPP_10}`,
  // "33 2915 9052". La misma función que usa el panel, para que una clave de
  // área de tres dígitos también salga bien partida.
  whatsappLegible: telefonoLegible(WHATSAPP_10),
  correo: process.env.CORREO_CONTACTO ?? "ventas@maisonnux.com",
  instagramUsuario: "maison_nux",
  instagramLink: "https://instagram.com/maison_nux",
};
