"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";

import { Order } from "./types";
import { INITIAL_ORDERS } from "./utils";
import { HeaderCocina } from "./components/HeaderCocina";
import { TarjetaOrdenCocina } from "./components/TarjetaOrdenCocina";

export default function CocinaPage() {
  const chefName = "Chef Isabelle";
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  const toggleItemCompletion = (orderId: string, itemId: number) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          items: order.items.map(item =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          )
        };
      }
      return order;
    }));
  };

  const markOrderServed = (orderId: string) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: "served" } : order
    ));
  };

  const activeOrders = orders.filter(o => o.status === "pending");

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-stone-100 font-sans flex flex-col">
      <HeaderCocina chefName={chefName} activeOrdersCount={activeOrders.length} />

      {/* Orders Grid */}
      <main className="flex-1 p-3 lg:p-6 overflow-x-auto">
        <div className="flex gap-3 lg:gap-6 h-full items-start">
          <AnimatePresence>
            {activeOrders.length === 0 ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-stone-500">
                <CheckCircle className="w-12 lg:w-16 mb-4 text-stone-800" />
                <p className="text-lg lg:text-xl font-serif">No hay comandas</p>
                <p className="text-sm">Buen trabajo, Chef.</p>
              </div>
            ) : (
              activeOrders.map((order) => (
                <TarjetaOrdenCocina
                  key={order.id}
                  order={order}
                  toggleItemCompletion={toggleItemCompletion}
                  markOrderServed={markOrderServed}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}