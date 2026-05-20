import { LogOut, Package, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { ViewType } from "../../types";

interface Props {
  currentView: ViewType;
  setCurrentView: (v: ViewType) => void;
  selectedTable: string;
  setSelectedTable: (v: string) => void;
}

export function SidebarIzquierdo({
  currentView,
  setCurrentView,
  selectedTable,
  setSelectedTable,
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
      </nav>

      <div className="p-3 border-t border-stone-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-stone-400 uppercase tracking-widest">mesa:</span>
          <select
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            className="bg-[#0B0B0C] border border-stone-800 text-white px-2 py-1 text-sm w-20"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs text-stone-400 hover:text-white uppercase tracking-widest transition-colors"
        >
          <LogOut className="w-3 h-3" />
          Cerrar Sesion
        </Link>
      </div>
    </div>
  );
}