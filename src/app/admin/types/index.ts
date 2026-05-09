// src/app/admin/types/index.ts

export type Staff = {
    id: number;
    name: string;
    email: string;
    role: "Mesero" | "Cocinero";
    password: string;
    notes: string;
    ordersToday?: number;
    avgTime?: string;
};

export type MenuItem = {
    id: number;
    name: string;
    price: number;
    desc: string;
    category: "PLATO" | "BEBIDA" | "POSTRE";
    img: string;
    inStock: number;
};

export type Waste = {
    id: number;
    item: string;
    qty: string;
    reason: string;
    date: string;
};

export type Reservation = {
    id: number;
    name: string;
    details: string;
    date: string;
};

export type PurchaseOrderItem = {
    name: string;
    qty: string;
    price: number;
};

export type PurchaseOrder = {
    id: string;
    date: string;
    total: number;
    status: "Recibido" | "Pendiente" | "En Camino";
    items: PurchaseOrderItem[];
};

export type Supplier = {
    id: number;
    name: string;
    contact: string;
    specialty: string;
    quality?: string;
};