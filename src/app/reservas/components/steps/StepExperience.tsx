// src/app/reservas/components/steps/StepExperience.tsx

"use client";

import { motion } from "framer-motion";
import { Utensils } from "lucide-react";

interface Props {
    selectedExperience: string;
    onUpdate: (experience: string) => void;
    onNext: () => void;
    onPrev: () => void;
    canProceed: boolean;
}

export function StepExperience({ selectedExperience, onUpdate, onNext, onPrev, canProceed }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
        >
            <div className="text-center">
                <Utensils className="w-12 h-12 text-amber-500 mx-auto mb-6" />
                <h2 className="text-4xl font-serif mb-4">Experiencia</h2>
                <p className="text-stone-400">Seleccione el tipo de experiencia culinaria.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <button
                    onClick={() => onUpdate("A la carta")}
                    className={`text-left p-8 rounded-2xl border transition-all ${selectedExperience === "A la carta"
                            ? "border-amber-500 bg-amber-500/5"
                            : "border-stone-800 hover:border-stone-600"
                        }`}
                >
                    <h3 className="text-2xl font-serif mb-3">A la carta</h3>
                    <p className="text-stone-400 text-sm leading-relaxed">
                        Disfrute de la libertad de elegir entre nuestras creaciones exclusivas de temporada.
                    </p>
                </button>

                <button
                    onClick={() => onUpdate("Degustación")}
                    className={`text-left p-8 rounded-2xl border transition-all ${selectedExperience === "Degustación"
                            ? "border-amber-500 bg-amber-500/5"
                            : "border-stone-800 hover:border-stone-600"
                        }`}
                >
                    <h3 className="text-2xl font-serif mb-3">Menú Degustación</h3>
                    <p className="text-stone-400 text-sm leading-relaxed">
                        Una inmersión guiada por nuestro chef a través de 8 tiempos de alta gastronomía.
                    </p>
                </button>
            </div>

            <div className="flex justify-between pt-8">
                <button
                    onClick={onPrev}
                    className="text-stone-400 hover:text-white uppercase tracking-widest text-sm transition-colors"
                >
                    Atrás
                </button>
                <button
                    onClick={onNext}
                    disabled={!canProceed}
                    className="bg-amber-500 text-black px-8 py-3 uppercase tracking-widest text-sm hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continuar
                </button>
            </div>
        </motion.div>
    );
}