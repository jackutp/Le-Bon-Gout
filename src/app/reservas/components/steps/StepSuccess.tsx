// src/app/reservas/components/steps/StepSuccess.tsx

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

interface Props {
    guests: number;
    date: Date | null;
    time: string;
    experience: string;
    reservationCode?: string;
}

export function StepSuccess({ guests, date, time, experience, reservationCode }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            >
                <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-8" />
            </motion.div>

            <h2 className="text-5xl font-serif mb-6 text-white">Reserva Concluida</h2>

            {reservationCode && (
                <p className="text-amber-500 text-lg mb-4">
                    Código: <span className="font-mono">{reservationCode}</span>
                </p>
            )}

            <p className="text-stone-400 text-lg mb-10 max-w-md mx-auto">
                Le hemos enviado un correo con la confirmación. Lo esperamos en Le Bon Goût para una experiencia inolvidable.
            </p>

            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 inline-block text-left min-w-[300px]">
                <div className="mb-4">
                    <span className="text-stone-500 text-xs uppercase tracking-widest block mb-1">Fecha y Hora</span>
                    <p className="text-white font-medium">
                        {date?.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}{" "}
                        a las {time}
                    </p>
                </div>
                <div className="mb-4">
                    <span className="text-stone-500 text-xs uppercase tracking-widest block mb-1">Invitados</span>
                    <p className="text-white font-medium">{guests} Comensales</p>
                </div>
                <div>
                    <span className="text-stone-500 text-xs uppercase tracking-widest block mb-1">Experiencia</span>
                    <p className="text-white font-medium">{experience}</p>
                </div>
            </div>

            <div className="mt-12">
                <Link
                    href="/"
                    className="border border-white/20 text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors"
                >
                    Volver al Inicio
                </Link>
            </div>
        </motion.div>
    );
}