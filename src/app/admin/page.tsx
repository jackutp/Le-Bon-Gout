// src/app/admin/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, LayoutDashboard, Package, Users, BookOpen, Calendar, Truck, AlertTriangle, X } from "lucide-react";
import Link from "next/link";

// Componentes
import { DashboardView } from "./components/DashboardView";
import { InventoryView } from "./components/InventoryView";
import { StaffView } from "./components/StaffView";
import { MenuView } from "./components/MenuView";
import { ReservationsView } from "./components/ReservationsView";
import { SuppliersView } from "./components/SuppliersView";
import { WasteView } from "./components/WasteView";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const adminName = "Admin Principal";

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardView />;
      case "inventario":
        return <InventoryView />;
      case "personal":
        return <StaffView />;
      case "carta":
        return <MenuView />;
      case "reservas":
        return <ReservationsView />;
      case "proveedores":
        return <SuppliersView />;
      case "mermas":
        return <WasteView />;
      default:
        return <DashboardView />;
    }
  };

  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Métricas" },
    { id: "inventario", icon: Package, label: "Inventario" },
    { id: "personal", icon: Users, label: "Personal" },
    { id: "carta", icon: BookOpen, label: "Editor Carta" },
    { id: "reservas", icon: Calendar, label: "Reservas" },
    { id: "proveedores", icon: Truck, label: "Proveedores" },
    { id: "mermas", icon: AlertTriangle, label: "Mermas" },
  ];

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-stone-100 font-sans flex">
      {/* Botón Mobile Menu */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#121214] border border-stone-800 rounded"
      >
        <LayoutDashboard className="w-6 h-6 text-[#C6A96B]" />
      </button>

      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-64 bg-[#121214] border-r border-stone-800 flex-col h-screen fixed left-0 top-0">
        <div className="p-6 border-b border-stone-800">
          <h2 className="text-xl font-serif text-[#C6A96B] uppercase tracking-widest">
            Le Bon Gout
          </h2>
          <p className="text-xs text-stone-500 mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 lg:py-3 rounded text-sm uppercase tracking-widest transition-colors ${activeTab === item.id
                  ? "bg-[#C6A96B]/10 text-[#C6A96B] border border-[#C6A96B]/30"
                  : "text-stone-400 hover:text-white hover:bg-stone-900"
                }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-stone-800">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm text-stone-400 hover:text-white uppercase tracking-widest transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </Link>
        </div>
      </aside>

      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/80"
          onClick={() => setSidebarOpen(false)}
        >
          <aside
            className="w-64 bg-[#121214] border-r border-stone-800 flex flex-col h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-stone-800 flex justify-between items-center">
              <h2 className="text-xl font-serif text-[#C6A96B] uppercase tracking-widest">
                Le Bon Gout
              </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm uppercase tracking-widest transition-colors ${activeTab === item.id
                      ? "bg-[#C6A96B]/10 text-[#C6A96B] border border-[#C6A96B]/30"
                      : "text-stone-400 hover:text-white hover:bg-stone-900"
                    }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="p-4 border-t border-stone-800">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm text-stone-400 hover:text-white uppercase tracking-widest transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 h-screen overflow-y-auto bg-[#0B0B0C]">
        <header className="flex justify-between items-center p-4 lg:p-8">
          <h1 className="text-xl lg:text-2xl font-serif text-white uppercase tracking-widest ml-12 lg:ml-0">
            {navItems.find((item) => item.id === activeTab)?.label || activeTab}
          </h1>
          <p className="text-sm text-stone-400 hidden sm:block">
            Bienvenido, {adminName}
          </p>
        </header>
        <div className="px-4 lg:px-8 pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}