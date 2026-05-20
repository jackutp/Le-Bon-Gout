import { AnimatePresence } from "framer-motion";
import { Send, ShoppingBag } from "lucide-react";
import { OrderItemState } from "../../types";
import { ItemOrden } from "./ItemOrden";

interface Props {
  selectedTable: string;
  orderItems: (OrderItemState & { name: string; price: number; inStock: number })[];
  total: number;
  removeFromOrder: (id: number) => void;
  addToOrder: (id: number) => void;
  setShowModal: (show: boolean) => void;
}

export function ResumenOrden({
  selectedTable,
  orderItems,
  total,
  removeFromOrder,
  addToOrder,
  setShowModal,
}: Props) {
  return (
    <>
      <div className="p-4 border-b border-stone-800 bg-black/20">
        <h2 className="text-lg font-serif text-[#C6A96B] flex items-center gap-2">
          <ShoppingBag className="w-4 h-4" />
          Mesa {selectedTable}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {orderItems.length === 0 ? (
          <div className="h-full flex items-center justify-center text-stone-500 text-xs italic text-center">
            No hay productos seleccionados.
          </div>
        ) : (
          <AnimatePresence>
            {orderItems.map((item) => (
              <ItemOrden
                key={item.id}
                item={item}
                removeFromOrder={removeFromOrder}
                addToOrder={addToOrder}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      <div className="p-4 border-t border-stone-800 bg-black/20">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs text-stone-400 uppercase tracking-widest">Total</span>
          <span className="text-xl font-serif text-[#C6A96B]">S/ {total.toFixed(2)}</span>
        </div>
        <button
          onClick={() => setShowModal(true)}
          disabled={orderItems.length === 0}
          className="w-full bg-[#C6A96B] hover:bg-white text-black font-medium uppercase tracking-widest text-xs py-3 transition-colors disabled:opacity-50 disabled:hover:bg-[#C6A96B] flex justify-center items-center gap-1.5"
        >
          <Send className="w-3 h-3" />
          Enviar a Cocina
        </button>
      </div>
    </>
  );
}
