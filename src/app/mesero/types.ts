// src/app/mesero/types.ts

export type ViewType = "productos" | "estados";
export interface OrderItemState {
  id: number;
  qty: number;
}

export interface InvoiceData {
  table: number;
  total: number;
}

// Nuevo tipo alineado con microservicio-mesas
export interface TableData {
  id: number;
  number: number;
  status: "DISPONIBLE" | "OCUPADO" | "RESERVADO";
  total: number;
  capacity: number;
  // img: string; // ELIMINADO
}