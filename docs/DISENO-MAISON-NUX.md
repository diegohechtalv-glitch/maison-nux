[05-DISENO-MAISON-NUX.md](https://github.com/user-attachments/files/31275695/05-DISENO-MAISON-NUX.md)
# MAISON NUX — Design Package

> **El sitio se construye en Next.js**, no en HTML plano. Este documento es el design package
> que pide la skill `10k-websites`, adaptado a ese stack: trae **respondidas por adelantado**
> las preguntas de sus Fases 2 y 3, y **pre-llenadas** las 9 secciones del paquete.
>
> Regla de la skill que sí aplica: *"Every line of copy in the package ships verbatim"* — la
> redacción de aquí es la definitiva. La construcción solo la implementa.
>
> Lo que **sí** se toma de la skill: el concepto y storyboard del video, la generación con
> Higgsfield, el procesado con ffmpeg y la técnica de scrub. Lo que **no**: su fase de
> construcción en HTML plano y su deploy en Hostinger.
>
> Va en el repo como `docs/DISENO-MAISON-NUX.md`.
>
> **El héroe se construye completo desde la fase 1 con sus 4 bandas funcionando sobre una foto
> fija.** En la fase 5 solo se sustituye la fuente visual por el video. No se rediseña.

---

## FASE 2 — Respuestas al cuestionario de la skill

**¿Qué tipo de activo es?**
> *A real thing with its own photos.* Producto real, con fotografía profesional de las cuatro
> presentaciones y logo vectorial. Todo está en `public/img/`.

**¿Qué debe sentir el visitante?**
> Antojo y confianza. Que se le haga agua la boca, y que entienda que esto lo hace una persona
> con nombre, no una fábrica. Elegante pero cálido — más cerca de una chocolatería francesa
> que de una marca de botanas.

**Referencias visuales**
> El propio empaque es la referencia principal: dorado sobre crema, ilustración botánica
> grabada, tipografía serif clásica. Territorio de chocolate fino, café de especialidad y
> aceite de oliva de autor. **Nunca** territorio de snacks, fitness o "healthy".

**Activos existentes**

| Archivo en `public/img/` | Qué es |
|---|---|
| `logo-maison-nux.png` | Logo completo con ornamento, fondo transparente |
| `ornamento-nuez.png` | Solo la rama botánica, transparente — separador de secciones |
| `bolsa-40g.jpg` | Sobre de 40 g sobre fondo kraft |
| `bolsa-120g.jpg` | Bolsa de 120 g sobre fondo kraft |
| `bolsa-300g.jpg` | Bolsa de 300 g sobre fondo kraft |
| `bolsa-600g.jpg` | Bolsa de 600 g sobre fondo kraft |

> **No generes un logo nuevo ni fotos de producto nuevas.** Ya existen y son buenas.
> Lo único que se genera con IA es el video de héroe y, si acaso, 2–3 stills de apoyo.

---

## FASE 3 — Lenguaje del comprador

Cómo habla realmente quien compra nuez caramelizada en México. Usar estas palabras, no
sinónimos elegantes.

**Lo que dicen cuando les gusta:** *crujiente, adictivas, no empalagan, el punto de sal,
se acaban en dos días, perfectas para regalar, no son grasosas, saben caseras.*

**Objeciones reales, en su orden de peso:**

1. *"Están caras."* → Se responde con el porqué: nuez seleccionada, tandas pequeñas, hecho a
   mano. No se responde bajando el precio ni pidiendo disculpas.
2. *"Seguro son puro azúcar."* → Cuatro ingredientes, ninguno raro. Se listan y ya.
3. *"¿Y si llegan hechas polvo?"* → Empaque y envío cuidados. Mencionarlo sin dramatizar.
4. *"¿Quién las hace?"* → Raquel. Con nombre y cara. Esta es la respuesta más fuerte que tiene
   la marca y va arriba, no en el footer.

**El único llamado a la acción de toda la página:** *comprar.*
Todo el embudo apunta al carrito. El WhatsApp existe, pero como **soporte**, no como forma de
pedir: vive en el footer y en la pregunta de pedidos grandes, nunca compitiendo con el botón
de compra. Si alguien puede pagar en dos clics, mandarlo a un chat es perder la venta.

---

# DESIGN PACKAGE

## 1 · The brand premise

Una receta que cruzó el Atlántico y se volvió otra cosa. La bisabuela francesa de Raquel
caramelizaba nueces en su casa; Raquel la hizo una y otra vez en su cocina mexicana hasta que
empezó a parecerse a ella. Lo que quedó es una nuez pecana cubierta de azúcar de caña que
truena al morderse, con sal de mar justo detrás. El sitio tiene que hacer sentir ese contraste
—dulce que se rompe, salado que aparece— antes de que nadie lea una sola palabra.

---

## 2 · The palette as CSS tokens

```css
:root {
  /* superficies */
  --canvas:        #F1EEDD;  /* crema del empaque — fondo dominante */
  --panel:         #FBFAF5;  /* blanco hueso — tarjetas y bloques */
  --panel-warm:    #DCAE7A;  /* kraft — fondos de foto de producto */
  --ink-well:      #2A1D11;  /* café muy oscuro — bandas de contraste */

  /* acento */
  --accent:        #A07828;  /* dorado Maison — el color del logo */
  --accent-deep:   #7A5C1E;  /* dorado oscuro — hover y texto sobre crema */
  --accent-light:  #C9A961;  /* dorado claro — bordes, hairlines, partículas */

  /* texto */
  --text-primary:  #3A2A18;  /* café nuez */
  --text-secondary:#5C4A38;  /* café suave */
  --text-on-dark:  #F1EEDD;  /* crema sobre bandas oscuras */

  /* utilidades */
  --hairline:      rgba(160,120,40,0.22);
  --shadow-soft:   0 1px 3px rgba(58,42,24,0.06);
}
```

**Reglas de uso**

- El fondo dominante es `--canvas`. Blanco puro no aparece en ningún lado.
- `--accent` es acento: filetes, viñetas, subrayados, el CTA. **Nunca** fondo de bloques grandes.
- `--accent-light` **no** se usa para texto sobre crema — no pasa contraste. Solo para líneas
  y partículas.
- Máximo **una** banda `--ink-well` por página, para el momento de mayor peso.

---

## 3 · The type trio

| Rol | Fuente | Pesos | Uso |
|---|---|---|---|
| **Display** | Cormorant Garamond | 400, 600 | Titulares. Mayúsculas con `letter-spacing: 0.08em`. Es lo más cercano al logo. |
| **Body** | Jost | 300, 400, 500 | Todo el texto corrido. Base 300 — la marca es ligera, no pesada. |
| **Mono** | IBM Plex Mono | 400 | Datos secos: gramajes, precios, etiquetas de sección, "CONT. NET. 120 g". Da el aire de etiqueta de producto. |

Las tres de Google Fonts. Cargar solo esos pesos.

**El wordmark "MAISON NUX" siempre es la imagen del logo, nunca texto con tipografía web.**

---

## 4 · The band map

Video de héroe de ~6 segundos, controlado por scroll. Cuatro bandas.

**Concepto del video:** macro de una nuez pecana. El caramelo la va cubriendo, brilla, y al
final cae sal de mar en cámara lenta. Cámara con un empuje muy lento hacia adelante. Luz
cálida y lateral, fondo crema fuera de foco. Sin manos, sin personas, sin texto en el video.

| Banda | Scroll | Momento visual | Copia | Entrada |
|---|---|---|---|---|
| **1** | 0–22% | Nuez pecana entera, quieta, luz lateral cálida | **Una receta francesa con corazón mexicano** | Fade del titular a los 300 ms; el logo ya está fijo arriba |
| **2** | 22–48% | El caramelo la cubre, empieza a brillar | *Azúcar de caña, despacio, hasta que truena* | Sube 16 px con fade, línea dorada que se dibuja debajo |
| **3** | 48–74% | Cae la sal de mar en cámara lenta | *Y después, la sal de mar* | Partículas doradas que descienden y se detienen con el scroll |
| **4** | 74–100% | Nuez terminada, brillo pleno, el empuje se detiene | **Nuez pecana Maison Nux** + CTA `Ver presentaciones` | El CTA aparece último, con 400 ms de retraso sobre el titular. Lleva por scroll suave a la sección 6.1 |

**Regla:** ninguna copia compite con el momento visual. Un titular por banda, máximo dos
líneas. Si al probarlo la palabra estorba a la imagen, gana la imagen.

---

## 5 · The static-hero copy block

Versión sin video: móvil, conexión lenta y `prefers-reduced-motion`. Sobre `--canvas` con la
foto `bolsa-120g.jpg`.

> **Titular:** Una receta francesa con corazón mexicano
>
> **Subtítulo:** Nuez pecana caramelizada a mano, con el toque perfecto dulce y salado.
>
> **CTA:** Ver presentaciones

Esta versión tiene que verse **terminada**, no como el plan B. Es lo que va a ver más de la
mitad de la gente.

---

## 6 · The below-fold outline

### 6.1 · Las presentaciones

**Título:** Elige tu bolsa
**Bajada:** La misma receta en cuatro tamaños. Empieza por donde quieras.

| Bolsa | Precio | Texto de la tarjeta |
|---|---|---|
| 40 g | $50 | Para probarla. O para que no falte en la bolsa del mandado. |
| 120 g | $150 | El tamaño de todos los días. |
| 300 g | $370 | Para compartir en la mesa. |
| 600 g | $720 | Para regalar, o para que dure. |

**Nota bajo las tarjetas:** Todas llevan la misma nuez y la misma receta. Cambia el tamaño,
no la calidad.

> ⚠️ El precio por kilo es casi idéntico en las cuatro. **No escribas** que la grande sale
> más barata por kilo — sería falso.

**Momento interactivo:** al pasar el cursor sobre una tarjeta, la foto se acerca un 3% y
aparece un filete `--accent` bajo el precio. En móvil, carrusel con scroll-snap.

### 6.2 · Qué la hace distinta

**Título:** Tres cosas que no negociamos

1. **La receta** — De mi bisabuela francesa. No la cambié: le añadí lo que aprendí en mi cocina mexicana.
2. **El punto dulce y salado** — Ni postre ni botana. El caramelo justo, la sal justa. Ese equilibrio es todo el trabajo.
3. **Hecha a mano** — En tandas pequeñas. Sin conservadores, sin sabores artificiales. Solo nuez pecana, azúcar de caña, aceite vegetal y sal de mar.

Separador: `ornamento-nuez.png` centrado, al 55% de opacidad.

### 6.3 · La historia — banda `--ink-well`

Única banda oscura de la página. Texto en `--text-on-dark`, tipografía display.

**Título:** Hola, soy Raquel

> Maison Nux nació de una receta de mi bisabuela francesa. La hacía en casa, para la familia,
> y cuando llegó a mis manos le añadí el corazón de mi cocina mexicana.
>
> La sigo haciendo en tandas pequeñas, con los mismos cuatro ingredientes de siempre. No
> porque sea más eficiente —no lo es— sino porque es la única forma en que sabe a lo que
> tiene que saber.
>
> Gracias por dejarla entrar a tu casa.

**— Raquel**

> Si Raquel manda una foto suya o de sus manos trabajando, va aquí y sustituye cualquier
> imagen generada. Mientras no la haya, esta banda es solo tipografía sobre el fondo oscuro:
> se ve mejor vacía que con un retrato falso.

### 6.4 · Ingredientes y cuidados

Bloque en mono, aire de etiqueta.

```
INGREDIENTES     Nuez pecana seleccionada, azúcar de caña pura,
                 aceite vegetal, sal de mar.
LIBRE DE         Conservadores y sabores artificiales.
ALÉRGENOS        Contiene nuez pecana. Puede contener trazas de
                 otros frutos secos.
CONSERVACIÓN     Mantén el empaque cerrado. Después de abrirlo,
                 refrigera para preservar su crocancia.
```

### 6.5 · Envíos

**Título:** Envíos a todo México

> Envío **gratis** en pedidos desde $750 a todo el país.
> Si estás en Jalisco o el Occidente, desde $500.
> Pedido mínimo $150.

### 6.6 · Preguntas frecuentes

Acordeón, cerrado por defecto. Solo estas cinco — no inventar más.

- **¿Por qué hay que refrigerarla después de abrir?** Porque no lleva conservadores. Es la misma razón por la que sabe como sabe.
- **¿Contiene alérgenos?** Sí. Es nuez pecana, y puede contener trazas de otros frutos secos. Si hay alergia en casa, tenlo en cuenta.
- **¿Es la misma receta en todos los tamaños?** La misma nuez y la misma receta. Solo cambia cuánta te llevas.
- **¿Cuándo es gratis el envío?** Desde $750 a todo el país, y desde $500 si estás en Jalisco o el Occidente.
- **¿Hacen pedidos grandes o para empresa?** Sí. Escríbenos por WhatsApp y lo vemos.

### 6.7 · Testimonios

**Dejar fuera hasta que existan reseñas reales.** Un testimonio inventado destruye
exactamente la confianza que la página está construyendo. Si Raquel junta tres mensajes
reales de clientes, entran entre la sección 6.3 y la 6.5.

### 6.8 · Cierre y microcopia del CTA

Banda final sobre `--canvas`, logo centrado.

> **Título:** ¿Nos pedimos una bolsa?
> **Botón:** Elegir mi bolsa
> **Bajo el botón:** Envío gratis desde $750. Pedido mínimo $150.

El botón lleva por scroll suave a la sección 6.1. **Ningún botón de compra manda a WhatsApp.**

**Microcopia del botón de producto:** `Agregar al carrito`, y debajo, en mono pequeño:
`Envío gratis desde $750`.

### 6.9 · Footer

Logo · Ingredientes y alérgenos · Envíos · WhatsApp `[[ NÚMERO ]]` · `[[ CORREO ]]` ·
Instagram `[[ @ ]]`

> Maison Nux · Hecho a mano en México · © 2026

---

## 7 · The vector layer plan

Todo dibujado a mano en SVG, nada de librerías de íconos.

| Elemento | Dónde | Comportamiento |
|---|---|---|
| **Ornamento botánico** | Separadores entre secciones | El trazo se dibuja (`stroke-dashoffset`) al entrar en pantalla, una sola vez, 900 ms |
| **Partículas de sal** | Banda 3 del héroe | 12–18 puntos `--accent-light`, 2–4 px, descienden ligados al scroll. **Nunca** en bucle automático |
| **Filete dorado** | Bajo cada titular de sección | Se dibuja de izquierda a derecha, 400 ms, al entrar en pantalla |
| **Marco de esquinas** | Tarjetas de presentación | Cuatro esquinas en `--hairline`, 1 px; al hover se cierran hacia el centro |

**Con `prefers-reduced-motion: reduce`:** todo aparece en su estado final, sin movimiento. Los
trazos se ven completos, las partículas quedan quietas y el video se sustituye por el hero
estático. La página tiene que verse igual de terminada.

---

## 8 · The engineering list

Se siguen íntegros los estándares de `references/scrub-pipeline.md`. Los no negociables:

- Video cargado como **Blob** y reproducido desde memoria, con scrub ligado al scroll — nunca
  `autoplay` en bucle.
- **Interpolación con lerp** en el scrub, para que el video no se sienta a saltos.
- La legibilidad manda: si un titular no se lee sobre el video, se le pone un velo
  `--ink-well` al 40%, no se cambia el color del texto.
- El hero estático se decide **antes** de descargar el video: móvil, `reduced-motion` o
  conexión lenta nunca bajan el archivo.
- Todas las imágenes con `width`/`height` explícitos para que no brinque el layout.
- Fuentes con `font-display: swap` y solo los pesos listados.
- La página completa debe pintar el primer contenido en menos de 2.5 s en 4G.
- El video **nunca** se sirve desde el bundle de JavaScript. Va en `public/video/` como
  archivo estático.

**Cómo vive esto en Next.js**

El héroe es un componente cliente (`'use client'`) que encapsula todo el scrub. El resto de la
página puede ser server components.

```
app/
  layout.tsx                fuentes, metadatos, Open Graph
  page.tsx                  la página, componiendo las secciones
  producto/[slug]/page.tsx  ficha de presentación
  carrito/page.tsx
  checkout/page.tsx
  admin/                    protegido con contraseña
components/
  hero/HeroScrub.tsx        'use client' — el scrub, autocontenido
  hero/HeroStatic.tsx       versión sin video (móvil, reduced-motion, red lenta)
  hero/bands.ts             el band map como datos, no como JSX suelto
  secciones/…               una sección = un componente
lib/
  productos.ts              las 4 presentaciones (fuente única de verdad)
  envios.ts                 zonas, umbrales y cálculo
  formato.ts                centavos → "$370.00 MXN"
styles/
  tokens.css                solo las variables CSS
public/img/                 imágenes de marca (ya existen)
public/video/               el video procesado
```

**Reglas que no se negocian:**

- `lib/productos.ts` es la **única** fuente de verdad de las 4 presentaciones. De ahí salen las
  tarjetas, la ficha, el carrito y el seed de Prisma. Formato:
  `{ id, gramos, precioCentavos, foto, texto }`.
- **Precios en centavos**: `37000`, nunca `"$370"`. Se formatean solo al mostrarse.
- Los tokens de color viven en `styles/tokens.css` y se exponen a Tailwind por configuración.
  **Ningún color escrito a mano en un componente.**
- `lib/envios.ts` concentra zonas, umbrales y el cálculo. Ningún componente decide precios de
  envío por su cuenta.
- El band map vive en `components/hero/bands.ts` como datos. Cambiar una banda es editar un
  objeto, no perseguir JSX.
- `HeroScrub` y `HeroStatic` comparten el mismo layout y las mismas bandas. La decisión de cuál
  montar se toma **antes** de descargar el video.

---

## 9 · The copy gate line

Antes de publicar, revisar toda la página contra esto:

- ✅ **Cero em dashes.**
- ✅ **Cero stock words**: "revolucionario", "único en su tipo", "experiencia inigualable",
  "no es solo X, es Y", "en el mundo de…", "desbloquea".
- ✅ **Cero exclamaciones de venta.** El único signo de admiración permitido es el del saludo
  de Raquel.
- ✅ **Cero promesas falsas.** Específicamente: nada de "más barato por kilo" en las bolsas
  grandes, y nada de testimonios que no existan.
- ✅ Todo en primera persona de Raquel donde hable la marca.
- ✅ Los datos duros —precios, umbrales de envío, alérgenos— coinciden exactamente con
  `CLAUDE.md`.

---

## Lo que falta antes de construir

- [ ] Número de WhatsApp — solo para soporte y footer. **Ya no bloquea el arranque**, porque el CTA principal es el carrito
- [ ] Correo e Instagram para el footer
- [x] Conector de Higgsfield dado de alta y con créditos ✅
- [ ] ¿Foto de Raquel o de sus manos trabajando?
- [ ] Información nutrimental y vida de anaquel (opcionales para la landing, obligatorias para la tienda)
