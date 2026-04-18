"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
          className="hidden md:flex gap-8 text-sm tracking-widest uppercase"
        >
          <Link href="/#nosotros" className="hover:text-amber-500 transition-colors">Nosotros</Link>
          <Link href="/#menu" className="hover:text-amber-500 transition-colors">Carta</Link>
          <Link href="/eventos" className="hover:text-amber-500 transition-colors">Eventos</Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            href="/reservas"
            className="border border-amber-500 text-amber-500 px-6 py-2 text-sm uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-colors inline-block"
          >
            RESERVAS
          </Link>
        </motion.div>
      </div>
    </nav>
  );
}
