// src/components/Navbar.tsx

"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ChevronDown, ClipboardList, LogOut, User } from "lucide-react";
import { ConfirmModal } from "./ConfirmModal";

// ─── UserDropdown ─────────────────────────────────────────────────────────────

interface UserDropdownProps {
  name: string;
  onLogout: () => void;
  mobile?: boolean;
}

function UserDropdown({ name, onLogout, mobile = false }: UserDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        id="btn-user-menu"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-2 transition-colors ${
          open ? "text-amber-500" : "text-stone-400 hover:text-amber-500"
        }`}
        aria-haspopup="true"
        aria-expanded={open}
      >
        {mobile ? (
          <User className="w-4 h-4" />
        ) : (
          <>
            <User className="w-3 h-3" />
            <span className="text-xs normal-case tracking-wide">{name}</span>
            <ChevronDown
              className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            />
          </>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.18 }}
          className="absolute right-0 top-full mt-3 w-52 bg-[#121214] border border-stone-800 rounded shadow-2xl shadow-black/60 overflow-hidden z-50"
        >
          {/* User label */}
          <div className="px-4 py-3 border-b border-stone-800">
            <p className="text-xs uppercase tracking-widest text-stone-500">Sesión activa</p>
            <p className="text-sm text-white font-medium mt-0.5 truncate">{name}</p>
          </div>

          {/* Mi Perfil */}
          <Link
            href="/usuario"
            id="dropdown-perfil"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm text-stone-300 hover:bg-white/[0.04] hover:text-amber-500 transition-colors"
          >
            <User className="w-4 h-4 shrink-0" />
            Mi Perfil
          </Link>

          {/* Solicitudes */}
          <Link
            href="/usuario?tab=solicitudes"
            id="dropdown-solicitudes"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm text-stone-300 hover:bg-white/[0.04] hover:text-amber-500 transition-colors"
          >
            <ClipboardList className="w-4 h-4 shrink-0" />
            Solicitudes
          </Link>

          {/* Separator + Logout */}
          <div className="border-t border-stone-800">
            <button
              id="dropdown-logout"
              onClick={() => { setOpen(false); onLogout(); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-stone-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              Cerrar Sesión
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowConfirmModal(false);
  };

  return (
    <>
      <nav className={`fixed w-full z-50 px-6 py-6 transition-all duration-300 ${scrolled ? "bg-black/95 backdrop-blur shadow-lg shadow-black/50 py-4" : "bg-gradient-to-b from-black/80 to-transparent"}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/" className="text-2xl font-serif tracking-widest uppercase text-amber-500">
              Le Bon Goût
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex gap-8 text-sm tracking-widest uppercase items-center"
          >
            <Link href="/#nosotros" className="hover:text-amber-500 transition-colors">Nosotros</Link>
            <Link href="/#menu" className="hover:text-amber-500 transition-colors">Carta</Link>
            <Link href="/eventos" className="hover:text-amber-500 transition-colors">Eventos</Link>

            <Link
              href="/reservas"
              className="border border-amber-500 text-amber-500 px-6 py-2 text-sm uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-colors inline-block"
            >
              RESERVAS
            </Link>

            {/* Dropdown de usuario autenticado */}
            {isAuthenticated && (
              <UserDropdown name={user?.nombre ?? ""} onLogout={() => setShowConfirmModal(true)} />
            )}
          </motion.div>

          {/* Versión móvil */}
          <div className="md:hidden flex items-center gap-4">
            <Link
              href="/reservas"
              className="border border-amber-500 text-amber-500 px-3 py-1.5 text-xs uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-colors inline-block"
            >
              RESERVAS
            </Link>
            {isAuthenticated && (
              <UserDropdown name={user?.nombre ?? ""} onLogout={() => setShowConfirmModal(true)} mobile />
            )}
          </div>
        </div>
      </nav>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleLogout}
        title="Cerrar Sesión"
        message="¿Estás seguro de que deseas cerrar sesión?"
        confirmText="Sí, cerrar sesión"
        cancelText="Cancelar"
      />
    </>
  );
}