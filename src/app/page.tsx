"use client";

import { motion } from "framer-motion";
import { ChevronDown, MapPin, Phone, Clock } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen font-sans selection:bg-amber-700 selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 px-6 py-6 transition-all duration-300 bg-gradient-to-b from-black/80 to-transparent">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl font-serif tracking-widest uppercase text-amber-500"
          >
            Le Bon Goût
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex gap-8 text-sm tracking-widest uppercase"
          >
            <a href="#about" className="hover:text-amber-500 transition-colors">Nosotros</a>
            <a href="#menu" className="hover:text-amber-500 transition-colors">Menu</a>
            <a href="#reservations" className="hover:text-amber-500 transition-colors">Reservations</a>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="border border-amber-500 text-amber-500 px-6 py-2 text-sm uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-colors"
          >
            Book
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=2000"
            alt="Restaurant Interior"
            fill
            className="object-cover scale-105"
            priority
          />
        </div>

        <div className="relative z-20 text-center px-4 flex flex-col items-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-amber-500 tracking-[0.3em] uppercase text-sm mb-6"
          >
            Excelente Experiencia Culinaria
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-6xl md:text-8xl font-serif mb-8 max-w-4xl leading-tight"
          >
            L'Art de la<br />Gastronomie
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <ChevronDown className="w-8 h-8 text-amber-500 animate-bounce mt-12" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-stone-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-amber-500 tracking-[0.2em] uppercase text-sm mb-4">Nosotra Filosofía</h2>
            <h3 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Una sinfonía de<br />sabores</h3>
            <p className="text-stone-400 leading-relaxed mb-8 text-lg">
              En Le Bon Goût creemos que cenar es una forma de arte. Cada plato está elaborado con pasión, precisión y los mejores ingredientes de temporada provenientes de artesanos locales. Nuestro equipo culinario transforma recetas tradicionales en obras maestras modernas.
            </p>
            {/*<button className="border-b border-amber-500 text-amber-500 pb-1 uppercase tracking-widest text-sm hover:text-white hover:border-white transition-colors">
              Discover Our Story
            </button>*/}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative h-[600px] w-full"
          >
            <Image
              src="https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=1000"
              alt="Culinary Creation"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Signature Dishes */}
      <section id="menu" className="py-32 px-6 bg-stone-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-amber-500 tracking-[0.2em] uppercase text-sm mb-4">Menu</h2>
            <h3 className="text-4xl md:text-5xl font-serif">Creaciones Exclusivas</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Filet Mignon",
                desc: " Puré de papas con trufa, espárragos, salsa de vino tinto",
                img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800"
              },
              {
                name: "Ravioli de Langosta",
                desc: "Pasta casera, crema de azafrán, caviar",
                img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800"
              },
              {
                name: "Mousse de Chocolate Oscuro",
                desc: "Lámina de oro, coulis de frambuesa, crujiente de avellana",
                img: "https://images.unsplash.com/photo-1574966739987-65e38f2cea46?auto=format&fit=crop&q=80&w=800"
              }
            ].map((dish, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative h-96 w-full mb-6 overflow-hidden">
                  <Image
                    src={dish.img}
                    alt={dish.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <h4 className="text-2xl font-serif mb-2">{dish.name}</h4>
                <p className="text-stone-400">{dish.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="border border-amber-500 text-amber-500 px-8 py-3 uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-colors">
              View Full Menu
            </button>
          </div>
        </div>
      </section>

      {/* Footer / Reservations */}
      <footer id="reservations" className="bg-black pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 mb-20 border-b border-stone-800 pb-20">
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-2xl font-serif text-amber-500 mb-8">Le Bon Goût</h4>
            <div className="flex items-start gap-4 mb-4 text-stone-400">
              <MapPin className="w-5 h-5 text-amber-500 mt-1" />
              <p>123 Luxury Avenue<br />75008 Paris, France</p>
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

          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-xl font-serif mb-8 uppercase tracking-widest">Nuestras Redes Sociales</h4>
            <div className="flex gap-6">
              <a href="#" className="text-stone-400 hover:text-amber-500 transition-colors text-sm uppercase tracking-widest">
                Instagram
              </a>
              <a href="#" className="text-stone-400 hover:text-amber-500 transition-colors text-sm uppercase tracking-widest">
                Facebook
              </a>
              <a href="#" className="text-stone-400 hover:text-amber-500 transition-colors text-sm uppercase tracking-widest">
                X (Twitter)
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-stone-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Le Bon Goût. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
