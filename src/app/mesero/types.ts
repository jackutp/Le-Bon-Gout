export type ViewType = "productos" | "estados";

export interface OrderItemState {
  id: number;
  qty: number;
}

export interface InvoiceData {
  table: number;
  total: number;
}

export interface TableData {
  id: number;
  number: number;
  occupied: boolean;
  total: number;
  img: string;
}
