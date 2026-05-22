// src/app/reservas/components/steps/StepCustomizations.tsx

"use client";

import { motion } from "framer-motion";
import { Customizations } from "../../types";

interface Props {
    customizations: Customizations;
    onUpdate: (field: keyof Customizations, value: string) => void;
    onNext: () => void;
    onPrev: () => void;
}

export function StepCustomizations({ customizations, onUpdate, onNext, onPrev }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
        >
            <div className="text-center mb-10">
                <h2 className="text-4xl font-serif mb-4">Personalización</h2>
                <p className="text-stone-400">Ayúdenos a preparar todo para su visita.</p>
            </div>

            <div className="space-y-6">
                <div>
                    <label className="block text-sm uppercase tracking-widest text-stone-400 mb-2">
                        1. Alergias / Restricciones
                    </label>
                    <textarea
                        value={customizations.allergies}
                        onChange={(e) => onUpdate("allergies", e.target.value)}
                        placeholder="Ej. Alergia al maní, celíaco, vegetariano..."
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg p-4 text-white focus:outline-none focus:border-amber-500 transition-colors resize-none h-24"
                    />
                </div>

                <div>
                    <label className="block text-sm uppercase tracking-widest text-stone-400 mb-2">
                        2. Requerimientos Especiales
                    </label>
                    <textarea
                        value={customizations.requests}
                        onChange={(e) => onUpdate("requests", e.target.value)}
                        placeholder="Ej. Aniversario, cumpleaños, mesa cerca a la ventana..."
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg p-4 text-white focus:outline-none focus:border-amber-500 transition-colors resize-none h-24"
                    />
                </div>

                <div>
                    <label className="block text-sm uppercase tracking-widest text-stone-400 mb-2">
                        3. Necesidades Adicionales
                    </label>
                    <textarea
                        value={customizations.needs}
                        onChange={(e) => onUpdate("needs", e.target.value)}
                        placeholder="Silla de ruedas, cochecito de bebé..."
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg p-4 text-white focus:outline-none focus:border-amber-500 transition-colors resize-none h-24"
                    />
                </div>
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
                    className="bg-amber-500 text-black px-8 py-3 uppercase tracking-widest text-sm hover:bg-amber-400 transition-colors"
                >
                    Continuar
                </button>
            </div>
        </motion.div>
    );
}