//src/app/cocina/types.ts
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
