// components/eventos/EspaciosSection.jsx
"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function EspaciosSection() {
    return (
        <section className="bg-white py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                {/* Layout asimétrico de dos columnas */}
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* COLUMNA IZQUIERDA - Salones Privados */}
                    <div className="space-y-8">
                        {/* Imagen horizontal */}
                        <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=2000"
                                alt="Salón privado"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Texto Salones */}
                        <div>
                            <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-4 text-stone-800">
                                SALONES PRIVADOS
                            </h2>
                            <p className="text-stone-500 text-sm leading-relaxed mb-6 font-light">
                                Tres espacios diseñados para garantizar privacidad y un servicio impecable,
                                desde encuentros íntimos hasta celebraciones de mediana escala.
                            </p>
                            <ul className="space-y-4">
                                <li>
                                    <span className="font-serif font-bold text-stone-800 block">Salón San Isidro</span>
                                    <span className="text-stone-400 text-sm">Ambiente íntimo hasta para 10 comensales.</span>
                                </li>
                                <li>
                                    <span className="font-serif font-bold text-stone-800 block">Salón de los Espejos</span>
                                    <span className="text-stone-400 text-sm">Elegancia clásica hasta para 20 personas.</span>
                                </li>
                                <li>
                                    <span className="font-serif font-bold text-stone-800 block">Gran Salón Rosado</span>
                                    <span className="text-stone-400 text-sm">Espacioso y versátil hasta para 50 comensales.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA - Jardín (desfasado) */}
                    <div className="relative">
                        {/* Imagen vertical desplazada a la derecha */}
                        <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden ml-auto max-w-md lg:max-w-lg">
                            <Image
                                src="https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80&w=2000"
                                alt="Jardín"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Texto desfasado (comienza a mitad de la imagen) */}
                        <div className="mt-[-120px] md:mt-[-150px] relative z-10 bg-white/90 backdrop-blur-sm p-6 md:p-8 ml-0 md:ml-8 max-w-md">
                            <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-4 text-stone-800">
                                JARDÍN
                            </h2>
                            <p className="text-stone-500 text-sm leading-relaxed font-light">
                                Nuestro exquisito jardín interior rodeado de vegetación natural ofrece un escape de la ciudad.
                                Perfecto para cócteles al atardecer o almuerzos al aire libre. Un microclima de paz y exclusividad
                                para sus invitados. Si requiere exclusividad total, también puede reservar la casona completa
                                con todos nuestros espacios y personal de servicio.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}