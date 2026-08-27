"use client";

// Carrito persistente: vive en localStorage, así sobrevive a cerrar el
// navegador. Sin dependencias: un almacén mínimo con useSyncExternalStore.

import { useSyncExternalStore } from "react";

export type ItemCarrito = { productoId: string; cantidad: number };

const CLAVE = "maison-nux-carrito-v1";
const VACIO: ItemCarrito[] = [];

let items: ItemCarrito[] = VACIO;
let cargado = false;
const suscriptores = new Set<() => void>();

function cargar() {
  if (cargado || typeof window === "undefined") return;
  cargado = true;
  try {
    const crudo = window.localStorage.getItem(CLAVE);
    const datos = crudo ? JSON.parse(crudo) : [];
    if (Array.isArray(datos)) {
      items = datos.filter(
        (x) => x && typeof x.productoId === "string" && x.cantidad > 0
      );
    }
  } catch {
    items = VACIO;
  }
}

function guardar() {
  try {
    window.localStorage.setItem(CLAVE, JSON.stringify(items));
  } catch {
    // sin almacenamiento disponible: el carrito sigue funcionando en memoria
  }
}

function emitir() {
  guardar();
  suscriptores.forEach((f) => f());
}

function suscribir(cb: () => void) {
  const primero = suscriptores.size === 0;
  suscriptores.add(cb);
  if (primero && !cargado) {
    cargar();
    queueMicrotask(() => suscriptores.forEach((f) => f()));
  }
  return () => suscriptores.delete(cb);
}

const obtener = () => items;
const obtenerServidor = () => VACIO;

export function useCarrito(): ItemCarrito[] {
  return useSyncExternalStore(suscribir, obtener, obtenerServidor);
}

export function agregarAlCarrito(productoId: string, cantidad = 1) {
  cargar();
  const existente = items.find((i) => i.productoId === productoId);
  items = existente
    ? items.map((i) =>
        i.productoId === productoId
          ? { ...i, cantidad: i.cantidad + cantidad }
          : i
      )
    : [...items, { productoId, cantidad }];
  emitir();
}

export function fijarCantidad(productoId: string, cantidad: number) {
  cargar();
  items =
    cantidad <= 0
      ? items.filter((i) => i.productoId !== productoId)
      : items.map((i) =>
          i.productoId === productoId ? { ...i, cantidad } : i
        );
  emitir();
}

export function quitarDelCarrito(productoId: string) {
  fijarCantidad(productoId, 0);
}
