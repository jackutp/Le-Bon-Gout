// src/app/reservas/components/ProgressBar.tsx

"use client";

import { motion } from "framer-motion";

interface Props {
    currentStep: number;
    totalSteps?: number;
}

export function ProgressBar({ currentStep, totalSteps = 6 }: Props) {
    return (
        <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
                <span className="text-amber-500 tracking-widest uppercase text-sm">
                    Paso {currentStep} de {totalSteps}
                </span>
                <span className="text-stone-500 text-sm">Reserva Exclusiva</span>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                <motion.div
                    className="bg-amber-500 h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
        </div>
    );
}