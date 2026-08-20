export type Producto = {
  id: string;
  gramos: number;
  precioCentavos: number;
  foto: string;
  texto: string;
};

// Única fuente de verdad de las 4 presentaciones.
// De aquí salen las tarjetas, la ficha, el carrito y el seed de Prisma.
export const productos: Producto[] = [
  {
    id: "nuez-40g",
    gramos: 40,
    precioCentavos: 5000,
    foto: "/img/bolsa-40g.jpg",
    texto: "Para probarla. O para que no falte en la bolsa del mandado.",
  },
  {
    id: "nuez-120g",
    gramos: 120,
    precioCentavos: 15000,
    foto: "/img/bolsa-120g.jpg",
    texto: "El tamaño de todos los días.",
  },
  {
    id: "nuez-300g",
    gramos: 300,
    precioCentavos: 37000,
    foto: "/img/bolsa-300g.jpg",
    texto: "Para compartir en la mesa.",
  },
  {
    id: "nuez-600g",
    gramos: 600,
    precioCentavos: 72000,
    foto: "/img/bolsa-600g.jpg",
    texto: "Para regalar, o para que dure.",
  },
];
