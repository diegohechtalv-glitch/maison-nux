[03-CLAUDE.md](https://github.com/user-attachments/files/31275676/03-CLAUDE.md)
# CLAUDE.md — Proyecto Maison Nux

> Este archivo va en la **raíz del repositorio** `maison-nux`. Claude Code lo lee automáticamente
> en cada sesión. Léelo completo antes de proponer nada.

## Qué es este proyecto

**Una sola tienda en línea** para **Maison Nux**: nuez pecana artesanal caramelizada, dulce y
salada. Cuatro presentaciones (40 g, 120 g, 300 g, 600 g). Venta a México, en español.

La página tiene dos cosas al mismo tiempo, y ninguna es opcional:

1. Un **héroe cinemático** con video generado por IA que se anima con el scroll
2. Una **tienda funcional**: catálogo, historia de marca, carrito, envíos por zona y cobro real
   con Mercado Pago

No es una landing que después se convierte en tienda. **Es la tienda desde el principio, con
el héroe animado encima.**

## Stack (no cambiar sin preguntar)

Next.js (App Router) + TypeScript · Tailwind CSS · Prisma · Neon (Postgres) ·
**Vercel** · Mercado Pago Checkout Pro · Resend

Es el mismo stack, y ahora también el mismo hosting, con el que Juan Fran construyó su CRM:
todo vive en Vercel. Vercel es la plataforma de los creadores de Next.js, así que App Router,
Route Handlers, Server Components, Server Actions, SSR e ISR funcionan sin adaptadores, y el
webhook de Mercado Pago corre como Route Handler normal.

**El proyecto estuvo en Netlify hasta la fase 5** (2026-08-28). Se migró a Vercel por decisión
de Juan Fran, para tener tienda y CRM en el mismo lugar, y porque Netlify agotó sus créditos
gratuitos y dejó los deploys de producción pausados. **No hay nada de Netlify en el repo y no
debe volver:** ni `netlify.toml`, ni `@netlify/plugin-nextjs`, ni rutas de su panel.

**Notas de Vercel que sí importan:**
- Las variables de entorno van en **Settings → Environment Variables**, y hay que marcarlas
  para los entornos donde apliquen (Production, Preview, Development).
- **Después de agregar o cambiar una variable hay que volver a desplegar**: los deploys ya
  construidos no la ven.
- No hace falta ningún archivo de configuración: Vercel detecta Next.js solo. El
  `postinstall: prisma generate` del `package.json` es lo que mantiene sano al cliente de
  Prisma entre builds cacheados.
- **Ojo con el plan.** El plan Hobby (gratis) es solo para uso NO comercial, y esto es una
  tienda que cobra. Para producción real hace falta el plan Pro. Juan Fran lo confirma antes
  de la fase 7.
- Vercel ofrece su propia base de datos; **no se usa**. La base es Neon, ya creada.
- Los deploys de preview son públicos por omisión. Nada sensible debe depender de que una URL
  de preview no se conozca.

## Cómo se usa la skill `10k-websites`

La skill está en `.claude/skills/10k-websites/`. **Se usa para el video, no para construir el sitio.**

| De la skill | ¿Aplica? |
|---|---|
| Fases 1–3 (setup, marca, investigación de lenguaje) | ✅ Ya resueltas en `docs/DISENO-MAISON-NUX.md` |
| Fases 4–5 (arquitectura de página, storyboard) | ✅ Sí, el band map ya está propuesto |
| Fases 6–7 (generar frame, generar video, procesar con ffmpeg) | ✅ **Sí, íntegras.** Es el corazón del valor de la skill |
| `references/prompt-laws.md` | ✅ Sí, para los prompts de generación |
| `references/ffmpeg-recipes.md` | ✅ Sí, para procesar el video |
| `references/scrub-pipeline.md` | ✅ Sí, la técnica — **adaptada a un componente de React**, no a un script suelto |
| Fase 8 (construir el sitio en HTML plano) | ❌ **No.** El sitio se construye en Next.js |
| Fases 10–11 (deploy en Hostinger) | ❌ **No.** El deploy va en **Vercel** |
| `references/deploy.md` | ❌ No existe en el repo, se omitió a propósito. No lo busques |

El scrub de video de la skill es JavaScript sobre un elemento `<video>`: funciona idéntico
dentro de un componente de React. No hay nada en esa técnica que dependa de HTML plano.

## Con quién trabajas

Juan Fran, dueño de la marca. **No es programador.**

- Explica en español simple. Nada de jerga sin traducir.
- Un paso a la vez: termina, verifica, y hasta entonces propón lo siguiente.
- Antes de cada bloque de trabajo: di qué vas a hacer y más o menos cuánto va a tardar.
- Después: di exactamente qué debe abrir o hacer clic para comprobar que quedó bien.
- Si algo falla dos veces, para y explica las opciones. No repitas el mismo intento.
- **Avisa antes de gastar créditos** de generación, con el número estimado.

## Plan por fases

Una fase a la vez. Al terminar cada una: commit, push, deploy y confirmación de Juan Fran
antes de seguir. **No adelantes fases.**

| # | Fase | Qué incluye | Se verifica cuando |
|---|---|---|---|
| 1 | **Estructura y catálogo** | Next.js montado, las 4 presentaciones, historia de Raquel, ingredientes, envíos, footer. Sección de héroe **ya construida con sus 4 bandas de scroll**, mostrando una foto fija | Se ve bien en celular y escritorio, desplegada en Vercel |
| 2 | **Frame inicial** (~2 créditos) | Storyboard aprobado + generación de la imagen de arranque del video | Juan Fran ve la imagen y aprueba la dirección visual |
| 3 | **Carrito y envíos** | Schema de Prisma, seed, carrito, cálculo por zona, barra de envío gratis | Armas un carrito, eliges estado, y el total sale correcto |
| 4 | **Pagos en prueba** | Checkout Pro con credenciales `TEST-`, webhook, correos | Compra con tarjeta de prueba genera pedido `pagado` y llegan los correos |
| 5 | **Video y héroe animado** (~54 créditos) | Generación del video, procesado con ffmpeg, scrub ligado al scroll en escritorio **y celular**, sustitución de la foto fija | El héroe se anima con el scroll en escritorio y celular, y la página sigue rápida |
| 6 | **Panel de pedidos** | `/admin` protegido: lista, detalle, cambio de estado, editar zonas y costos | Marcas un pedido como enviado y el cliente recibe aviso |
| 7 | **Dominio y producción** | Dominio en Vercel, plan Pro confirmado, credenciales `APP_USR-`, SEO, Open Graph, sitemap | Compra real de bajo monto llega a Mercado Pago |

**Pendientes obligatorios de la fase 4 (al conectar Mercado Pago):**

- [x] Quitar del carrito el texto "Estamos afinando el pago en línea. Muy pronto."
      y activar el botón de pago real. (Hecho en fase 4.)
- [x] Validar que el código postal corresponda al estado elegido. (Hecho:
      `lib/codigos-postales.ts`, aviso en vivo en el checkout y rechazo en el
      servidor.)

**Candados obligatorios de la fase 7 (no se sale a producción sin esto):**

- [ ] **Confirmar costos y zonas de envío definitivos.** Los números de la fase 3
      ($90/$120, umbrales $500/$750, mínimo $150, estados por zona, CPs de zona
      extendida) son provisionales, pendientes de cotizar paqueterías. Viven en
      `lib/config-envios.ts` (respaldo) y en la tabla `Configuracion` de Neon.
- [ ] **Rotar la contraseña de Neon.** La connection string actual pasó por el chat
      durante la construcción; antes de producción se rota en Neon y Juan Fran
      actualiza las variables en Vercel.
- [ ] **Verificar el dominio en Resend y cambiar el remitente.** Mientras se use
      `onboarding@resend.dev`, Resend SOLO entrega al correo dueño de la cuenta de
      Resend y rechaza a cualquier otro destinatario ("You can only send testing
      emails to your own email address"): el comprador nunca recibe su confirmación.
      Con el dominio verificado se pone `CORREO_REMITENTE=pedidos@midominio.com`.
- [ ] **Limpiar los pedidos de prueba de la base de datos.** Los pedidos #1 a #4
      (y los que se generen probando) son basura de construcción hecha con
      credenciales `TEST-`. Se borran ellos y sus `PedidoItem` antes de vender.
      Ojo: el contador `numero` es un SERIAL, así que si se quiere que el primer
      pedido real sea el #1 hay que reiniciar la secuencia.

**Por qué el video va en la fase 5 y no antes:** el video cuesta ~54 créditos y es lo único
que no se arregla programando. La fase 2 valida la dirección visual por ~2 créditos. Si el
video se atrasa o no queda a la primera, la tienda ya está vendiendo.

**La sección de héroe se construye completa desde la fase 1**, con las 4 bandas y sus
transiciones ya funcionando sobre una foto fija. En la fase 5 solo se sustituye la fuente
visual. **No rediseñes el héroe en la fase 5.**

**El héroe animado corre también en celular** (decisión de Juan Fran, fase 1). El héroe
estático NO es la regla del móvil: es respaldo automático, solo para `prefers-reduced-motion`,
conexión lenta o un dispositivo que no da el ancho.

## Manejo de créditos de Higgsfield — obligatorio

Los créditos son dinero y no se acumulan de un mes a otro. Reglas:

1. **Siempre `get_cost: true` antes de generar.** Es gratis. Nunca generes sin haber
   consultado y reportado el costo exacto primero.
2. **Compara modelos antes de gastar.** El conector ofrece varios modelos de video con
   precios muy distintos para la misma toma (de ~10 a ~55 créditos). Haz preflight del mismo
   plan en los 2 o 3 mejores y preséntale a Juan Fran la comparación de precio contra calidad
   esperada.
3. **Itera en el frame, no en el video.** El frame inicial cuesta ~2 créditos y ahí se decide
   la mayor parte del look. Genera todos los frames que hagan falta hasta que Juan Fran diga
   que le encanta. Solo entonces pasa al video.
4. **Considera probar el concepto con un modelo barato** antes de gastar en el caro, si hay
   duda sobre si el movimiento va a funcionar.
5. **Tope de 3 intentos de video por concepto.** Si un concepto falla tres veces, no sigas
   ajustando el prompt: es problema del concepto, no del prompt. Para, dilo, y propón otro.
6. **Nunca generes nada sin aprobación explícita de Juan Fran**, ni siquiera un frame de
   2 créditos.

## Identidad visual

```
Dorado Maison   #A07828    (primario)
Dorado oscuro   #7A5C1E    (hover, texto sobre crema)
Dorado claro    #C9A961    (bordes, detalles, partículas)
Crema empaque   #F1EEDD    (fondo dominante)
Blanco hueso    #FBFAF5    (tarjetas, superficies)
Kraft           #DCAE7A    (fondos de foto)
Café nuez       #3A2A18    (texto principal)
Café suave      #5C4A38    (texto secundario)
Café profundo   #2A1D11    (única banda oscura)
```

- Tipografía: `Cormorant Garamond` (títulos), `Jost` (texto), `IBM Plex Mono` (datos y
  etiquetas tipo empaque). Google Fonts.
- El fondo dominante es **crema**, no blanco puro. El dorado es acento, nunca fondo de bloques grandes.
- El wordmark siempre es `public/img/logo-maison-nux.png`, nunca texto con tipografía web.
- El ornamento (`public/img/ornamento-nuez.png`) separa secciones.
- Prohibido: gradientes saturados, neón, sombras duras, tipografías tech, emojis en el diseño,
  íconos genéricos de stock.
- Contraste mínimo 4.5:1 para texto. Dorado claro sobre crema **no** sirve para texto.
- Las imágenes de marca **ya existen** en `public/img/`. No generes logo ni fotos de producto.

El detalle completo —band map, tokens CSS, animaciones— está en `docs/DISENO-MAISON-NUX.md`.

## Tono de los textos

La marca la fundó **Raquel**, a partir de una receta de su bisabuela francesa que adaptó a su
cocina mexicana. La página habla **en primera persona, con su voz**. Nunca en tercera persona
corporativa ("en Maison Nux nos dedicamos a…").

Español, de "tú", cálido y cuidado. Frases cortas y sensoriales.
Prohibido el lenguaje de infomercial: "¡APROVECHA!", "OFERTA IMPERDIBLE", "ÚLTIMAS PIEZAS".
Referencia mental: carta de restaurante, no anuncio de supermercado.

**Los textos ya están escritos y aprobados** en `docs/TEXTOS-PAGINA.md` y en el design package.
Se usan **verbatim**. Si algo hay que cambiar, pregunta antes de reescribir.

**Copy gate antes de publicar:** cero em dashes, cero muletillas de IA ("en el mundo de…",
"desbloquea el potencial", "no es solo X, es Y"), cero testimonios inventados.

## Datos de negocio (fijos — no inventar otros)

**Precios**

| Presentación | MXN | Centavos |
|---|---|---|
| 40 g | $50 | 5000 |
| 120 g | $150 | 15000 |
| 300 g | $370 | 37000 |
| 600 g | $720 | 72000 |

⚠️ El precio por kilo es casi idéntico en las cuatro (~$1,200–1,250/kg). **Nunca** escribas
que la bolsa grande sale más barata por kilo o gramo — es falso. El incentivo de volumen es
el envío gratis.

**Envíos**

| Monto | Zona 1 · Jalisco y Occidente | Zona 2 · Resto del país | Zona 3 · Extendida |
|---|---|---|---|
| < $150 | No se envía | No se envía | No se envía |
| $150–$499 | $90 | $120 | Se cotiza |
| $500–$749 | Gratis | $120 | Se cotiza |
| ≥ $750 | Gratis | Gratis | $120 |

- Pedido mínimo **$150** en todas las zonas.
- Zona 1: Jalisco, Nayarit, Colima, Michoacán, Aguascalientes, Guanajuato, Zacatecas.
- Zona 3 (códigos postales con sobrecosto): el envío **nunca** es gratis.
- Zonas, umbrales y costos **editables desde el admin o un archivo de configuración**, jamás
  escritos a mano dentro de un componente.

**La barra de "te falta para envío gratis" es un requisito, no un adorno.** Cuando falten
menos de $60, debe sugerir la bolsa de 40 g ($50) con un botón de agregar en un clic. Los
carritos más probables —600 g ($720) y 2×300 g ($740)— quedan a $30 y $10 del umbral. Ahí
está el modelo de negocio completo.

## Variables de entorno

```
DATABASE_URL=                  # Neon, la cadena CON -pooler (para el sitio en marcha)
DIRECT_URL=                    # Neon, la cadena SIN pooler (solo para migraciones de Prisma)
MP_ACCESS_TOKEN=               # Mercado Pago (TEST- primero, APP_USR- en producción)
NEXT_PUBLIC_MP_PUBLIC_KEY=     # Mercado Pago
MP_WEBHOOK_SECRET=             # Firma del webhook
RESEND_API_KEY=                # Resend
NEXT_PUBLIC_SITE_URL=          # https://tudominio.com
ADMIN_PASSWORD=                # Para entrar a /admin. 20+ caracteres; con menos de 8 el panel queda cerrado
CONTACTO_EMAIL=                # A dónde llegan los avisos de pedido nuevo
CONTACTO_WHATSAPP=             # Formato 521 + 10 dígitos, para soporte y footer
```

## Seguridad — innegociable

- `.env.local` en `.gitignore` desde el primer commit. **Nunca** se commitean llaves.
- Nunca pidas que las llaves se peguen en el chat. Indica en qué pantalla de Vercel ponerlas
  (Settings → Environment Variables).
- El `MP_ACCESS_TOKEN` **solo** del lado del servidor. Jamás llega al navegador.
- Un pedido se marca pagado **únicamente** desde el webhook de Mercado Pago verificando la
  firma. El regreso del navegador a la URL de éxito no es prueba de pago.
- `/admin` siempre detrás de autenticación. Nunca accesible sin contraseña, ni "temporalmente".
- Direcciones y teléfonos de clientes: no se registran en logs ni se exponen en APIs públicas.

### El repositorio está público mientras dure la construcción

Se cerrará al terminar. Mientras tanto:

- **Cero llaves, tokens, contraseñas o credenciales en el repo.** Ni en código, ni en
  comentarios, ni en archivos de ejemplo con valores reales.
- Hacer el repo privado **no borra el historial de git**. Lo que se commitee hoy queda visible
  aunque mañana se cierre. Si algo sensible se sube por error, hay que **rotarlo**, no basta
  con borrarlo.

## Convenciones

- Precios en **centavos** (enteros) en la base de datos. Se formatean a MXN al mostrarse.
- Moneda `MXN`. Formato `$1,234.00 MXN`.
- Teléfonos mexicanos en formato `521` + 10 dígitos (aprendido a la mala en el CRM).
- Fechas y horas en `America/Mexico_City`.
- Estados de pedido: `pendiente` | `pagado` | `enviado` | `entregado` | `cancelado` | `fallido`.
- Todo texto visible para el usuario, en español. Variables y funciones, en inglés.
- No refactorices código que ya funciona sin que te lo pidan.
- Antes de instalar una dependencia nueva, di para qué sirve y si de verdad hace falta.

## Comandos

```bash
npm run dev            # desarrollo local
npm run build          # verificar que compila ANTES de hacer push
npx prisma migrate dev # aplicar cambios de schema (en una máquina normal)
# Desde Claude Code Web el puerto de Postgres está bloqueado; ahí las
# migraciones y el seed van por HTTPS con el mismo historial de Prisma:
#   npx prisma migrate diff  →  node scripts/migrar-por-https.mjs
#   node --experimental-strip-types scripts/seed-por-https.mjs
npx prisma studio      # ver la base de datos en el navegador
npx prisma db seed     # cargar las 4 presentaciones
```

**Siempre** corre `npm run build` antes de hacer push. Si falla ahí, falla en Vercel.
