import { Order } from "./types";

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-001",
    table: 4,
    time: "19:24",
    status: "pending",
    items: [
      { id: 1, name: "Filet Mignon", qty: 2, notes: "Término medio", completed: false },
      { id: 2, name: "Ravioli de Langosta", qty: 1, completed: false },
      { id: 3, name: "Chablis Grand Cru", qty: 1, completed: true },
    ]
  },
  {
    id: "ORD-002",
    table: 7,
    time: "19:30",
    status: "pending",
    items: [
      { id: 4, name: "Magret de Pato", qty: 2, completed: false },
      { id: 5, name: "Mousse de Chocolate", qty: 2, completed: false },
    ]
  },
  {
    id: "ORD-003",
    table: 2,
    time: "19:45",
    status: "pending",
    items: [
      { id: 6, name: "Caviar Beluga", qty: 1, notes: "Extra blinis", completed: false },
    ]
  }
];
