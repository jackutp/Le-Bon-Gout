"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type OrderItem = {
  id: number;
  productId: number;
  name: string;
  price: number;
  qty: number;
  notes?: string;
  completed?: boolean;
};

type Order = {
  id: string;
  table: number;
  time: string;
  items: OrderItem[];
  status: "pending" | "served" | "completed";
  createdAt: Date;
};

type InventoryItem = {
  id: number;
  name: string;
  stock: number;
  unit: string;
  category: string;
};

type MenuItem = {
  id: number;
  name: string;
  price: number;
  desc: string;
  category: "Plato" | "Bebida" | "Postre";
  img: string;
  inStock: number;
};

type OrderContextType = {
  orders: Order[];
  inventory: InventoryItem[];
  menuItems: MenuItem[];
  addOrder: (table: number, items: OrderItem[]) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  updateOrderItems: (orderId: string, items: OrderItem[]) => void;
  completeOrder: (orderId: string) => void;
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (id: number, item: MenuItem) => void;
  deleteMenuItem: (id: number) => void;
  syncStockChange: (productId: number, oldQty: number, newQty: number) => void;
};

const PRODUCTS_MAP: Record<string, number> = {
  "filet mignon": 3,
  "ravioli": 7,
  "langosta": 7,
  "mousse": 8,
  "chocolate": 8,
  "chablis": 5,
  "caviar": 2,
  "magret": 3,
  "pisco": 6,
  "creme brulee": 8,
};

const initialInventory: InventoryItem[] = [
  { id: 1, name: "Trufa Negra", stock: 2, unit: "kg", category: "premium" },
  { id: 2, name: "Caviar Beluga", stock: 5, unit: "latas", category: "premium" },
  { id: 3, name: "Filete de Res", stock: 24, unit: "kg", category: "carne" },
  { id: 4, name: "Azafran", stock: 8, unit: "g", category: "especias" },
  { id: 5, name: "Vino Chablis", stock: 15, unit: "botellas", category: "vinos" },
  { id: 6, name: "Pisco", stock: 12, unit: "botellas", category: "bebidas" },
  { id: 7, name: "Langosta", stock: 10, unit: "kg", category: "mariscos" },
  { id: 8, name: "Chocolate Oscuro", stock: 5, unit: "kg", category: "postres" },
];

const initialMenu: MenuItem[] = [
  { id: 1, name: "Filet Mignon", price: 45, desc: "Pure de papas con trufa, esparragos", category: "Plato", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800", inStock: 12 },
  { id: 2, name: "Ravioli de Langosta", price: 38, desc: "Pasta casera, crema de azafran, caviar", category: "Plato", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800", inStock: 5 },
  { id: 3, name: "Magret de Pato", price: 42, desc: "Salsa de frutos rojos", category: "Plato", img: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&q=80&w=800", inStock: 8 },
  { id: 4, name: "Chablis Grand Cru", price: 120, desc: "Vino blanco premium, 2019", category: "Bebida", img: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800", inStock: 3 },
  { id: 5, name: "Pisco Sour", price: 25, desc: "Pisco, lemon, clara de huevo", category: "Bebida", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800", inStock: 10 },
  { id: 6, name: "Caviar Beluga", price: 150, desc: "Con blinis y crema", category: "Plato", img: "https://images.unsplash.com/photo-1728335026927-8ee0382ada94?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", inStock: 2 },
  { id: 7, name: "Mousse de Chocolate", price: 18, desc: "Lampara de oro, coulis de frambuesa", category: "Postre", img: "https://images.unsplash.com/photo-1673551494277-92204546b504?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", inStock: 8 },
  { id: 8, name: "Creme Brulee", price: 22, desc: "Vainilla de Madagascar, caramelizado", category: "Postre", img: "https://images.unsplash.com/photo-1676300184943-09b2a08319a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", inStock: 6 },
];

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenu);

  const decreaseStock = (items: OrderItem[]) => {
    setInventory((prev) =>
      prev.map((inv) => {
        for (const key in PRODUCTS_MAP) {
          if (key === inv.name.toLowerCase()) {
            const orderItem = items.find(i =>
              i.name.toLowerCase().includes(key.split(" ")[0])
            );
            if (orderItem) {
              return { ...inv, stock: Math.max(0, inv.stock - orderItem.qty) };
            }
          }
        }
        return inv;
      })
    );

    setMenuItems((prev) =>
      prev.map((item) => {
        const orderItem = items.find(i => i.name.toLowerCase().includes(item.name.toLowerCase().split(" ")[0]));
        if (orderItem) {
          return { ...item, inStock: Math.max(0, item.inStock - orderItem.qty) };
        }
        return item;
      })
    );
  };

  const addOrder = (table: number, items: OrderItem[]) => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      table,
      time: new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
      items,
      status: "pending",
      createdAt: new Date(),
    };
    setOrders((prev) => [...prev, newOrder]);
    decreaseStock(items);
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  const updateOrderItems = (orderId: string, items: OrderItem[]) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, items } : order))
    );
  };

  const completeOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status: "completed" } : order))
    );
  };

  const addMenuItem = (item: MenuItem) => {
    setMenuItems((prev) => [...prev, item]);
  };

  const updateMenuItem = (id: number, item: MenuItem) => {
    setMenuItems((prev) => prev.map(m => m.id === id ? item : m));
  };

  const deleteMenuItem = (id: number) => {
    setMenuItems((prev) => prev.filter(m => m.id !== id));
  };

  const syncStockChange = (productId: number, oldQty: number, newQty: number) => {
    const diff = oldQty - newQty;
    if (diff === 0) return;

    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          return { ...item, inStock: Math.min(50, item.inStock + diff) };
        }
        return item;
      })
    );

    setInventory((prev) =>
      prev.map((inv) => {
        const menuItem = initialMenu.find(m => m.id === productId);
        if (menuItem) {
          const matchKey = Object.keys(PRODUCTS_MAP).find(key =>
            menuItem.name.toLowerCase().includes(key.split(" ")[0])
          );
          if (matchKey && PRODUCTS_MAP[matchKey] === inv.id) {
            return { ...inv, stock: Math.max(0, inv.stock + diff) };
          }
        }
        return inv;
      })
    );
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        inventory,
        menuItems,
        addOrder,
        updateOrderStatus,
        updateOrderItems,
        completeOrder,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        syncStockChange,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within OrderProvider");
  }
  return context;
}