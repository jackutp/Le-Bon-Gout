// src/app/mesero/components/reservas/TarjetaReserva.tsx

"use client";

import { CheckCircle } from "lucide-react";

interface Reserva {
    id: number;
    nombre: string;
    apellido: string | null | undefined;
    email: string;
    telefono: string | null | undefined;
    hora: string;
    personas: number;
    experiencia: string;
    alergias: string | null | undefined;
}

interface Props {
    reserva: Reserva;
    onMarcarAtendido: (id: number) => void;
    isUpdating: boolean;
}

export function TarjetaReserva({ reserva, onMarcarAtendido, isUpdating }: Props) {
    return (
        <div className="bg-[#121214] border border-stone-800 rounded-lg p-4 hover:border-[#C6A96B]/50 transition-colors">
            <div className="flex justify-between items-start mb-2">
                <div>
                    <p className="font-serif text-base text-white">
                        {reserva.nombre} {reserva.apellido || ""}
                    </p>
                    <p className="text-xs text-stone-400">
                        {reserva.hora} hrs • {reserva.personas} {reserva.personas === 1 ? "persona" : "personas"}
                    </p>
                </div>
                <span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-1 rounded-full">
                    {reserva.experiencia === "A la carta" ? "A la carta" : "Degustación"}
                </span>
            </div>
            <div className="text-xs text-stone-500 mb-3">
                <p>{reserva.email}</p>
                {reserva.telefono && <p>{reserva.telefono}</p>}
                {reserva.alergias && (
                    <p className="text-amber-500 text-xs mt-1 truncate">
                        Alergias: {reserva.alergias.substring(0, 40)}
                    </p>
                )}
            </div>
            <button
                onClick={() => onMarcarAtendido(reserva.id)}
                disabled={isUpdating}
                className="w-full flex items-center justify-center gap-2 bg-green-600/20 text-green-500 border border-green-500/30 px-3 py-2 rounded text-xs uppercase tracking-widest hover:bg-green-600/30 transition-colors disabled:opacity-50"
            >
                {isUpdating ? (
                    "Procesando..."
                ) : (
                    <>
                        <CheckCircle className="w-3 h-3" />
                        Marcar como Atendido
                    </>
                )}
            </button>
        </div>
    );
}