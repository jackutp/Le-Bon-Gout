//src/app/cocina/components/ItemOrdenCocina.tsx
import { CheckCircle } from "lucide-react";
import { OrderItem } from "../types";

interface Props {
  item: OrderItem;
  orderId: string;
  toggleItemCompletion: (orderId: string, itemId: number) => void;
}

export function ItemOrdenCocina({ item, orderId, toggleItemCompletion }: Props) {
  return (
    <div
      onClick={() => toggleItemCompletion(orderId, item.id)}
      className={`flex items-start gap-2 lg:gap-4 p-2 lg:p-3 rounded cursor-pointer transition-all border ${item.completed
        ? "bg-[#C6A96B]/10 border-[#C6A96B]/30 opacity-60"
        : "bg-[#0B0B0C] border-stone-800 hover:border-stone-600"
        }`}
    >
      <div
        className={`mt-0.5 lg:mt-1 w-4 lg:w-5 h-4 lg:h-5 rounded border flex items-center justify-center shrink-0 ${item.completed ? "bg-[#C6A96B] border-[#C6A96B] text-black" : "border-stone-600"
          }`}
      >
        {item.completed && <CheckCircle className="w-3 lg:w-4 h-3 lg:h-4" />}
      </div>
      <div className="flex-1">
        <p
          className={`font-medium text-sm lg:text-base ${item.completed ? "line-through text-stone-400" : "text-stone-200"
            }`}
        >
          <span className="text-[#C6A96B] mr-1 lg:mr-2">{item.qty}x</span>
          {item.name}
        </p>
        {item.notes && (
          <p className="text-xs text-amber-500 mt-1 italic">Nota: {item.notes}</p>
        )}
      </div>
    </div>
  );
}
