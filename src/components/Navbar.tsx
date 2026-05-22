// src/components/Navbar.tsx

"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User } from "lucide-react";
import { ConfirmModal } from "./ConfirmModal";

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

            {isAuthenticated ? (
              <>
                <span className="text-stone-400 text-xs">
                  <User className="w-3 h-3 inline mr-1" />
                  {user?.nombre}
                </span>
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="flex items-center gap-2 text-stone-400 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Salir
                </button>
              </>
            ) : (
              <Link
                href="/reservas"
                className="border border-amber-500 text-amber-500 px-6 py-2 text-sm uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-colors inline-block"
              >
                RESERVAS
              </Link>
            )}
          </motion.div>

          {/* Versión móvil */}
          <div className="md:hidden flex items-center gap-4">
            {isAuthenticated ? (
              <button
                onClick={() => setShowConfirmModal(true)}
                className="text-stone-400 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            ) : (
              <Link
                href="/reservas"
                className="border border-amber-500 text-amber-500 px-4 py-2 text-xs uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-colors inline-block"
              >
                RESERVAS
              </Link>
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