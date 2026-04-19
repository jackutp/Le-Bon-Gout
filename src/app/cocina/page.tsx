"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, ChefHat, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

// Mock Data for Kitchen Display System (KDS)
type OrderItem = {
  id: number;
  name: string;
  qty: number;
  notes?: string;
  completed: boolean;
};

type Order = {
  id: string;
  table: number;
  time: string;
  items: OrderItem[];
  status: "pending" | "served";
};

const INITIAL_ORDERS: Order[] = [
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
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 lg:p-6 border-b border-stone-800 bg-[#121214] shadow-md z-10 gap-4">
        <div className="flex items-center gap-3 lg:gap-4">
          <ChefHat className="w-6 lg:w-8 h-6 lg:h-8 text-[#C6A96B]" />
          <div>
            <h1 className="text-lg lg:text-xl font-serif text-white tracking-widest uppercase">Cocina - KDS</h1>
            <p className="text-sm text-[#C6A96B]">{chefName}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 lg:gap-6 text-sm uppercase tracking-widest text-stone-400">
          <span className="bg-[#C6A96B]/20 px-3 py-1 rounded-full text-[#C6A96B]">{activeOrders.length} Comandas</span>
          <Link href="/login" className="flex items-center gap-2 hover:text-white transition-colors p-2">
            <LogOut className="w-5 h-5" />
            <span className="hidden lg:inline">Salir</span>
          </Link>
        </div>
      </header>

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
              activeOrders.map((order) => {
                const isAllCompleted = order.items.every(item => item.completed);
                
                return (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="min-w-[280px] sm:min-w-[320px] lg:min-w-[350px] w-[280px] sm:w-[320px] lg:w-[350px] bg-[#121214] border border-stone-800 shadow-xl rounded-lg overflow-hidden flex flex-col max-h-full"
                  >
                    {/* Order Header */}
                    <div className={`p-3 lg:p-4 border-b border-stone-800 flex justify-between items-center ${isAllCompleted ? 'bg-[#C6A96B]/10' : 'bg-black/40'}`}>
                      <div>
                        <h2 className="text-xl lg:text-2xl font-serif text-[#C6A96B]">Mesa {order.table}</h2>
                        <p className="text-xs text-stone-500 uppercase tracking-widest">{order.id}</p>
                      </div>
                      <div className="flex items-center gap-2 text-stone-400 bg-black/50 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm">
                        <Clock className="w-3 lg:w-4 h-3 lg:h-4" />
                        {order.time}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-2 lg:space-y-3">
                      {order.items.map((item) => (
                        <div 
                          key={item.id}
                          onClick={() => toggleItemCompletion(order.id, item.id)}
                          className={`flex items-start gap-2 lg:gap-4 p-2 lg:p-3 rounded cursor-pointer transition-all border ${
                            item.completed 
                              ? 'bg-[#C6A96B]/10 border-[#C6A96B]/30 opacity-60' 
                              : 'bg-[#0B0B0C] border-stone-800 hover:border-stone-600'
                          }`}
                        >
                          <div className={`mt-0.5 lg:mt-1 w-4 lg:w-5 h-4 lg:h-5 rounded border flex items-center justify-center shrink-0 ${
                            item.completed ? 'bg-[#C6A96B] border-[#C6A96B] text-black' : 'border-stone-600'
                          }`}>
                            {item.completed && <CheckCircle className="w-3 lg:w-4 h-3 lg:h-4" />}
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium text-sm lg:text-base ${item.completed ? 'line-through text-stone-400' : 'text-stone-200'}`}>
                              <span className="text-[#C6A96B] mr-1 lg:mr-2">{item.qty}x</span> 
                              {item.name}
                            </p>
                            {item.notes && (
                              <p className="text-xs text-amber-500 mt-1 italic">Nota: {item.notes}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Footer */}
                    <div className="p-3 lg:p-4 border-t border-stone-800 bg-black/40">
                      <button
                        onClick={() => markOrderServed(order.id)}
                        disabled={!isAllCompleted}
                        className="w-full py-2 lg:py-3 rounded uppercase tracking-widest text-xs lg:text-sm font-medium transition-all disabled:opacity-30 disabled:bg-stone-800 disabled:text-stone-500 bg-[#C6A96B] text-black hover:bg-white flex justify-center items-center gap-2"
                      >
                        {isAllCompleted ? <CheckCircle className="w-4 lg:w-5 h-4 lg:h-5" /> : null}
                        {isAllCompleted ? 'Servir Mesa' : 'Preparando...'}
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
