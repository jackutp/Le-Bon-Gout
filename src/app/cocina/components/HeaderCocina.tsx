// src/app/cocina/components/HeaderCocina.tsx

import { ChefHat, LogOut, History } from "lucide-react";
import Link from "next/link";

interface Props {
  chefName: string;
  activeOrdersCount: number;
  completedOrdersCount?: number;
  onViewHistory?: () => void;
  // ❌ Eliminar onClearHistory
}

export function HeaderCocina({
  chefName,
  activeOrdersCount,
  completedOrdersCount = 0,
  onViewHistory,
  // ❌ Eliminar onClearHistory
}: Props) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 lg:p-6 border-b border-stone-800 bg-[#121214] shadow-md z-10 gap-4">
      <div className="flex items-center gap-3 lg:gap-4">
        <ChefHat className="w-6 lg:w-8 h-6 lg:h-8 text-[#C6A96B]" />
        <div>
          <h1 className="text-lg lg:text-xl font-serif text-white tracking-widest uppercase">Cocina - KDS</h1>
          <p className="text-sm text-[#C6A96B]">{chefName}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 lg:gap-6 text-sm uppercase tracking-widest text-stone-400">
        <button
          onClick={onViewHistory}
          className="flex items-center gap-2 hover:text-white transition-colors px-3 py-1 rounded bg-[#C6A96B]/10"
        >
          <History className="w-4 h-4" />
          <span className="hidden sm:inline">Historial</span>
          <span className="bg-[#C6A96B]/20 px-1.5 py-0.5 rounded text-xs">
            {completedOrdersCount}
          </span>
        </button>
        <span className="bg-[#C6A96B]/20 px-3 py-1 rounded-full text-[#C6A96B] text-xs sm:text-sm">
          {activeOrdersCount} Comandas
        </span>
        <Link href="/login" className="flex items-center gap-2 hover:text-white transition-colors p-2">
          <LogOut className="w-5 h-5" />
          <span className="hidden lg:inline">Salir</span>
        </Link>
      </div>
    </header>
  );
}