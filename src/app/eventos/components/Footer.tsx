// components/eventos/FooterOscuro.jsx
"use client";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

export default function FooterOscuro() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative bg-[#2D2533] text-white pt-20 pb-10 px-6 md:px-12 lg:px-24">
            {/* Botón circular flotante */}
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                <button
                    onClick={scrollToTop}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-amber-400 transition-colors group"
                >
                    <IoIosArrowUp className="text-stone-800 group-hover:text-white" />
                </button>
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Grid de 4 columnas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Columna 1: Suscripción */}
                    <div>
                        <h3 className="text-2xl font-serif mb-6">Astrid & Gastón</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    className="border-b border-white/30 bg-transparent pb-1 text-sm placeholder:text-white/50 focus:border-amber-400 outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Apellido"
                                    className="border-b border-white/30 bg-transparent pb-1 text-sm placeholder:text-white/50 focus:border-amber-400 outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    type="tel"
                                    placeholder="Celular"
                                    className="border-b border-white/30 bg-transparent pb-1 text-sm placeholder:text-white/50 focus:border-amber-400 outline-none"
                                />
                                <input
                                    type="email"
                                    placeholder="Correo"
                                    className="border-b border-white/30 bg-transparent pb-1 text-sm placeholder:text-white/50 focus:border-amber-400 outline-none"
                                />
                            </div>
                            <button className="mt-2 px-6 py-2 rounded-full border border-white/50 text-white text-xs uppercase tracking-wider hover:bg-white hover:text-[#2D2533] transition-colors">
                                Suscríbete
                            </button>

                            <div className="space-y-2 mt-6">
                                <label className="flex items-start gap-2 text-xs">
                                    <input type="checkbox" className="mt-0.5 accent-amber-400" /> Acepto políticas de privacidad
                                </label>
                                <label className="flex items-start gap-2 text-xs">
                                    <input type="checkbox" className="mt-0.5 accent-amber-400" /> Acepto términos y condiciones
                                </label>
                                <label className="flex items-start gap-2 text-xs">
                                    <input type="checkbox" className="mt-0.5 accent-amber-400" /> Acepto envío de comunicaciones
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Columna 2: Sobre la marca */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider mb-6">Sobre la marca</h4>
                        <ul className="space-y-3 text-sm text-white/70">
                            <li><a href="#" className="hover:text-amber-400 transition">Nuestra historia</a></li>
                            <li><a href="#" className="hover:text-amber-400 transition">Eventos</a></li>
                            <li><a href="#" className="hover:text-amber-400 transition">Cartas</a></li>
                            <li><a href="#" className="hover:text-amber-400 transition">Horarios</a></li>
                            <li><a href="#" className="hover:text-amber-400 transition">Trabaja con nosotros</a></li>
                        </ul>
                    </div>

                    {/* Columna 3: Ayuda y legales */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider mb-6">Ayuda y legales</h4>
                        <ul className="space-y-3 text-sm text-white/70">
                            <li><a href="#" className="hover:text-amber-400 transition">Contáctanos</a></li>
                            <li><a href="#" className="hover:text-amber-400 transition">Políticas de cookies</a></li>
                            <li><a href="#" className="hover:text-amber-400 transition">Política de privacidad</a></li>
                            <li><a href="#" className="hover:text-amber-400 transition">Términos y condiciones</a></li>
                            <li><a href="#" className="hover:text-amber-400 transition">Libro de reclamaciones</a></li>
                        </ul>
                    </div>

                    {/* Columna 4: Redes e identidad */}
                    <div>
                        <div className="flex justify-end gap-3 mb-8">
                            <a href="#" className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#2D2533] transition">
                                <FaFacebookF size={14} />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#2D2533] transition">
                                <FaInstagram size={14} />
                            </a>
                        </div>
                        <div className="space-y-3 mt-8">
                            <div className="bg-white/10 p-3 rounded text-center text-xs">Sello de calidad</div>
                            <div className="bg-white/10 p-3 rounded text-center text-xs">Libro de reclamaciones</div>
                        </div>
                    </div>
                </div>

                {/* Copyright y datos fiscales */}
                <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between text-xs text-white/50">
                    <p>© 2026 Le Bon Goût - Todos los derechos reservados.</p>
                    <p>RUC: 20601234567 - RAZÓN SOCIAL: LE BON GOÛT S.A.C.</p>
                </div>
            </div>
        </footer>
    );
}