"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function EventosPage() {
  const [formData, setFormData] = useState({
    name: "", lastName: "", phone: "", company: "", email: "", date: "", attendees: "", comments: ""
  });
  const [legal, setLegal] = useState({ age: false, privacy: false, marketing: false });

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen font-sans selection:bg-amber-700 selection:text-white">
      <Navbar />
      
      {/* Hero */}
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
        <div className="relative z-20 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-serif mb-6"
          >
            Eventos Privados
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-amber-500 tracking-[0.3em] uppercase text-sm"
          >
            Celebre con la distinción de Le Bon Goût
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-20">
        {/* Información */}
        <div className="space-y-16">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-3xl font-serif text-amber-500 mb-6">Salones Privados</h3>
            <p className="text-stone-400 mb-6 leading-relaxed text-lg">
              Tenemos tres espacios para atender grupos desde 10 hasta 50 personas, diseñados para garantizar privacidad y un servicio impecable.
            </p>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <span className="text-amber-500">—</span>
                <div>
                  <strong className="text-white block font-serif text-lg">Salón San Isidro</strong>
                  <span className="text-stone-400">Ambiente íntimo hasta para 10 comensales.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-amber-500">—</span>
                <div>
                  <strong className="text-white block font-serif text-lg">El histórico Salón de los Espejos</strong>
                  <span className="text-stone-400">Elegancia clásica hasta para 20 personas.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="text-amber-500">—</span>
                <div>
                  <strong className="text-white block font-serif text-lg">El Gran Salón Rosado</strong>
                  <span className="text-stone-400">Espacioso y versátil hasta para 50 comensales.</span>
                </div>
              </li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-3xl font-serif text-amber-500 mb-4">Jardín</h3>
            <p className="text-stone-400 leading-relaxed text-lg">
              Nuestro exquisito jardín interior rodeado de vegetación natural ofrece un escape de la ciudad. Perfecto para cócteles al atardecer o almuerzos al aire libre. Un microclima de paz y exclusividad para sus invitados.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-3xl font-serif text-amber-500 mb-4">Casona Completa</h3>
            <p className="text-stone-400 leading-relaxed text-lg">
              Si requiere exclusividad total, le brindamos la posibilidad de reservar nuestra casona al completo. Ponemos a su disposición todos nuestros espacios, salones, jardín y personal de servicio para crear un evento corporativo o social sin precedentes.
            </p>
          </motion.div>

          <div className="bg-stone-900 border border-stone-800 p-8 rounded-2xl">
            <h4 className="font-serif text-xl mb-4">Solo reservas de eventos</h4>
            <p className="text-stone-400">Para consultas acerca de los salones privados, el jardín, la casona y el servicio de chef en casa, escríbenos para ayudarte o llámanos al <strong className="text-amber-500">(+51) 959 844 946</strong>.</p>
          </div>
        </div>

        {/* Formulario */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-8 lg:p-12 sticky top-32">
            <h3 className="text-3xl font-serif mb-8 text-center">Solicitud de Cotización</h3>
            
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Nombre *</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Apellido *</label>
                  <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full bg-black border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Celular *</label>
                  <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-black border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Empresa</label>
                  <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-black border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Correo Electrónico *</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-black border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Fecha del Evento *</label>
                  <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-black border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">N° Asistentes *</label>
                  <input required type="number" min="1" value={formData.attendees} onChange={e => setFormData({...formData, attendees: e.target.value})} className="w-full bg-black border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-2">Comentarios *</label>
                <textarea required value={formData.comments} onChange={e => setFormData({...formData, comments: e.target.value})} className="w-full bg-black border border-stone-800 rounded-lg p-4 text-white focus:border-amber-500 outline-none transition-colors resize-none h-32"></textarea>
              </div>

              <div className="space-y-3 pt-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" required checked={legal.age} onChange={e => setLegal({...legal, age: e.target.checked})} className="mt-1 accent-amber-500 w-4 h-4 cursor-pointer" />
                  <span className="text-sm text-stone-400 group-hover:text-stone-300 transition-colors">Declaro que soy mayor de 18 años *</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" required checked={legal.privacy} onChange={e => setLegal({...legal, privacy: e.target.checked})} className="mt-1 accent-amber-500 w-4 h-4 cursor-pointer" />
                  <span className="text-sm text-stone-400 group-hover:text-stone-300 transition-colors">He leído y acepto las políticas de privacidad de datos *</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" checked={legal.marketing} onChange={e => setLegal({...legal, marketing: e.target.checked})} className="mt-1 accent-amber-500 w-4 h-4 cursor-pointer" />
                  <span className="text-sm text-stone-400 group-hover:text-stone-300 transition-colors">Acepto el tratamiento de mis datos para fines publicitarios (Opcional)</span>
                </label>
              </div>

              <button 
                type="submit"
                disabled={!legal.age || !legal.privacy}
                className="w-full bg-amber-500 text-black py-4 uppercase tracking-widest text-sm font-medium hover:bg-amber-400 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Solicitar Información
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
