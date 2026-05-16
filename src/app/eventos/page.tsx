"use client";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";
import EspaciosSection from "./components/EspaciosSection";
import CotizacionForm from "./components/CotizacionForm";
import Footer from "./components/Footer";

export default function EventosPage() {
  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen font-sans selection:bg-amber-700 selection:text-white">
      <Navbar />

      {/* Hero - mantener igual */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=2000"
            alt="Eventos"
            fill
            className="object-cover scale-105"
            priority
          />
        </div>
      </section>
      <EspaciosSection />
      <CotizacionForm />
      <Footer />
    </div>
  );
}
