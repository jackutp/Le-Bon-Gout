//src/app/mesero/types.ts
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
  id: number;           // PK
  number: number;       // Número de mesa (1,2,3...)
  status: "DISPONIBLE" | "OCUPADO" | "RESERVADO";  // enum, no boolean
  total: number;        // Total acumulado (si Mesas lo guarda)
  capacity: number;     // ¿Cuántas personas? (opcional pero útil)
  // img: string;       // ELIMINAR - la imagen es local del frontend
}