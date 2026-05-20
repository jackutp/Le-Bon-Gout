// src/app/mesero/components/modales/ModalConfirmacion.tsx

import { X, Loader2 } from "lucide-react";

interface OrderItemDisplay {
  id: number;
  nombre?: string;
  precio?: number;
  name?: string;
  price?: number;
  qty: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  orderItems: OrderItemDisplay[];
  total: number;
  handleConfirm: () => void;
  isLoading?: boolean;
}

export function ModalConfirmacion({
  isOpen,
  onClose,
  orderItems,
  total,
  handleConfirm,
  isLoading = false,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black/80" onClick={onClose} />

        <div className="relative bg-[#121214] rounded-lg w-full max-w-md p-6 border border-stone-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-white"
            disabled={isLoading}
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-xl font-serif text-[#C6A96B] mb-4">Confirmar Pedido</h3>

          <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
            {orderItems.map((item) => {
              const displayName = item.nombre || item.name || "";
              const displayPrice = item.precio ?? item.price ?? 0;

              return (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{displayName} x{item.qty}</span>
                  <span className="text-[#C6A96B]">S/ {(displayPrice * item.qty).toFixed(2)}</span>
                </div>
              );
            })}
          </div>

          <div className="border-t border-stone-800 pt-3 mb-6">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="text-[#C6A96B]">S/ {total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            disabled={isLoading || orderItems.length === 0}
            className="w-full bg-[#C6A96B] text-black py-2 rounded text-sm uppercase tracking-widest font-semibold hover:bg-[#B8955A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLoading ? "Enviando..." : "Confirmar y Enviar a Cocina"}
          </button>
        </div>
      </div>
    </div>
  );
}