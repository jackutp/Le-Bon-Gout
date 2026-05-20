"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useInventarioLocal, PRODUCTS_MAP } from "./InventarioLocalContext";
import { useMenuLocal, initialMenu } from "./MenuLocalContext";

export type OrderItem = {
  id: number;
  productId: number;
  name: string;
  price: number;
  qty: number;
  notes?: string;
  completed?: boolean;
};

export type Order = {
  id: string;
  table: number;
  time: string;
  items: OrderItem[];
  status: "pending" | "served" | "completed";
  createdAt: Date;
};

type PedidoContextType = {
  orders: Order[];
  addOrder: (table: number, items: OrderItem[]) => void;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  updateOrderItems: (orderId: string, items: OrderItem[]) => void;
  completeOrder: (orderId: string) => void;
  syncStockChange: (productId: number, oldQty: number, newQty: number) => void;
};

const PedidoContext = createContext<PedidoContextType | undefined>(undefined);

export function PedidoProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const { setInventory } = useInventarioLocal();
  const { setMenuItems } = useMenuLocal();

  const decreaseStock = (items: OrderItem[]) => {
    setInventory((prev) =>
      prev.map((inv) => {
        for (const key in PRODUCTS_MAP) {
          if (key === inv.name.toLowerCase()) {
            const orderItem = items.find((i) =>
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
        const orderItem = items.find((i) =>
          i.name.toLowerCase().includes(item.name.toLowerCase().split(" ")[0])
        );
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
        const menuItem = initialMenu.find((m) => m.id === productId);
        if (menuItem) {
          const matchKey = Object.keys(PRODUCTS_MAP).find((key) =>
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
    <PedidoContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        updateOrderItems,
        completeOrder,
        syncStockChange,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}

export function usePedidos() {
  const context = useContext(PedidoContext);
  if (!context) {
    throw new Error("usePedidos must be used within PedidoProvider");
  }
  return context;
}
