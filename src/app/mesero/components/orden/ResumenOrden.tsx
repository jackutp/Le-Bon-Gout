// src/app/mesero/components/orden/ResumenOrden.tsx

import { ShoppingCart, Minus, Plus } from "lucide-react";

// Tipo flexible que acepta tanto inglés como español
interface OrderItemDisplay {
  id: number;
  // Español
  nombre?: string;
  precio?: number;
  // Inglés
  name?: string;
  price?: number;
  qty: number;
}

interface Props {
  orderItems: OrderItemDisplay[];
  total: number;
  removeFromOrder: (id: number) => void;
  addToOrder: (id: number) => void;
  setShowModal: (show: boolean) => void;
}

export function ResumenOrden({
  orderItems,
  total,
  removeFromOrder,
  addToOrder,
  setShowModal,
}: Props) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-stone-800">
        <h3 className="font-serif text-[#C6A96B] uppercase tracking-widest text-sm flex items-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          Orden Actual
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {orderItems.length === 0 ? (
          <p className="text-stone-500 text-sm text-center py-8">No hay productos agregados</p>
        ) : (
          orderItems.map((item) => {
            // Obtener nombre y precio en inglés o español
            const displayName = item.nombre || item.name || "";
            const displayPrice = item.precio ?? item.price ?? 0;

            return (
              <div key={item.id} className="bg-[#121214] p-3 rounded border border-stone-800">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm font-medium text-white">{displayName}</p>
                    <p className="text-xs text-stone-400">S/ {displayPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromOrder(item.id)}
                      className="p-1 hover:bg-stone-800 rounded transition-colors"
                    >
                      <Minus className="w-3 h-3 text-stone-400" />
                    </button>
                    <span className="text-sm text-white w-6 text-center">{item.qty}</span>
                    <button
                      onClick={() => addToOrder(item.id)}
                      className="p-1 hover:bg-stone-800 rounded transition-colors"
                    >
                      <Plus className="w-3 h-3 text-stone-400" />
                    </button>
                  </div>
                </div>
                {/* Mostrar subtotal del item */}
                <div className="text-right text-xs text-[#C6A96B]">
                  Subtotal: S/ {(displayPrice * item.qty).toFixed(2)}
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="p-4 border-t border-stone-800 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-stone-400">Total:</span>
          <span className="font-serif text-[#C6A96B]">S/ {total.toFixed(2)}</span>
        </div>
        <button
          onClick={() => setShowModal(true)}
          disabled={orderItems.length === 0}
          className="w-full bg-[#C6A96B] text-black py-2 rounded text-sm uppercase tracking-widest font-semibold hover:bg-[#B8955A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirmar Pedido
        </button>
      </div>
    </div>
  );
}