//src/app/mesero/components/orden/ItemOrden.tsx
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { OrderItemState } from "../../types";

interface Props {
  item: OrderItemState & { name: string; price: number; inStock: number };
  removeFromOrder: (id: number) => void;
  addToOrder: (id: number) => void;
}

export function ItemOrden({ item, removeFromOrder, addToOrder }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex justify-between items-center border-b border-stone-800 pb-2"
    >
      <div className="flex-1">
        <h4 className="text-xs font-medium">{item.name}</h4>
        <p className="text-xs text-[#C6A96B]">
          S/ {item.price.toFixed(2)} x {item.qty}
        </p>
      </div>
      <div className="flex items-center gap-1 ml-2">
        <button
          onClick={() => removeFromOrder(item.id)}
          className="p-1 bg-stone-800 hover:bg-stone-700 rounded text-stone-300"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="w-4 text-center text-xs">{item.qty}</span>
        <button
          onClick={() => addToOrder(item.id)}
          disabled={item.qty >= item.inStock}
          className="p-1 bg-stone-800 hover:bg-stone-700 disabled:opacity-50 rounded text-stone-300"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </motion.div>
  );
}
