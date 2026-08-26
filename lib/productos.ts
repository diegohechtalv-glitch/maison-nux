export type Producto = {
  id: string;
  gramos: number;
  precioCentavos: number;
  foto: string;
  nombre: string;
  frase: string;
  parrafo: string;
};

// Única fuente de verdad de las 4 presentaciones.
// De aquí salen las tarjetas, la ficha, el carrito y el seed de Prisma.
export const productos: Producto[] = [
  {
    id: "nuez-40g",
    gramos: 40,
    precioCentavos: 5000,
    foto: "/img/bolsa-40g.jpg",
    nombre: "El diario",
    frase: "Cabe en el bolsillo, no en lo ordinario.",
    parrafo:
      "La medida exacta para que un martes cualquiera esté bien resuelto. Junta, gimnasio, carretera, oficina: donde estés, tu estándar viaja contigo.",
  },
  {
    id: "nuez-120g",
    gramos: 120,
    precioCentavos: 15000,
    foto: "/img/bolsa-120g.jpg",
    nombre: "La jornada",
    frase: "Alcanza para el día. Y para quien te acompañe.",
    parrafo:
      "Suficiente para no racionar y para ofrecer sin pensarlo. Porque compartir lo bueno es parte del buen gusto.",
  },
  {
    id: "nuez-300g",
    gramos: 300,
    precioCentavos: 37000,
    foto: "/img/bolsa-300g.jpg",
    nombre: "La casa",
    frase: "La bolsa que siempre está.",
    parrafo:
      "En la barra de la cocina, junto al café, a la mano cuando llega visita. La reserva de casa que dice más de ti que cualquier decoración.",
  },
  {
    id: "nuez-600g",
    gramos: 600,
    precioCentavos: 72000,
    foto: "/img/bolsa-600g.jpg",
    nombre: "El obsequio",
    frase: "Cuando quieres que se note el detalle.",
    parrafo:
      "El formato para regalar, para llevarte de viaje, para llegar a una casa sin llegar con las manos vacías. Se abre y se entiende de inmediato: esto no fue una compra apurada.",
  },
];
