# Decisiones de la Fase 1 — aprobadas por Juan Fran (2026-08-20)

Registro de las decisiones que resolvieron los conflictos detectados entre
`CLAUDE.md`, el brief, el design package, los textos y la skill, para que las
fases siguientes no las reabran.

## Decisiones de Juan Fran

1. **Rayas largas (—) en el copy.** Se sustituyen por comas o dos puntos, sin
   tocar ninguna otra palabra. La firma "— Raquel" se conserva: es firma, no
   prosa. El copy gate queda con esa excepción explícita.
2. **Banda oscura del home ("Hola, soy Raquel").** Se usa el texto del design
   package (§6.3), más el botón "Leer la historia completa" hacia `/historia`.
3. **Héroe con un solo botón:** "Ver presentaciones". El embudo entero apunta a
   comprar; a la historia se llega desde la banda oscura y el footer.
4. **Copy de envío gratis (home y FAQ).** Redacción nueva de Juan Fran, que
   sustituye a "a todo el país":
   > Envío gratis desde $750 en la mayor parte del país. Al poner tu código
   > postal te decimos si el tuyo tiene costo.
5. **El héroe animado corre también en celular** (ajuste posterior de Juan
   Fran: más de la mitad del tráfico es móvil). El héroe estático pasa a ser
   respaldo automático: `prefers-reduced-motion`, conexión lenta o equipo
   corto. CLAUDE.md y el design package quedaron actualizados.
6. **Banda de confianza:** "Envío gratis desde $750 en la mayor parte del
   país" (mismo matiz que el punto 4).
7. **Precio en el catálogo:** corto, "$50". El formato completo
   "$50.00 MXN" queda para el carrito y el checkout.
8. **Titulares del héroe:** `clamp(2.4rem, 5.5vw, 5rem)`.
9. **El titular nunca se monta sobre el sujeto** (ajuste posterior de Juan
   Fran): el packshot trae su propio logo y tipografía, así que el texto no
   compite con él. Escritorio: bolsa anclada a la derecha (foto en un panel
   al 62% con el borde fundido al kraft plano sampleado de la propia foto),
   texto en el kraft limpio de la izquierda, anchos elegidos para que jamás
   se toquen. Celular: encuadre vertical, texto arriba y bolsa abajo. Sin
   velos ni halos: la legibilidad se resuelve con colocación, medida sobre
   píxeles reales. La misma regla rige el video de la fase 5, y el frame de
   la fase 2 se compone dejando ese espacio negativo a propósito.

10. **Copy v2 (aprobado por Juan Fran):** bandas 2 y 3 del héroe ("La
    combinación perfecta entre salado y dulce" / "Un sabor que te revive
    recuerdos"; el texto ya no describe la imagen, a propósito, y el
    storyboard del video no cambia); tarjetas de producto en tres partes con
    nombre propio (El diario, La jornada, La casa, El obsequio); "Tres cosas
    que no negociamos" reescritas (La receta, El equilibrio, Las manos); FAQ
    de pedidos grandes: "Sí, contáctanos por WhatsApp para darte más
    información." Los encabezados usan punto medio `·` como separador, no
    raya. TEXTOS-PAGINA.md y el design package quedaron sincronizados,
    incluidos los textos de envío aprobados en rondas anteriores.

## Reglas de trabajo derivadas (asumidas y no vetadas)

- **Precedencia de copy:** cuando TEXTOS-PAGINA y el design package traigan el
  mismo texto con palabras distintas, gana `TEXTOS-PAGINA.md`. El design
  package manda en estructura, orden y comportamiento. Ejemplo aplicado:
  "la sal de mar justa".
- **FAQ del home:** las 5 del design package (§6.6). La de OXXO/meses entra en
  la fase 4; las de vida de anaquel y recolección, cuando existan los datos.
- **Banda de confianza** de TEXTOS §1: sí entra, debajo del héroe.
- **Cierre "¿Nos pedimos una bolsa?"** (package §6.8): sí entra.
- **Footer:** columnas de TEXTOS §7, sin la columna Legal ni la línea de
  contacto hasta que existan los textos legales y los datos (WhatsApp, correo,
  Instagram).
- **Página /envios:** sin el bloque de tiempos de entrega hasta tener los
  reales de la paquetería.

## Decisiones técnicas (dichas en voz alta, como pide la skill)

- **Héroe de 500vh** (5 pantallas de scroll): con 400vh las 4 bandas quedan por
  debajo del mínimo de lectura del estándar (`scrub-pipeline.md`); con 500vh
  los porcentajes aprobados del band map caben sin tocarlo.
- **Legibilidad invertida:** el estándar de la skill supone metraje oscuro y
  texto claro; esta marca es lo contrario. Titulares en café nuez sobre el
  espacio kraft de la foto, con halo crema detrás del texto (aclarar, no
  oscurecer). Contrastes medidos: café nuez sobre kraft 6.81:1, sobre crema
  11.82:1.
- **Botones con fondo dorado oscuro (#7A5C1E), no dorado primario:** blanco
  hueso sobre #A07828 da 3.86:1 (falla el mínimo 4.5:1); sobre #7A5C1E da
  5.95:1.
- **El CTA de la banda 4 entra escalonado por progreso de scroll**, no con
  retraso en milisegundos, para que sea reversible al subir. Los "300 ms" de
  la banda 1 sí son la rampa única de carga que el estándar permite.
- **Partículas de sal en dorado oscuro (#7A5C1E):** el dorado claro es casi
  invisible sobre fondo claro (1.3:1 medido sobre la foto).
- **El look crema + serif + dorado viene del empaque real** de la marca, no de
  un default de IA (carve-out de la dirección de diseño de la skill, declarado
  aquí en voz alta).

## Notas guardadas para la fase 2 (prompts del video)

- La anatomía de la pecana en macro es el mayor riesgo de generación: iterar el
  frame (~2 créditos) hasta que se vea correcta; favorecer la nuez ya con algo
  de brillo.
- Escribir vida ambiental en el prompt (luz que se desplaza, brillo que
  respira): sujeto en reposo, escena nunca muerta.
- Fórmula de guardia completa en cada prompt: "No text, no logos, no lettering
  anywhere".
- Componer el frame final con margen generoso arriba y abajo, y verificarlo
  con el header montado encima en ventana ancha y corta.
- (Sustituida en fase 2) El vertido de caramelo salió del concepto: sobre la
  nuez ya caramelizada caen azúcar de caña y sal de mar, partículas que son
  sujetos aún más nobles de generar que un líquido.
- Los porcentajes 22/48/74 del band map son provisionales: se reajustan al
  metraje real en la fase 5 editando `components/hero/bands.ts` (reajustar
  porcentajes no es rediseñar el héroe).

## Decisiones de la Fase 2 (en curso)

- **Frame inicial:** aprobada la generación (Nano Banana Pro, 2 créditos por
  intento). v1 con caramelo líquido cayendo; Juan Fran aprobó tonos y estética
  pero pidió quitar el líquido: **solo caen azúcar y sal**. v2 generado con la
  nuez ya caramelizada, nada cayendo aún, azúcar de caña sobre la piedra.
- **Concepto del video v2/v3:** banda 2 = cae azúcar de caña, banda 3 = cae
  sal de mar. El band map de rangos y el copy no cambian. **Dato de producto
  fijado por Juan Fran: no lleva ningún tipo de caramelo.** La nuez se
  muestra con costra seca de azúcar y sal (cristales, acabado mate), nunca
  húmeda ni con brillo de jarabe; v1 (caramelo cayendo) y v2 (nuez glaseada
  brillante) se descartaron por eso.
- **Ruta de video aprobada (prudente):** prueba de movimiento en Kling 2.6
  (5 créditos) y, si convence, definitivo en Veo 3.1 (43.5 créditos por
  intento, tope 3). Cotizaciones hechas con get_cost; saldo inicial 1,020.95.

## Resultado final de la generación (fase 2 extendida, aprobado)

- **Frame aprobado: v4** (Nano Banana Pro): mitad de pecana pelada, surcos
  visibles, costra seca de azúcar y sal, nada cayendo, sujeto abajo-derecha
  con aire limpio arriba e izquierda. Guardado en
  `docs/media/heroe-frame-aprobado.png` (job f72e414f). v1 (caramelo líquido),
  v2 (nuez glaseada) y v3 (nuez con cáscara) descartados.
- **4 pruebas de movimiento en Kling 2.6** (5 créditos c/u; la 4a con permiso
  expreso de Juan Fran para superar el tope de 3). La prueba 4 fijó el
  movimiento aprobado: sal tan visible como el azúcar, granos finos, colores
  diferenciados, esparcido amplio en la piedra, cresta ligera.
- **Intento en Veo 3.1 (43.5, fallido):** mismo prompt de la prueba 4, pero
  acumuló demasiada azúcar sobre la nuez y salió a 720p. Descartado.
- **VIDEO APROBADO: MiniMax H3** (24 créditos) con el frame v4 como referencia
  de imagen y la prueba 4 como referencia de movimiento. 2560×1440 (2K),
  6.58 s, cierre en reposo real. Master guardado en
  `docs/media/heroe-master-2k.mp4` (job 71076a82). Trae pista de audio que se
  eliminará en el procesado de la fase 5, donde también se recorta/afina el
  final y se aplican las recetas de ffmpeg de la skill.
- **Créditos de toda la generación: 95.5** (8 en frames + 20 en pruebas +
  43.5 Veo fallido + 24 MiniMax). Saldo aproximado tras la fase: 925.45.
- **Pendiente para la fase 5:** procesado ffmpeg (sin audio, recorte del
  cierre, compresión web), sustitución de la foto fija por el video en el
  héroe ya construido, y el flick test + auditoría de legibilidad sobre el
  metraje real.
- **Maqueta de recortes verificada por Juan Fran antes de la fase 5** (montaje
  estático del frame aprobado dentro del héroe real): el espacio limpio
  sobrevive a los dos recortes, contraste medido por renglón 10.68:1 en
  escritorio y 10.01:1 en celular, uniforme en las 4 bandas. Parámetros que
  la fase 5 debe usar al montar el video: `object-position: 90% 50%` en el
  panel de escritorio y `85% 50%` en el de celular (mantienen la nuez
  encuadrada); colores de fusión re-sampleados del metraje real, no de la
  foto de la bolsa: `#f2e0c9` (borde izquierdo) para el fondo/gradiente de
  escritorio y `#ecd9c0` hacia el borde superior del video en celular (la
  franja alta del metraje es más oscura, `#9c8067`, y funde como bruma).

## Concepto 2 del video del héroe (aprobado, sustituye al corto como master)

- **Concepto de Juan Fran:** un solo travelling continuo que arranca igual que
  el video aprobado (macro + azúcar y sal) y retrocede revelando la bolsa de
  Maison Nux con nueces cayendo dentro. Bandas: 1 macro quieta, 2 caída,
  3 apertura de cámara, 4 revelado de bolsa + CTA.
- **Intento 1 (Seedance 2.5 plano completo, 72 créditos): FALLIDO.** Metió un
  fundido encadenado con nueces fantasma y la bolsa final salió cerrada, casi
  al centro y sin el mundo del arranque. 1080p limpio y buena primera mitad,
  pero rompió la continuidad.
- **Intento 2 (Seedance 2.5 en modo extensión de video, 54 créditos):
  APROBADO.** Extiende hacia adelante el video aprobado de MiniMax desde su
  último cuadro exacto, con la foto real del empaque
  (`public/img/bolsa-120g.jpg`) como referencia de imagen. Continuidad real
  sin fundidos, bolsa abierta con nueces cayendo dentro, abajo a la derecha,
  luz intacta.
- **Desviación aceptada por Juan Fran:** la etiqueta salió enfocada y legible
  (el prompt pedía desenfoque), pero se reprodujo fiel letra por letra
  ("MAISON NUX", "100% ARTESANAL", ornamento) gracias a la referencia; se
  aprobó así. La bolsa cruza el borde superior derecho en parte del tramo
  (permitido: "cortada por el borde"); en celular la bruma del blend la
  suaviza.
- **Masters en docs/media/:** `heroe-master-completo.mp4` (12.58 s, 1080p,
  el nuevo master del héroe: aprobado 6.58 s + extensión 6 s, unidos con una
  sola codificación), `heroe-extension-seedance.mp4` (el crudo de la
  extensión) y `heroe-master-2k.mp4` (el corto aprobado, se conserva).
- **Créditos:** concepto 2 costó 126 (72 fallido + 54). Total del proyecto:
  221.5. Saldo aproximado: 799.45.
- **Notas fase 5:** rehacer la unión desde los crudos con la receta de scrub
  de ffmpeg-recipes.md (keyframes cortos, sin audio, compresión web); subir el
  recorrido del héroe a ~700vh para que la apertura respire (es un número,
  no un rediseño); el band map de rangos sigue igual y el flick test manda.

## Fase 3: carrito y envíos (construida; migración pendiente de las cadenas)

- **Configuración de envíos editable sin código ni redeploy:** los valores
  viven en la fila "envios" de la tabla `Configuracion` en Neon y el sitio los
  lee en vivo (`/api/config-envios`, sin caché). `lib/config-envios.ts` es el
  valor inicial y el respaldo, marcado PROVISIONAL: costos, umbrales, mínimo,
  estados por zona y CPs de zona extendida pendientes de cotizar paqueterías
  (candado de fase 7 en CLAUDE.md, junto con rotar la contraseña de Neon).
- **CPs de ejemplo en zona extendida:** 23970 y 40900, solo para probar la
  maquinaria; la lista real la carga Juan Fran (puede lanzarse vacía).
- **Carrito persistente** en localStorage (clave maison-nux-carrito-v1),
  botón "Agregar al carrito" en las tarjetas y contador en el header.
- **Barra de envío gratis** con el copy verbatim de TEXTOS §4; sugiere la
  bolsa de 40 g cuando faltan menos de $60. Umbral mostrado por zona
  ($500 Occidente, $750 resto); zona extendida: "En tu zona el envío siempre
  tiene costo." (adaptado de la política aprobada).
- **Lógica verificada:** 19 casos automatizados contra la tabla de CLAUDE.md
  (todos los tramos, mínimo, extendida, faltantes $30/$10/$50) y 5 escenarios
  capturados en navegador real sin errores.
- **Microcopy funcional nuevo (no estaba en los docs, por bendecir):**
  "Agregado", "Tu carrito está vacío.", "Elige tu estado", "Continuar al
  pago", "El pago se conecta en la fase 4", y el aviso de zona extendida en
  el carrito.
- **Base de Neon migrada y sembrada (2026-08-27).** Las cadenas viven solo
  en .env.local. El entorno de Claude Code Web no puede abrir el puerto de
  Postgres (5432), así que la migración y el seed se aplicaron POR HTTPS con
  `scripts/migrar-por-https.mjs` y `scripts/seed-por-https.mjs`: el SQL lo
  genera Prisma (`migrate diff`) y el script lo registra en
  `_prisma_migrations` con el checksum estándar, de modo que
  `prisma migrate deploy/dev` en Vercel o en una máquina normal ve el
  historial como propio. Verificado con lecturas reales: 4 productos y la
  fila "envios" (mínimo 15000, 3 zonas). Nota: desde este entorno el sitio
  local usa el respaldo de archivo (no hay TCP); en Vercel la lectura viva
  de Neon funciona con DATABASE_URL/DIRECT_URL en sus variables.
- **Fase 3 aprobada por Juan Fran** (verificó los escenarios y la aritmética).
  Ajuste pedido y aplicado: el aviso bajo el botón de pago ahora dice
  "Estamos afinando el pago en línea. Muy pronto." (el interno "fase 4" era
  lenguaje de obra en un sitio público). El resto del microcopy funcional
  quedó bendecido. Pendientes anotados en CLAUDE.md para la fase 4: quitar
  ese aviso al conectar Mercado Pago y validar CP contra estado.

## Fase 4: pagos en modo prueba (construida; falta la compra de prueba)

- **Pedidos en Neon:** tablas `Pedido` (número autoincremental, estados
  pendiente/pagado/enviado/entregado/cancelado/fallido, preference_id y
  payment_id, teléfono 521+10) y `PedidoItem` (línea congelada al comprar).
  Migración `fase4_pedidos` aplicada por la vía HTTPS.
- **Checkout** en `/checkout`: el servidor recalcula subtotal, zona y envío
  desde lib/productos.ts y la configuración viva (el navegador solo manda ids
  y cantidades); valida correo, teléfono de 10 dígitos, y CP contra estado
  (dos primeros dígitos, `lib/codigos-postales.ts`) con aviso en vivo y
  rechazo en servidor. Zona extendida y bajo mínimo no pueden pagar en línea.
- **Mercado Pago Checkout Pro** por API con llave de idempotencia y
  external_reference = id del pedido; back_urls a `/pedido/[id]`.
- **Webhook `/api/mp/webhook`:** verifica la firma HMAC oficial
  (timingSafeEqual), consulta el pago a la API de MP y SOLO él marca
  pagado/fallido, idempotente. Sin datos de clientes en logs.
- **Correos con Resend** al confirmarse el pago: cliente (TEXTOS §9 verbatim)
  y aviso interno. El asunto interno va sin emoji ni raya
  ("Pedido nuevo #N · $total"), pendiente de bendición: el original traía 🔔
  y em dash. Remitente provisional onboarding@resend.dev hasta tener dominio
  (fase 7); configurable con CORREO_REMITENTE.
- **Verificado sin llaves reales:** 14 casos unitarios (CP y firma) y
  pruebas de integración contra el servidor local: firma inválida→401,
  válida→consulta a MP, evento no-pago→200, CP incongruente→rechazo con
  mensaje, bajo mínimo→rechazo. Las llaves de MP/Resend nunca pasan por el
  chat: van directo en el panel del hosting, y la compra de prueba se hace en el sitio
  desplegado (el webhook necesita URL pública).
- **Microcopy funcional nuevo (por bendecir):** título "¿A dónde va tu
  pedido?", etiquetas del formulario, mensajes de error del checkout, textos
  de la página de pedido ("Gracias por tu pedido." / "Estamos confirmando tu
  pago" / "El pago no se completó") y "Pago seguro en la pantalla de Mercado
  Pago".

## Fase 4: verificación en producción de prueba (2026-08-27) — CERRADA

- **Compra de prueba real completada por Juan Fran** en el sitio desplegado
  (entonces en Netlify; el proyecto migró a Vercel el 2026-08-28) con
  credenciales TEST- y tarjeta de
  prueba. Pedido #1 y pedido #2 quedaron `pagado` vía webhook firmado
  (payment_id registrado). Página `/pedido/[id]` muestra "Gracias por tu
  pedido." con desglose correcto ($720, envío gratis, zona Occidente).
- **Bug encontrado y corregido:** `NEXT_PUBLIC_SITE_URL` quedó en el panel
  del hosting con diagonal final, lo que produjo `//pedido/...` en las back_urls y rompió
  la página de regreso (primer intento). El checkout ahora limpia diagonales
  finales de la variable antes de armar URLs (commit e6a3d78).
- **Correos verificados:** confirmación al cliente y aviso interno llegaron.
  Limitación temporal conocida: mientras el dominio no esté verificado en
  Resend (fase 7), Resend solo entrega al correo dueño de la cuenta de
  Resend, así que `CONTACTO_EMAIL` apunta por ahora al correo personal de
  Juan Fran. **Pendiente fase 7:** verificar dominio en Resend, poner
  remitente propio (`CORREO_REMITENTE`) y cambiar `CONTACTO_EMAIL` al correo
  del negocio.
- **Número de guía:** el aviso al cliente con su guía se manda desde el
  panel de la fase 6 (marcar pedido como "enviado" + capturar guía dispara
  el correo automáticamente). No es un proceso manual.

## Fase 5: video en el héroe (2026-08-28)

- **Cero créditos gastados:** todo fue procesamiento del material ya aprobado.
- **Una sola compresión desde los originales** (`heroe-master-2k.mp4` 6.58 s
  + `heroe-extension-seedance.mp4` 6.00 s), unidos y codificados en una
  pasada con fotogramas clave cada 8 cuadros (`-g 8`), sin audio: es lo que
  hace que el scroll pueda caer en cualquier cuadro sin trabarse.
- **Cuatro archivos en `public/video/`:** escritorio y celular, cada uno en
  WebM/VP9 (3.2 y 1.8 MB, va primero si el navegador lo domina) y MP4/h264
  (7.7 y 2.9 MB, respaldo universal). Más `heroe-poster.jpg` (primer cuadro,
  136 KB) que se pinta al instante mientras el video baja.
- **Carga como Blob con anillo de progreso** (regla de la skill: muchos
  hosts no soportan descargas parciales y el scrub se congela; el Blob lo
  evita siempre). Vigilante de 20 s: si la descarga se cuelga, la página
  sigue completa sobre el póster. Seeks con compuerta (nunca dos en vuelo).
- **El héroe pasó de 500vh a 700vh:** 12.58 s de recorrido necesitan más
  scroll para que cada banda respire (~86vh por segundo).
- **Kraft vivo:** el color plano donde vive el texto ya no es fijo; sigue
  una rampa medida del borde real del video (de #bf9e7f a #ba9a82) escrita
  por el mismo bucle del scrub. Piso de contraste en #b0937c porque el tono
  real del final (#9b7f6b) dejaba el texto café en 3.7:1 (mínimo 4.5:1).
- **El diseño de las 4 bandas NO se tocó** (regla de fase 1): mismo band
  map, mismos textos, misma composición (titular nunca sobre el sujeto;
  escritorio panel derecho 62% con encuadre 90%, celular texto arriba /
  video abajo con encuadre 85%).
- **Verificado en navegador real (Chromium controlado):** el video sigue el
  scroll (t = progreso × 12.58 s) en escritorio y celular; flick test de
  360px con las 4 bandas legibles; consola limpia; contraste píxel por
  píxel con letras ocultas: 4.80:1 a 5.72:1 en todas las bandas y ambos
  tamaños; sin video la página queda completa; con reduced motion sale el
  estático y no se descarga ni un byte de video.

## Cambio de hosting: de Netlify a Vercel (2026-08-28)

- **Decisión de Juan Fran.** La tienda se muda a Vercel, donde ya vive su CRM.
  Dos razones: tener todo en el mismo lugar, y que Netlify agotó sus créditos
  gratuitos y dejó los deploys de producción pausados (por eso la fase 5 quedó
  commiteada en main sin publicarse; el primer deploy de Vercel la publica).
- **Esto revierte la decisión original del brief**, que eligió Netlify porque
  el plan gratuito de Vercel prohíbe el uso comercial. Esa restricción sigue
  siendo cierta: **el plan Hobby de Vercel es solo para uso no comercial y esto
  es una tienda que cobra.** Anotado como candado de la fase 7: confirmar plan
  Pro antes de vender de verdad.
- **Qué se quitó del repo:** `netlify.toml` y la entrada `.netlify/` del
  `.gitignore` (sustituida por `.vercel`). El paquete `@netlify/plugin-nextjs`
  nunca estuvo en `package.json`: Netlify lo instalaba solo al leer el toml,
  así que no hubo dependencia que desinstalar. De paso se borró
  `.capv-temp.mjs`, un script suelto de captura que quedó de la fase 2.
- **Auditoría de URLs escritas a mano: ninguna.** Se revisó todo el código y no
  hay un solo `netlify.app` en lógica viva. Las back_urls y el
  `notification_url` de Mercado Pago se arman desde `NEXT_PUBLIC_SITE_URL`
  (`app/api/checkout/route.ts`, que además limpia la diagonal final), el
  `metadataBase` de SEO y Open Graph sale de la misma variable
  (`app/layout.tsx`) y **los correos de Resend no llevan ningún enlace**: son
  texto plano. Solo hubo que corregir un comentario que usaba un dominio de
  netlify.app como ejemplo.
- **No hace falta `vercel.json`.** Vercel detecta Next.js solo. El
  `postinstall: prisma generate` ya estaba puesto, que es lo único que Vercel
  necesita de más para que Prisma sobreviva a los builds cacheados.
- **Las variables de entorno ahora viven en Vercel → Settings → Environment
  Variables.** Son 8 (más `ADMIN_PASSWORD` cuando llegue la fase 6); la lista
  completa quedó en `.env.example`. Neon no cambia.
- **Pendiente al desplegar:** actualizar el `notification_url` del webhook en
  el panel de Mercado Pago a la URL nueva de Vercel, o los pagos dejan de
  confirmarse.

## Fase 4 en Vercel: webhook confirmado y hallazgo de Resend (2026-09-01)

- **El webhook funciona en Vercel.** Compra de prueba tras el redeploy: pago
  aprobado, pedido #4 marcado `pagado` por el webhook con
  `mpPaymentId = 1351238089`, y el aviso interno "Pedido nuevo #4" entregado.
  Que ese correo salga es la prueba de que la notificación de Mercado Pago
  llega y de que la firma HMAC valida: los correos viven detrás de esa puerta.
- **HALLAZGO DE RESEND, NO ES UN BUG DEL CÓDIGO.** El correo de confirmación
  al comprador no llega, y no hay nada que arreglar en el repo. Con el
  remitente de prueba `onboarding@resend.dev` (sin dominio verificado), Resend
  **solo entrega al correo dueño de la cuenta de Resend** y rechaza a cualquier
  otro destinatario con "You can only send testing emails to your own email
  address". Por eso el aviso interno llegó (va a CONTACTO_EMAIL, que es esa
  misma dirección) y el del cliente no. **No lo diagnostiques como falla de
  `lib/correos.ts` ni del webhook.** Se resuelve en la fase 7 verificando el
  dominio y poniendo `CORREO_REMITENTE`; quedó como candado en CLAUDE.md.
- **Estado de los pedidos de prueba:** #1 ($1,090), #2 ($720), #3 ($770) y #4
  ($770), los cuatro `pagado`, los cuatro con su `mpPaymentId`, todos zona
  Occidente / Jalisco y con credenciales `TEST-`. Es basura de construcción:
  borrarlos es candado de la fase 7.

### Camino del pago rechazado: revisado y corregido

Revisión del webhook a petición de Juan Fran. Las dos garantías que pidió ya se
cumplían y ahora están probadas; de paso apareció un tercer caso roto.

- **Un pago rechazado nunca marca pagado.** `pagado` sale exclusivamente de
  `status === "approved"`. `rejected`, `cancelled` y `charged_back` mueven el
  pedido a `fallido`, y `pending`, `in_process` y `authorized` no lo mueven.
- **Un pago rechazado no dispara correos.** El envío está dentro de
  `if (nuevoEstado === "pagado")`, así que ningún otro camino lo alcanza.
- **BUG ENCONTRADO Y ARREGLADO: reintento exitoso tras un rechazo.** La
  condición era `if (nuevoEstado && pedido.estado === "pendiente")`. Si el
  cliente pagaba, era rechazado (pedido → `fallido`) y **reintentaba con otra
  tarjeta dentro del mismo checkout**, el pago aprobado llegaba con el pedido
  ya en `fallido`: no entraba a la rama, el pedido se quedaba `fallido` para
  siempre y no salía ningún correo. Dinero cobrado, pedido invisible para Juan
  Fran y el cliente viendo "El pago no se completó". Ahora un `approved`
  confirma también desde `fallido`.
- **La tabla de decisión se extrajo a `decidirEstadoPedido()` en `lib/mp.ts`**
  (función pura) para poder probarla sin llamar a Mercado Pago. 16 casos
  verificados, incluidos: rechazo posterior NO tumba un pedido pagado, segundo
  aviso del mismo pago no repite correos, y un pedido `enviado`/`entregado`/
  `cancelado` no lo toca ningún webhook.
- **El flujo que ya funcionaba no cambió:** `pendiente` + `approved` → `pagado`
  + correos, idéntico. Se eliminó una rama muerta que solo guardaba el
  `mpPaymentId` de un pago rechazado sobre un pedido ya avanzado.
- **Pendiente para la fase 6 (panel), no ahora:** `refunded` y `charged_back`
  sobre un pedido ya pagado no cambian el estado a propósito. Un reembolso o
  contracargo es una decisión de negocio y se maneja a mano desde el admin.

## Fase 6: panel de pedidos en /admin (2026-09-01)

- **Cuatro pantallas:** `/admin/entrar` (contraseña), `/admin` (lista con
  filtros Todos/Pagados/Enviados/Fallidos), `/admin/pedidos/[id]` (detalle) y
  `/admin/envios` (editor de zonas y costos). Barra fija con Pedidos · Envíos ·
  Salir. Diseñado primero para celular: Juan Fran lo usa empacando.
- **Cerradura** (`lib/admin-auth.ts`): la contraseña vive en `ADMIN_PASSWORD`
  (variable de Vercel, nunca en el repo). La sesión es una cookie httpOnly con
  un token FIRMADO (HMAC-SHA256, 12 h de vida) que **no contiene la
  contraseña**: si la cookie se filtra, la clave no. La comparación es en
  tiempo constante y un intento fallido espera 1 segundo. Efecto útil: al
  cambiar la contraseña, todas las sesiones viejas mueren solas.
  Si `ADMIN_PASSWORD` falta o mide menos de 8 caracteres, el panel queda
  **cerrado por completo**, no abierto con clave trivial.
- **El candado está en cada puerta, no en un filtro general.** Cada page.tsx
  llama `haySesion()` ANTES de consultar la base, y cada acción de servidor
  (que es un endpoint POST público) revalida la sesión por su cuenta. No se usó
  middleware a propósito: un middleware es un solo punto que, si falla, abre
  todo.
- **noindex** en el layout del panel. A propósito NO se agregó a `robots.txt`,
  porque ese archivo es público y ahí se estaría anunciando la dirección.
- **Campos nuevos en Pedido** (migración `20260901120000_fase6_envio_y_alertas`,
  aplicada por la vía HTTPS): `paqueteria`, `guia`, `enviadoEn`, `avisoEnvioEn`,
  `mpAlerta`, `mpAlertaEn`.
- **El correo de envío sale UNA vez.** La guardia es `avisoEnvioEn`, no el
  estado: el sello se pone SOLO después de que Resend aceptó el envío, así que
  un correo caído deja el pedido marcado como enviado pero reintentable. Copy
  de TEXTOS §9 "Pedido enviado" verbatim; sin paquetería ni guía se quitan
  ÚNICAMENTE las dos líneas de seguimiento (decisión de Juan Fran).
  `enviarCorreoDeEnvio` lanza excepción si Resend responde con `error` en el
  cuerpo: sin eso el panel sellaría como enviado un correo que nunca salió.
- **Alerta de reembolso/contracargo** (decisión de Juan Fran): el webhook anota
  `mpAlerta` cuando Mercado Pago reporta `refunded`, `charged_back` o
  `in_mediation` sobre un pedido que ya avanzó, y el panel lo muestra en la
  lista y explicado en el detalle. **El estado NO cambia solo.** El bloque
  nuevo del webhook vive dentro del caso que antes no hacía nada, así que
  ninguna confirmación de pago se alteró.
- **Editor de envíos:** escribe la fila `Configuracion` clave "envios" de Neon,
  la misma que lee el checkout en vivo. Los montos se capturan en PESOS y se
  guardan en centavos. Avisa en pantalla que los cambios aplican a pedidos
  nuevos: un pedido ya hecho conserva el envío que se le cobró.
- **Teléfonos:** el panel los muestra legibles respetando que solo CDMX (55/56),
  Guadalajara (33) y Monterrey (81) tienen clave de área de dos dígitos; el
  resto del país la tiene de tres.
- **Verificado en navegador real:** 43 comprobaciones automatizadas en
  escritorio (1280) y celular (390), incluyendo que `/admin`,
  `/admin/pedidos/[id]`, `/admin/envios` y `/admin?estado=` sin cookie mandan a
  la pantalla de entrar y **no filtran ni un dato de cliente** en el HTML;
  contraseña equivocada rechazada; filtros que filtran de verdad; noindex
  presente; todo lo tocable de 44px o más; consola sin errores; y el doble clic
  en "marcar como enviado" que responde "el aviso ya se había enviado" en vez
  de mandar el correo dos veces.
- **Nota del entorno:** este sandbox no puede abrir el puerto de Postgres, así
  que para las pruebas de navegador se sustituyó `lib/db.ts` por un stub con
  datos falsos y se restauró antes de commitear. La ruta real contra Neon se
  ejerce al desplegar en Vercel.

### Revisión adversarial del panel y arreglos (2026-09-01)

Seis revisores independientes (auth, fuga de PII, flujo de envío, editor de
configuración, regresión de pagos, móvil/accesibilidad) más un verificador por
hallazgo que intentaba refutarlo: 33 hallazgos, 22 confirmados, 11 refutados.

**El grave, que las pruebas de navegador no habían cachado:** el editor de
envíos **nunca guardaba**. La zona extendida tiene `estados: []` a propósito
(se decide por código postal, no por estado), y la validación lo trataba como
"zona sin estados" y abortaba antes del upsert. Guardar sin tocar nada fallaba
siempre. Peor aún, el camino natural para desatorarse (escribir un estado real
en esa caja) habría mandado ese estado entero a la zona extendida, donde el
envío es "cotizar" y el checkout bloquea la compra. La lección para el futuro:
la prueba cargaba la pantalla del editor pero nunca enviaba el formulario.

Arreglado también, todo verificado con 23 comprobaciones nuevas en navegador:

- **Montos:** se valida la FORMA, no solo el resultado. `"90,50"` (coma
  decimal, costumbre al copiar de una cotización) se guardaba como $9,050;
  ahora se rechaza, igual que `1e3` y `0x10`, que `Number()` aceptaba. Topes
  de cordura: $5,000 de envío y $2,000 de pedido mínimo.
- **Estados:** se cotejan contra `ESTADOS_MEXICO`, la misma lista del selector
  del carrito. Un "Michoacan" sin acento sacaba al estado de su zona en
  silencio y le subía el envío a todos sus clientes. También se rechaza el
  mismo estado en dos zonas.
- **Huecos de tarifa:** si el primer tramo de una zona empieza por encima del
  pedido mínimo, hay carritos válidos sin tarifa que el checkout rechazaría
  pidiendo cotizar. Ahora no deja guardar. Igual con dos tramos que empiezan
  en el mismo monto.
- **Códigos postales:** los inválidos ya no se descartan callados; se nombran.
- **Zona extendida:** no se le puede poner envío gratis (regla de CLAUDE.md).
- **Doble correo:** la guardia leía y escribía en dos pasos, así que dos clics
  simultáneos (dos pestañas) mandaban dos correos. Ahora el derecho a mandarlo
  se RECLAMA con una escritura condicional atómica (`updateMany` con
  `avisoEnvioEn: null`), y el cambio de estado también es condicional, así que
  un pedido que dejó de estar pagado entre la lectura y la escritura no se pisa.
- **Correo sin llave:** sin `RESEND_API_KEY` la función salía en silencio y el
  panel sellaba el aviso como enviado. Ahora lanza excepción, el sello se
  libera y el aviso queda reintentable. El motivo del fallo se muestra en el
  panel.
- **Copy:** las dos líneas de seguimiento solo salen si hay guía. Con
  paquetería pero sin número, "puedes seguirlo aquí: Estafeta" no le sirve a
  nadie.
- **Cookie de sesión:** firmaba con la contraseña cruda, así que la cookie era
  un par (mensaje conocido, firma) del que se podía adivinar la contraseña
  offline a mil millones de intentos por segundo. Ahora la clave se deriva con
  `scrypt`, y cada intento cuesta ~100 ms. Se conserva que cambiar la
  contraseña mate las sesiones viejas.
- **Fuerza bruta:** la espera de 1 s no frenaba nada (las peticiones corren en
  paralelo en Vercel). Ahora hay un contador persistido en la tabla
  `Configuracion`: 8 fallos en 15 minutos bloquean el intento sin comparar. Si
  la base no responde falla del lado permisivo (la contraseña sigue siendo
  obligatoria) para no dejar a Juan Fran fuera de su panel por un hipo de Neon.
- **Alerta de contracargo:** exigía `nuevoEstado === null`, así que un
  contracargo sobre un pedido que seguía `pendiente` lo bajaba a `fallido` sin
  dejar alerta: idéntico a una tarjeta rechazada normal, sin señal de que hubo
  dinero cobrado y devuelto. Ahora la alerta se registra siempre y el estado se
  aplica igual que antes.
- **Guía con letras:** el campo forzaba teclado numérico; muchas guías traen
  letras.
- **Móvil:** la retícula del renglón aplastaba el nombre a ~68px y el chip de
  alerta se salía de su columna arriba de 620px. Rehecha.
- **Contraste:** el borde de los campos estaba en 1.29:1 y el texto del botón
  mientras guarda en 2.66:1 (por el `opacity`). Corregidos dentro del panel.
- **Toque:** teléfono y correo del cliente eran áreas de 32px pegadas; ahora
  44px y separadas.
- **Mensaje del checkout:** decía "$150" escrito a mano y habría mentido en
  cuanto se cambiara el mínimo desde el panel. Ahora sale de la configuración
  viva. Es el único cambio al checkout, y solo en el texto de un error.

**Refutado y NO cambiado, a propósito:** `enviarCorreosDePago` (el correo del
pago) tampoco mira el campo `error` de Resend, pero el webhook se traga
cualquier excepción de correo por diseño, así que arreglarlo no cambiaría nada
observable y sí tocaría el flujo de pagos que ya funciona. Queda anotado.

### Barra fija de guardado en el editor de envíos (2026-09-02)

Juan Fran reportó que no encontraba el botón: vivía al fondo de tres bloques
de zonas y en celular se perdía de vista. **No era un error suyo, era un
problema de diseño:** un formulario largo con un único botón al final y ninguna
señal de que había cambios pendientes.

- **Barra fija abajo** (`.admin-barra-guardar`), pegada a la pantalla, con el
  botón dentro. Aparece solo cuando de verdad hay algo que guardar y desaparece
  sola si se deshace el cambio: el estado "sucio" se calcula comparando un
  retrato del `FormData` contra el de partida, no con un simple "tocó una
  tecla".
- **Triple función:** avisa de cambios pendientes, muestra "Guardando…"
  mientras trabaja, y se convierte en la confirmación verde al terminar (o roja
  con el error). La confirmación queda pegada abajo, imposible de no ver, y el
  punto de partida se reajusta a lo guardado.
- **Aviso al salir, por tres caminos**, porque uno solo no basta:
  `beforeunload` para cerrar o recargar; captura de clics en enlaces para la
  navegación interna de Next (que no recarga la página y por eso `beforeunload`
  no la alcanza); y captura de `submit` para el botón "Salir", que es un
  formulario, no un enlace.
- El formulario lleva `padding-bottom` para que la barra no tape el último
  campo. Medido: 158px de holgura en celular.
- Verificado con 33 comprobaciones en navegador (celular y escritorio).

**Falsa alarma del payment_id.** Juan Fran vio 1351238067 y lo comparó contra
el 1351238089 del pedido #4. Los dos números son correctos: 1351238067 es del
pedido **#3**. Se prestan a confusión porque #3 y #4 son **ambos de $770** y el
#3 se acababa de marcar como enviado. Comprobado en la base (cada pedido tiene
su propio pago) y en navegador: los 5 pedidos muestran su payment_id correcto
entrando por URL directa, entrando desde la lista, y saltando del #3 al #4
seguido, que es donde se vería una caché sucia. No hay cruce de datos.

**Nota de método:** dos "fallos" de esta ronda resultaron ser errores de mis
propias pruebas, no del panel: un selector que agarraba el botón "Salir" en vez
del del formulario, y una medición hecha a media animación porque la página usa
scroll suave (`scroll-behavior: smooth`). Conviene medir con
`behavior: "instant"` y esperar a que asiente.
