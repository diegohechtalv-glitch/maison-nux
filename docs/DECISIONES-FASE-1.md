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
