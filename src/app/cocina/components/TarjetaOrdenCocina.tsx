// src/app/cocina/components/TarjetaOrdenCocina.tsx

import { motion } from "framer-motion";
import { CheckCircle, Clock, Eye } from "lucide-react";
import { Order, OrderItem } from "../types";
import { ItemOrdenCocina } from "./ItemOrdenCocina";

interface Props {
  order: Order;
  toggleItemCompletion: (orderId: string, itemId: number) => void;
  markOrderServed: (orderId: string) => void;
  onViewDetails?: (order: Order) => void;
}

export function TarjetaOrdenCocina({
  order,
  toggleItemCompletion,
  markOrderServed,
  onViewDetails
}: Props) {
  const isAllCompleted = order.items.every((item) => item.completed);
  const completedCount = order.items.filter(i => i.completed).length;
  const totalCount = order.items.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.3 }}
      className="min-w-[280px] sm:min-w-[320px] lg:min-w-[350px] w-[280px] sm:w-[320px] lg:w-[350px] bg-[#121214] border border-stone-800 shadow-xl rounded-lg overflow-hidden flex flex-col max-h-full"
    >
      {/* Order Header */}
      <div
        className={`p-3 lg:p-4 border-b border-stone-800 flex justify-between items-center ${isAllCompleted ? "bg-[#C6A96B]/10" : "bg-black/40"
          }`}
      >
        <div>
          <h2 className="text-xl lg:text-2xl font-serif text-[#C6A96B]">Mesa {order.table}</h2>
          <p className="text-xs text-stone-500 uppercase tracking-widest">{order.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-stone-400 bg-black/50 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm">
            <Clock className="w-3 lg:w-4 h-3 lg:h-4" />
            {order.time}
          </div>
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(order)}
              className="p-1.5 bg-black/50 hover:bg-stone-800 rounded-full transition-colors"
              title="Ver detalles"
            >
              <Eye className="w-4 h-4 text-stone-400" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-3 lg:px-4 pt-3">
        <div className="flex justify-between text-xs text-stone-400 mb-1">
          <span>Progreso</span>
          <span>{completedCount}/{totalCount}</span>
        </div>
        <div className="h-1.5 bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C6A96B] transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Order Items */}
      <div className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-2 lg:space-y-3">
        {order.items.map((item) => (
          <ItemOrdenCocina
            key={item.id}
            item={item}
            orderId={order.id}
            toggleItemCompletion={toggleItemCompletion}
          />
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
          {isAllCompleted ? "Servir Mesa" : "Preparando..."}
        </button>
      </div>
    </motion.div>
  );
}