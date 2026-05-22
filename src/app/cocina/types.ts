// src/app/cocina/types.ts

// Tipo para el frontend (adaptado del backend)
export interface ItemCocinaFront {
  id: number;
  productoId?: number;
  nombre: string;
  cantidad: number;
  notas?: string;
  completado: boolean;
}

export interface PedidoCocinaFront {
  id: number;
  ordenId: string;
  mesaNumero: number;
  hora: string;
  estado: string;
  items: ItemCocinaFront[];
}

// Tipos para los componentes (alias compatibles)
export type OrderItem = {
  id: number;
  name: string;
  qty: number;
  notes?: string;
  completed: boolean;
};

export type Order = {
  id: string;
  table: number;
  time: string;
  items: OrderItem[];
  status: "pending" | "served";
};