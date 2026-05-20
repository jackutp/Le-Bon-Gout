import { X } from "lucide-react";
import { ModalWrapper } from "./ModalWrapper";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedTable: string;
  orderItems: OrderItem[];
  total: number;
  handleConfirm: () => void;
}

export function ModalConfirmacion({
  isOpen,
  onClose,
  selectedTable,
  orderItems,
  total,
  handleConfirm,
}: Props) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} maxWidth="md">
      <button onClick={onClose} className="absolute top-3 right-3 text-stone-500 hover:text-white">
        <X className="w-4 h-4" />
      </button>
      <h2 className="text-xl font-serif text-[#C6A96B] mb-1">Resumen de Orden</h2>
      <p className="text-stone-400 text-xs mb-4 uppercase tracking-widest">Mesa {selectedTable}</p>
      <div className="space-y-2 mb-4 max-h-40 overflow-y-auto pr-2">
        {orderItems.map((item) => (
          <div key={item.id} className="flex justify-between text-xs">
            <span>
              <span className="text-[#C6A96B] mr-1">{item.qty}x</span> {item.name}
            </span>
            <span className="text-stone-400">S/ {(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-stone-800 pt-3 flex justify-between items-center mb-6">
        <span className="font-serif text-sm">Total Final</span>
        <span className="font-serif text-lg text-[#C6A96B]">S/ {total.toFixed(2)}</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onClose}
          className="flex-1 border border-stone-800 text-stone-400 uppercase tracking-widest text-xs py-2 hover:text-white transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleConfirm}
          className="flex-1 bg-[#C6A96B] text-black uppercase tracking-widest text-xs py-2 hover:bg-white transition-colors"
        >
          Confirmar
        </button>
      </div>
    </ModalWrapper>
  );
}