// src/app/reservas/components/steps/StepGuests.tsx

"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

interface Props {
    guests: number;
    onUpdate: (guests: number) => void;
    onNext: () => void;
}

export function StepGuests({ guests, onUpdate, onNext }: Props) {
    const increment = () => onUpdate(guests + 1);
    const decrement = () => onUpdate(Math.max(1, guests - 1));

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
        >
            <div className="text-center">
                <User className="w-12 h-12 text-amber-500 mx-auto mb-6" />
                <h2 className="text-4xl font-serif mb-4">¿Cuántos comensales?</h2>
                <p className="text-stone-400">Seleccione la cantidad de personas para su experiencia.</p>
            </div>

            <div className="flex items-center justify-center gap-8">
                <button
                    onClick={decrement}
                    className="w-16 h-16 rounded-full border border-stone-800 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-colors text-2xl"
                >
                    -
                </button>
                <span className="text-6xl font-serif w-24 text-center">{guests}</span>
                <button
                    onClick={increment}
                    className="w-16 h-16 rounded-full border border-stone-800 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-colors text-2xl"
                >
                    +
                </button>
            </div>

            {guests > 9 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center"
                >
                    <p className="text-amber-500 text-sm">
                        Para reservas de 9 o más comensales por favor comuníquese con nosotros a{" "}
                        <strong>lebon@gmail.com</strong> o al <strong>+51 1 4422777</strong>.
                    </p>
                </motion.div>
            )}

            <div className="flex justify-end pt-8">
                <button
                    onClick={onNext}
                    disabled={guests > 9}
                    className="bg-amber-500 text-black px-8 py-3 uppercase tracking-widest text-sm hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continuar
                </button>
            </div>
        </motion.div>
    );
}