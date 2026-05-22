// src/app/mesero/components/layout/SidebarIzquierdo.tsx

import { LogOut, Package, LayoutGrid, Calendar } from "lucide-react";
import Link from "next/link";
import { ViewType } from "../../types";

interface Props {
  currentView: ViewType;
  setCurrentView: (v: ViewType) => void;
  onLogout?: () => void;
}

export function SidebarIzquierdo({
  currentView,
  setCurrentView,
  onLogout,
}: Props) {
  return (
    <div className="col-span-2 bg-[#121214] border-r border-stone-800 flex flex-col h-screen sticky top-0 overflow-y-auto">
      <div className="p-4 border-b border-stone-800">
        <h2 className="text-lg font-serif text-[#C6A96B] uppercase tracking-widest">Le Bon Gout</h2>
        <p className="text-xs text-stone-500 mt-1">Panel Mesero</p>
      </div>

      <nav className="flex-1 p-3 space-y-2">
        <button
          onClick={() => setCurrentView("productos")}
          className={`w-full flex items-center gap-2 px-3 py-2.5 rounded text-sm uppercase tracking-widest transition-colors ${currentView === "productos"
            ? "bg-[#C6A96B]/10 text-[#C6A96B] border border-[#C6A96B]/30"
            : "text-stone-400 hover:text-white hover:bg-stone-900 border border-transparent"
            }`}
        >
          <Package className="w-4 h-4" />
          <span className="text-xs">Productos</span>
        </button>

        <button
          onClick={() => setCurrentView("estados")}
          className={`w-full flex items-center gap-2 px-3 py-2.5 rounded text-sm uppercase tracking-widest transition-colors ${currentView === "estados"
            ? "bg-[#C6A96B]/10 text-[#C6A96B] border border-[#C6A96B]/30"
            : "text-stone-400 hover:text-white hover:bg-stone-900 border border-transparent"
            }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span className="text-xs">Estados de Mesa</span>
        </button>

        {/* ← NUEVO BOTÓN: Reservas */}
        <button
          onClick={() => setCurrentView("reservas")}
          className={`w-full flex items-center gap-2 px-3 py-2.5 rounded text-sm uppercase tracking-widest transition-colors ${currentView === "reservas"
            ? "bg-[#C6A96B]/10 text-[#C6A96B] border border-[#C6A96B]/30"
            : "text-stone-400 hover:text-white hover:bg-stone-900 border border-transparent"
            }`}
        >
          <Calendar className="w-4 h-4" />
          <span className="text-xs">Reservas</span>
        </button>
      </nav>

      <div className="p-3 border-t border-stone-800">
        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs text-stone-400 hover:text-white uppercase tracking-widest transition-colors"
        >
          <LogOut className="w-3 h-3" />
          Cerrar Sesion
        </button>
      </div>
    </div>
  );
}