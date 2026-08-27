// Siembra las 4 presentaciones (desde lib/productos.ts, la única fuente de
// verdad) y la configuración provisional de envíos.
// Correr con: npx prisma db seed

import { PrismaClient } from "@prisma/client";
import { productos } from "../lib/productos.ts";
import { CONFIG_ENVIOS_PROVISIONAL } from "../lib/config-envios.ts";

const prisma = new PrismaClient();

async function main() {
  for (const p of productos) {
    await prisma.producto.upsert({
      where: { id: p.id },
      update: {
        gramos: p.gramos,
        precioCentavos: p.precioCentavos,
        foto: p.foto,
        nombre: p.nombre,
        frase: p.frase,
        parrafo: p.parrafo,
      },
      create: { ...p },
    });
  }
  await prisma.configuracion.upsert({
    where: { clave: "envios" },
    update: {},
    create: {
      clave: "envios",
      datos: CONFIG_ENVIOS_PROVISIONAL as object,
    },
  });
  console.log("Seed listo: 4 productos y configuración de envíos.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
