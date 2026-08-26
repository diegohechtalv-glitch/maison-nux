// El band map del design package como datos, no como JSX suelto.
// Rangos en progreso de scroll (0 a 1); puntos de partida, se validan con el flick test.
// En la fase 5 el video se mapea a este mismo progreso: cambiar una banda es editar aquí.

export type Band = {
  id: string;
  a: number; // inicio del rango
  b: number; // fin del rango
  kind: "fade" | "rise" | "salt" | "settle";
  titulo: string;
};

export const bands: Band[] = [
  {
    id: "b1",
    a: 0,
    b: 0.22,
    kind: "fade",
    titulo: "Una receta francesa con corazón mexicano",
  },
  {
    id: "b2",
    a: 0.22,
    b: 0.48,
    kind: "rise",
    titulo: "La combinación perfecta entre salado y dulce",
  },
  {
    id: "b3",
    a: 0.48,
    b: 0.74,
    kind: "salt",
    titulo: "Un sabor que te revive recuerdos",
  },
  {
    id: "b4",
    a: 0.74,
    b: 1,
    kind: "settle",
    titulo: "Nuez pecana Maison Nux",
  },
];

// 14 partículas con valores fijos (nada aleatorio en render: el servidor y el
// navegador deben pintar exactamente lo mismo). x/y en %, tamaño en px,
// caída en px, th = umbral de arranque escalonado dentro de la banda.
export const SALT_PARTICLES = [
  { x: 8,  y: 12, size: 3, fall: 150, th: 0.0 },
  { x: 18, y: 4,  size: 2, fall: 190, th: 0.12 },
  { x: 27, y: 18, size: 4, fall: 130, th: 0.05 },
  { x: 36, y: 8,  size: 2, fall: 170, th: 0.2 },
  { x: 44, y: 22, size: 3, fall: 120, th: 0.08 },
  { x: 52, y: 6,  size: 2, fall: 200, th: 0.25 },
  { x: 60, y: 15, size: 3, fall: 145, th: 0.02 },
  { x: 68, y: 3,  size: 2, fall: 185, th: 0.18 },
  { x: 75, y: 20, size: 4, fall: 125, th: 0.1 },
  { x: 83, y: 10, size: 2, fall: 175, th: 0.22 },
  { x: 90, y: 16, size: 3, fall: 140, th: 0.06 },
  { x: 14, y: 26, size: 2, fall: 110, th: 0.3 },
  { x: 48, y: 28, size: 2, fall: 105, th: 0.28 },
  { x: 79, y: 27, size: 3, fall: 115, th: 0.15 },
];
