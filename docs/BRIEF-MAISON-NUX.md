[02-BRIEF-MAISON-NUX.md](https://github.com/user-attachments/files/31275706/02-BRIEF-MAISON-NUX.md)
# BRIEF — Tienda en línea Maison Nux

> **Instrucciones de uso:** sube este archivo al chat de Claude Code Web junto con la carpeta
> `assets/`. Es todo el contexto que Claude necesita para construir la tienda.
> Los campos marcados con `[[ RELLENAR ]]` los tienes que completar tú antes de empezar.

---

## 1. La marca

**Maison Nux** — nuez pecana artesanal, con el toque perfecto dulce y salado.

Nombre francés + producto mexicano. El empaque lo dice literalmente:
**"FUSIÓN DE CULTURAS Y SABORES"**, con las banderas de México y Francia.
Esa tensión — refinamiento francés, materia prima mexicana — es el corazón de la marca.

**Posicionamiento:** producto gourmet artesanal, no botana de supermercado. Cercano al chocolate
fino o al café de especialidad. Se regala. Se pone en una mesa. No se compra por precio.

**Territorio visual:** dorado sobre crema, tipografía serif clásica, ilustración botánica
grabada a mano. Elegante, cálido, artesanal. **Nunca**: neón, gradientes saturados, sombras
duras, tipografías tech, íconos genéricos, emojis en el diseño.

**Tono de voz:** en español, de "tú", cálido y cuidado. Cero lenguaje de infomercial
("¡APROVECHA YA!", "OFERTA IMPERDIBLE"). Más cerca de una carta de restaurante que de un anuncio.
Frases cortas. Sensoriales: crujiente, caramelizado, sal de mar, tostado lento.

---

## 2. El producto

**Nuez pecana con el toque perfecto dulce y salado. 100% artesanal.**

**Ingredientes:** nuez pecana seleccionada, azúcar de caña pura, aceite vegetal, sal de mar.

**Claims del empaque (respetar textualmente):**
- Libre de conservadores y sabores artificiales
- Contiene nuez pecana
- Puede contener trazas de otros frutos secos
- Conservar el empaque cerrado y refrigerar después de abrir para preservar su crocancia

**Presentaciones, precios y fotos (en `assets/img/`):**

| Presentación | Precio MXN | En centavos (BD) | Archivo de foto | Rol en la tienda |
|---|---|---|---|---|
| 40 g | $50 | `5000` | `bolsa-40g.jpg` | Prueba / detalle / **completa el carrito** |
| 120 g | $150 | `15000` | `bolsa-120g.jpg` | Consumo personal |
| 300 g | $370 | `37000` | `bolsa-300g.jpg` | Para compartir |
| 600 g | $720 | `72000` | `bolsa-600g.jpg` | Regalo / despensa |

> ⚠️ **Dato clave de negocio:** el precio por kilo es prácticamente el mismo en las cuatro
> presentaciones (~$1,200–$1,250/kg). **No digas en ningún texto que la bolsa grande "sale
> más barata por gramo"** — sería falso. El incentivo para comprar volumen es el **envío
> gratis**, no el precio por kilo.

**Rol especial de la bolsa de 40 g:** con precio de $50, es la pieza que cierra la distancia
al envío gratis. Los dos pedidos más probables (600 g = $720 y 2×300 g = $740) se quedan a
$30 y $10 del umbral de $750. La tienda **debe** empujar esa bolsa en el carrito.

**Información nutrimental** (porción 30 g, del empaque — verificar contra la etiqueta impresa
antes de publicar): `[[ RELLENAR con los valores exactos de la declaración nutrimental ]]`

---

## 2.5. Quién está detrás — el relato de la marca

**Raquel** es la fundadora. La marca nace de una **receta de su bisabuela francesa**, a la que
ella le añadió el carácter de su cocina mexicana. De ahí sale el nombre —*Maison*, la casa
francesa— y de ahí sale el producto: dulce y salado, tradición y sabor.

Texto original de Raquel, **su voz es la referencia de todo el tono de la página**:

> "¡Hola!, soy Raquel, esposa y mamá de cuatro hijos. Traigo para ti Maison Nux, una receta de
> mi bisabuela francesa a la que le añadí el corazón de mi cocina mexicana. El resultado es
> este equilibrio perfecto entre tradición y sabor."

**Consecuencias para la página:**

- La marca tiene **cara y nombre**. La historia se cuenta en **primera persona**, con la voz de
  Raquel, no en tercera persona corporativa. Nunca "en Maison Nux nos dedicamos a…".
- La receta familiar es el activo diferenciador. Hay que darle su propia sección, no una línea
  perdida en el footer.
- Si Raquel tiene una foto suya o de sus manos trabajando, ahí va — vale más que cualquier
  render. Mientras no la haya, se usan las fotos de producto.
- Los textos completos y editados están en **`04-TEXTOS-PAGINA.md`**. Se pueden usar tal cual.

---

## 3. Identidad visual

### Colores

| Uso | Hex |
|---|---|
| Dorado Maison (primario, logo y acentos) | `#A07828` |
| Dorado oscuro (hover, texto sobre crema) | `#7A5C1E` |
| Dorado claro (detalles, bordes) | `#C9A961` |
| Crema empaque (fondo principal) | `#F1EEDD` |
| Blanco hueso (tarjetas, superficies) | `#FBFAF5` |
| Kraft (fondo de fotos de producto) | `#DCAE7A` |
| Café nuez (texto principal) | `#3A2A18` |
| Negro suave (texto secundario) | `#5C4A38` |

**Regla:** el fondo dominante es crema, no blanco puro. El dorado es acento, no fondo.
Nada de dorado sobre dorado — hay que respetar contraste legible (mínimo 4.5:1 para texto).

### Tipografía

- **Títulos:** `Cormorant Garamond` (Google Fonts), peso 400/600, con `letter-spacing` amplio en mayúsculas. Es lo más cercano al logo.
- **Texto:** `Jost` o `Montserrat` (Google Fonts), peso 300/400.
- El wordmark "MAISON NUX" **siempre** se usa como imagen del logo, nunca escrito con tipografía web.

### Assets

| Archivo | Qué es | Dónde usarlo |
|---|---|---|
| `logo-maison-nux.png` | Logo completo, fondo transparente | Header, footer, hero |
| `ornamento-nuez.png` | Solo la rama botánica, transparente | Separadores de sección, detalles |
| `bolsa-40g/120g/300g/600g.jpg` | Fotos de producto sobre fondo kraft | Catálogo, ficha de producto |

Usa el ornamento como separador entre secciones — es el elemento que amarra toda la identidad.

---

## 4. Qué tiene que hacer la tienda

### Páginas

1. **Home** — hero con logo y producto, propuesta de valor, las 4 presentaciones, historia corta, sección de proceso artesanal, testimonios (si hay), footer
2. **Producto** — ficha con selector de presentación, fotos, descripción sensorial, ingredientes, información nutrimental, alérgenos, agregar al carrito
3. **Historia / Nosotros** — el relato de Raquel, la fundadora (ver sección 2.5; los textos
   completos y listos para usar están en `04-TEXTOS-PAGINA.md`)
4. **Carrito** — resumen editable, cálculo de envío por zona
5. **Checkout** — datos de contacto, dirección de envío, resumen, pago con Mercado Pago
6. **Confirmación** — "gracias por tu pedido", número de pedido, qué sigue
7. **Panel de pedidos** (`/admin`, protegido con contraseña) — lista de pedidos, estado, datos de envío, marcar como enviado
8. **Legales** — Aviso de privacidad, Términos y condiciones, Política de envíos y devoluciones

### Envíos por zonas — POLÍTICA DEFINITIVA

Esta es la tabla exacta que debe implementarse. **El costo depende de dos cosas: la zona y
el monto del pedido.**

| Monto del pedido | Zona 1 · Jalisco y Occidente | Zona 2 · Resto del país | Zona 3 · Zona extendida |
|---|---|---|---|
| Menos de $150 | **No se envía** | **No se envía** | **No se envía** |
| $150 – $499 | $90 | $120 | Se cotiza |
| $500 – $749 | **GRATIS** | $120 | Se cotiza |
| $750 o más | **GRATIS** | **GRATIS** | $120 |

**Reglas de implementación:**

- **Pedido mínimo $150.** Por debajo de ese monto no se permite completar el checkout en
  ninguna zona. Mensaje al cliente: *"El pedido mínimo para envío es de $150."*
- **Zona 1 — Jalisco y Occidente:** Jalisco, Nayarit, Colima, Michoacán, Aguascalientes,
  Guanajuato, Zacatecas. Envío gratis desde **$500**.
- **Zona 2 — Resto del país:** los demás estados de México. Envío gratis desde **$750**.
- **Zona 3 — Zona extendida:** códigos postales con sobrecosto de la paquetería. Aquí el
  envío **siempre se cobra**: "se cotiza" por debajo de $750, y $120 fijos de $750 en
  adelante. Nunca gratis. Esto va **escrito** en la política pública, no escondido.
- La zona se determina por el **estado** que el cliente elige en el checkout, más una lista de
  códigos postales de zona extendida que debe poder editarse desde el admin.
- Zonas, umbrales y costos deben ser **editables desde el panel de admin o un archivo de
  configuración**, sin tocar código.

**Contexto económico (para que Claude entienda las decisiones, no para publicarlo):**
el envío nacional real cuesta ~$170. Al cobrar $120 se absorben $50 a propósito. El envío
gratis desde $750 es el descuento por volumen de la marca — se eligió sobre un descuento
del 10% ($75) porque no toca la lista de precios y se puede prender y apagar.

### La barra de "te falta para envío gratis" — REQUISITO, NO ADORNO

Todo el modelo de envíos depende de esto. En el carrito debe haber una barra de progreso hacia
el umbral de la zona del cliente, y cuando falten menos de $60 debe **sugerir la bolsa de 40 g
($50) con un botón de agregar en un clic**.

Ejemplos reales que la tienda tiene que manejar bien:

| Carrito | Total | Estado |
|---|---|---|
| 600 g | $720 | Faltan $30 → sugerir 40 g |
| 2 × 300 g | $740 | Faltan $10 → sugerir 40 g |
| 600 g + 40 g | $770 | Califica ✅ |
| 2 × 300 g + 40 g | $790 | Califica ✅ |
| 600 g + 120 g | $870 | Califica ✅ |

Texto sugerido: *"Te faltan $30 para envío gratis — ¿le agregamos una bolsita de 40 g?"*

### Pagos

- **Mercado Pago Checkout Pro** (el cliente sale a la pantalla de Mercado Pago y regresa)
- Debe aceptar: tarjeta de crédito/débito, meses sin intereses, OXXO y SPEI
- **Webhook** de Mercado Pago para confirmar el pago del lado del servidor. **Nunca** marcar un
  pedido como pagado solo porque el navegador regresó a la URL de éxito — eso se puede falsificar
- Estados de pedido: `pendiente` → `pagado` → `enviado` → `entregado`, más `cancelado` y `fallido`
- Guardar el `payment_id` y el `preference_id` de Mercado Pago en cada pedido

### Correos

- Al cliente: confirmación de pedido con el detalle y el número de pedido
- A ti: aviso de pedido nuevo
- Mandados con **Resend**

---

## 5. Stack técnico (obligatorio — es el mismo del CRM El Conejo)

- **Next.js** con App Router + **TypeScript**
- **Tailwind CSS**
- **Prisma** como ORM
- **Neon** (Postgres serverless) como base de datos
- **Vercel** para deploy (el mismo lugar donde vive el CRM). Ojo: el plan Hobby es solo para
  uso no comercial, así que producción real necesita plan Pro. *El proyecto estuvo en Netlify
  hasta la fase 5; se migró a Vercel el 2026-08-28 y no debe regresar.*
- **Mercado Pago SDK** para pagos
- **Resend** para correos

### Variables de entorno

```
DATABASE_URL=                  # Neon, la cadena CON -pooler (el sitio en marcha)
DIRECT_URL=                    # Neon, la cadena SIN pooler (migraciones de Prisma)
MP_ACCESS_TOKEN=               # Mercado Pago (TEST- al inicio, APP_USR- en producción)
NEXT_PUBLIC_MP_PUBLIC_KEY=     # Mercado Pago
MP_WEBHOOK_SECRET=             # Firma del webhook de Mercado Pago
RESEND_API_KEY=                # Resend
NEXT_PUBLIC_SITE_URL=          # https://tudominio.com
ADMIN_PASSWORD=                # Para entrar a /admin
CONTACTO_EMAIL=                # A dónde llegan los avisos de pedido nuevo
CONTACTO_WHATSAPP=             # Número con formato 521XXXXXXXXXX
```

> **Importante:** todas las llaves las pone Juan Fran directamente en Vercel →
> Settings → Environment Variables. **Nunca** las escribas en el código ni en el repo.
> El archivo `.env.local` va en `.gitignore` desde el primer commit.
> Después de agregar o cambiar una variable hay que volver a desplegar para que surta efecto.

---

## 6. Plan por fases

⚠️ **El plan de fases autoritativo vive en `CLAUDE.md`, en la raíz del repo.** Son 7 fases e
incluyen la generación del video de héroe. Este documento describe el ALCANCE de la tienda
(qué debe hacer), no el orden en que se construye.

Si algo de este brief contradice a `CLAUDE.md`, **manda `CLAUDE.md`**.

Resumen del orden, para referencia:

| # | Fase |
|---|---|
| 1 | Estructura y catálogo (con héroe sobre foto fija) |
| 2 | Frame inicial del video (~2 créditos) |
| 3 | Carrito y envíos por zona |
| 4 | Pagos en modo prueba |
| 5 | Video y héroe animado (~54 créditos) |
| 6 | Panel de pedidos |
| 7 | Dominio y producción |

---

## 7. Reglas de trabajo con Juan Fran

- **No es programador.** Explica en español simple, sin jerga. Si usas un término técnico, dilo en una frase de qué se trata.
- **Un paso a la vez.** Termina y verifica antes de proponer lo siguiente.
- **Nunca le pidas que pegue llaves en el chat.** Dile exactamente en qué pantalla de qué servicio poner cada valor.
- **Antes de cada fase**, di qué vas a hacer y cuánto va a tardar más o menos.
- **Después de cada fase**, di exactamente qué tiene que hacer él para verificar que quedó bien.
- Si algo falla, di **qué** falló y **qué opción hay**, no vuelvas a intentar lo mismo tres veces.

---

## 8. Mensaje para arrancar

Está en el documento de arranque que Juan Fran tiene aparte, no en el repo.

---

## 9. Estado de la información

**Ya definido ✅**

- Precios de las 4 presentaciones
- Política de envíos completa por zona y monto
- Historia de la marca y voz de Raquel
- Mercado Pago: cuenta lista
- Identidad visual, paleta y assets

**Falta ⏳**

- [ ] Información nutrimental exacta (copiarla de la etiqueta impresa)
- [ ] Correo y WhatsApp de contacto
- [ ] Dominio exacto y proveedor
- [ ] Datos fiscales para términos y condiciones
- [ ] Lista de códigos postales de zona extendida (se puede lanzar con la lista vacía y
      cargarla después desde el admin)
- [ ] Costo real por presentación (nuez + bolsa + etiqueta + empaque de envío). No frena el
      lanzamiento, pero sin ese número no se sabe el margen real de cada venta.
- [ ] ¿Hay foto de Raquel, de sus manos o de la cocina? Para la sección de historia vale más
      que cualquier render. Mientras no la haya, se trabaja con las fotos de producto.
