"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin, Phone, Clock, X, Upload, FileText } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import { useOrders } from "@/context/OrderContext";

export default function Home() {
  const { menuItems } = useOrders();
  const [showMenu, setShowMenu] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showReclamosModal, setShowReclamosModal] = useState(false);
  const [joinForm, setJoinForm] = useState({ name: "", email: "", position: "Mesero", cv: null as File | null });

  const displayItems = showMenu ? menuItems : menuItems.slice(0, 3);

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Solicitud enviada correctamente. Nos contactaremos pronto.");
    setShowJoinModal(false);
    setJoinForm({ name: "", email: "", position: "Mesero", cv: null });
  };

  const handleCVUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.doc,.docx";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) setJoinForm({ ...joinForm, cv: file });
    };
    input.click();
  };

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen font-sans selection:bg-amber-700 selection:text-white">
      <Navbar />

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <Image src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=2000" alt="Restaurant" fill className="object-cover scale-105" priority />
        </div>
        <div className="relative z-20 text-center px-4 flex flex-col items-center">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="text-amber-500 tracking-[0.3em] uppercase text-sm mb-6">
            Excelente Experiencia Culinaria
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7 }} className="text-6xl md:text-8xl font-serif mb-8 max-w-4xl leading-tight">
            L'Art de la<br />Gastronomie
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}>
            <ChevronDown className="w-8 h-8 text-amber-500 animate-bounce mt-12" />
          </motion.div>
        </div>
      </section>

      <section id="nosotros" className="py-32 px-6 bg-stone-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }}>
            <h2 className="text-amber-500 tracking-[0.2em] uppercase text-sm mb-4">Nuestra Filosofia</h2>
            <h3 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Una sinfonia de<br />sabores</h3>
            <p className="text-stone-400 leading-relaxed mb-8 text-lg">
              En Le Bon Gout creemos que cenar es una forma de arte. Cada plato esta elaborado con pasion, precision y los mejores ingredientes de temporada.
            </p>
            <div className="flex flex-col md:flex-row gap-6 mt-4">
              <button onClick={() => setShowJoinModal(true)} className="border-b border-amber-500 text-amber-500 pb-1 uppercase tracking-widest text-sm hover:text-white hover:border-white transition-colors">
                ¿Quieres formar parte de nosotros?
              </button>
              <Link href="/login" className="border-b border-amber-500 text-amber-500 pb-1 uppercase tracking-widest text-sm hover:text-white hover:border-white transition-colors">
                ¿Ya formas parte de nosotros?
              </Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }} className="relative h-[600px] w-full">
            <Image src="https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=1000" alt="Culinary" fill className="object-cover" />
          </motion.div>
        </div>
      </section>

      <section id="menu" className="py-32 px-6 bg-stone-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-amber-500 tracking-[0.2em] uppercase text-sm mb-4">Menu</h2>
            <h3 className="text-4xl md:text-5xl font-serif">Creaciones Exclusivas</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {displayItems.map((dish, i) => (
              <motion.div key={dish.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: i * 0.2 }} className="group cursor-pointer">
                <div className="relative h-96 w-full mb-6 overflow-hidden">
                  <Image src={dish.img} alt={dish.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <h4 className="text-2xl font-serif mb-2">{dish.name}</h4>
                <p className="text-stone-400">{dish.desc}</p>
                <p className="text-amber-500 mt-2">S/ {dish.price.toFixed(2)}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button onClick={() => setShowMenu(!showMenu)} className="border border-amber-500 text-amber-500 px-8 py-3 uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-colors">
              {showMenu ? "Ver Menos" : "Ver Menu Completo"}
            </button>
          </div>
        </div>
      </section>

      <section id="eventos" className="py-32 px-6 bg-stone-950">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-amber-500 tracking-[0.2em] uppercase text-sm mb-4">Celebraciones</h2>
          <h3 className="text-4xl md:text-5xl font-serif mb-8">Eventos Inolvidables</h3>
          <p className="text-stone-400 max-w-2xl mx-auto mb-12 text-lg">
            Descubra nuestros exclusivos espacios diseñados para hacer de sus eventos privados y corporativos una experiencia verdaderamente memorable.
          </p>
          <Link href="/eventos" className="border-b border-amber-500 text-amber-500 pb-1 uppercase tracking-widest text-sm hover:text-white hover:border-white transition-colors">
            Saber mas sobre eventos
          </Link>
        </div>
      </section>

      <footer className="bg-black pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 mb-20 border-b border-stone-800 pb-20">
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-2xl font-serif text-amber-500 mb-8">Le Bon Gout</h4>
            <div className="flex items-start gap-4 mb-4 text-stone-400">
              <MapPin className="w-5 h-5 text-amber-500 mt-1" />
              <p>Av. Javier Prado 1234<br />Lima, Peru</p>
            </div>
            <div className="flex items-center gap-4 mb-4 text-stone-400">
              <Phone className="w-5 h-5 text-amber-500" />
              <p>+51 963 168 458</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="text-xl font-serif mb-8 uppercase tracking-widest">Horarios</h4>
            <div className="flex items-start gap-4 text-stone-400 text-center">
              <Clock className="w-5 h-5 text-amber-500 mt-1" />
              <div>
                <p className="mb-2">Martes - Domingo</p>
                <p>Cena: 6:00pm - 11:00pm</p>
                <p className="mt-4 text-sm">Cerrado los Lunes</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="text-xl font-serif mb-8 uppercase tracking-widest">Redes Sociales</h4>
            <div className="flex flex-col gap-3">
              <a href="https://www.instagram.com/" target="_blank" className="text-stone-400 hover:text-amber-500 transition-colors text-sm uppercase tracking-widest">
                Instagram
              </a>
              <a href="https://www.facebook.com/" target="_blank" className="text-stone-400 hover:text-amber-500 transition-colors text-sm uppercase tracking-widest">
                Facebook
              </a>
              <a href="http://x.com/" target="_blank" className="text-stone-400 hover:text-amber-500 transition-colors text-sm uppercase tracking-widest">
                X (Twitter)
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-xl font-serif mb-8 uppercase tracking-widest">Libro de Reclamaciones</h4>
            <button onClick={() => setShowReclamosModal(true)} className="flex items-center gap-2 text-stone-400 hover:text-amber-500 transition-colors text-sm uppercase tracking-widest">
              <FileText className="w-5 h-5" />
              Registrar Reclamo
            </button>
          </div>
        </div>

        <div className="text-center text-stone-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Le Bon Gout. Todos los derechos reservados.</p>
        </div>
      </footer>

      <AnimatePresence>
        {showJoinModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowJoinModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-[#121214] border border-stone-800 shadow-2xl p-8 max-w-md w-full rounded-xl">
              <button onClick={() => setShowJoinModal(false)} className="absolute top-4 right-4 text-stone-500 hover:text-white"><X className="w-5 h-5" /></button>
              <h2 className="text-2xl font-serif text-amber-500 mb-6">Unete a Le Bon Gout</h2>
              <form onSubmit={handleJoinSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Nombre Completo</label>
                  <input type="text" required value={joinForm.name} onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })} className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-3 focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Correo Electronico</label>
                  <input type="email" required value={joinForm.email} onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })} className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-3 focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Puesto Deseado</label>
                  <select value={joinForm.position} onChange={(e) => setJoinForm({ ...joinForm, position: e.target.value })} className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-3 focus:border-amber-500">
                    <option>Mesero</option>
                    <option>Cocina</option>
                    <option>Administracion</option>
                    <option>Bartender</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Subir CV</label>
                  <button type="button" onClick={handleCVUpload} className="w-full border border-dashed border-stone-700 text-stone-400 px-4 py-3 hover:border-amber-500 hover:text-amber-500 transition-colors flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" />
                    {joinForm.cv ? joinForm.cv.name : "Seleccionar archivo PDF"}
                  </button>
                </div>
                <button type="submit" className="w-full bg-amber-500 text-black font-medium uppercase tracking-widest text-sm py-3 hover:bg-white transition-colors mt-4">
                  Enviar Solicitud
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReclamosModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowReclamosModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-[#121214] border border-stone-800 shadow-2xl p-8 max-w-md w-full rounded-xl">
              <button onClick={() => setShowReclamosModal(false)} className="absolute top-4 right-4 text-stone-500 hover:text-white"><X className="w-5 h-5" /></button>
              <h2 className="text-2xl font-serif text-amber-500 mb-6">Libro de Reclamaciones</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Nombre Completo</label>
                  <input type="text" required className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-3 focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Correo Electronico</label>
                  <input type="email" required className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-3 focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Telefono / Celular</label>
                  <input type="tel" required className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-3 focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Descripcion del Reclamo</label>
                  <textarea required className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-3 focus:border-amber-500 h-32 resize-none" />
                </div>
                <button type="submit" className="w-full bg-amber-500 text-black font-medium uppercase tracking-widest text-sm py-3 hover:bg-white transition-colors mt-4">
                  Enviar Reclamo
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}