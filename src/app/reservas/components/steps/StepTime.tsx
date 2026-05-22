// src/app/reservas/components/steps/StepTime.tsx

"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface Props {
    selectedTime: string;
    onUpdate: (time: string) => void;
    onNext: () => void;
    onPrev: () => void;
    canProceed: boolean;
}

const generateTimes = () => {
    const times = [];
    for (let h = 7; h <= 23; h++) {
        for (let m = 0; m < 60; m += 15) {
            times.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
        }
    }
    return times;
};

export function StepTime({ selectedTime, onUpdate, onNext, onPrev, canProceed }: Props) {
    const times = generateTimes();

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
        >
            <div className="text-center">
                <Clock className="w-12 h-12 text-amber-500 mx-auto mb-6" />
                <h2 className="text-4xl font-serif mb-4">Hora de la Reserva</h2>
                <p className="text-stone-400">Seleccione la hora de llegada.</p>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 h-80 overflow-y-auto pr-2 custom-scrollbar">
                {times.map((t) => (
                    <button
                        key={t}
                        onClick={() => onUpdate(t)}
                        className={`py-3 rounded-lg border text-sm transition-colors
                            ${selectedTime === t
                                ? "border-amber-500 bg-amber-500/10 text-amber-500"
                                : "border-stone-800 hover:border-stone-600 text-stone-300"
                            }
                        `}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div className="flex justify-between pt-8 border-t border-stone-800">
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

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #1c1917;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #44403c;
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #78716c;
                }
            `}</style>
        </motion.div>
    );
}