// src/app/reservas/components/steps/StepDate.tsx

"use client";

import { motion } from "framer-motion";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../Calendar";

interface Props {
    selectedDate: Date | null;
    onUpdate: (date: Date) => void;
    onNext: () => void;
    onPrev: () => void;
    canProceed: boolean;
}

export function StepDate({ selectedDate, onUpdate, onNext, onPrev, canProceed }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
        >
            <div className="text-center">
                <CalendarIcon className="w-12 h-12 text-amber-500 mx-auto mb-6" />
                <h2 className="text-4xl font-serif mb-4">Fecha de la Reserva</h2>
                <p className="text-stone-400">Seleccione el día de su preferencia.</p>
            </div>

            <Calendar selectedDate={selectedDate} onSelectDate={onUpdate} />

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