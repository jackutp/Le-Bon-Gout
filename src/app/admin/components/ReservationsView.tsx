// src/app/admin/components/ReservationsView.tsx
"use client";

import { useState } from "react";
import type { Reservation } from "../types";

const RESERVATIONS: Reservation[] = [
    { id: 1, name: "Familia Vigneau", details: "Mesa 4  20:00 hrs    4 pax", date: "14/Oct" },
    { id: 2, name: "Empresa Moderna", details: "Mesa 8  19:30 hrs    8 pax", date: "14/Oct" },
];

export function ReservationsView() {
    const [reservations, setReservations] = useState<Reservation[]>(RESERVATIONS);
    const [selectedDate, setSelectedDate] = useState("14/Oct");

    const dates = ["14/Oct", "15/Oct", "16/Oct", "17/Oct", "18/Oct", "19/Oct", "20/Oct"];

    const assignTable = (id: number) => {
        alert("Mesa asignada correctamente!");
        setReservations(reservations.filter((r) => r.id !== id));
    };

    return (
        <div className="grid grid-cols-2 gap-6">
            {/* Calendario */}
            <div className="bg-[#121214] border border-stone-800 rounded p-6">
                <h3 className="text-sm uppercase tracking-widest text-stone-400 mb-4">
                    Calendario
                </h3>
                <div className="grid grid-cols-2 gap-2">
                    {dates.map((d) => (
                        <button
                            key={d}
                            onClick={() => setSelectedDate(d)}
                            className={`py-3 rounded text-sm ${selectedDate === d
                                    ? "bg-[#C6A96B] text-black"
                                    : "border border-stone-800 hover:border-[#C6A96B]"
                                }`}
                        >
                            {d}
                        </button>
                    ))}
                </div>
            </div>

            {/* Lista de Reservas */}
            <div className="bg-[#121214] border border-stone-800 rounded p-6">
                <h2 className="text-xl font-serif text-[#C6A96B] mb-6">
                    Reservas del {selectedDate}
                </h2>
                <ul className="space-y-4">
                    {reservations.filter((r) => r.date === selectedDate).length === 0 ? (
                        <p className="text-stone-500 text-sm">No hay reservas para esta fecha</p>
                    ) : (
                        reservations
                            .filter((r) => r.date === selectedDate)
                            .map((r) => (
                                <li
                                    key={r.id}
                                    className="flex justify-between items-center pb-4 border-b border-stone-800"
                                >
                                    <div>
                                        <p className="text-sm">{r.name}</p>
                                        <p className="text-xs text-stone-500">{r.details}</p>
                                    </div>
                                    <button
                                        onClick={() => assignTable(r.id)}
                                        className="text-xs border border-[#C6A96B] text-[#C6A96B] px-3 py-1 hover:bg-[#C6A96B] hover:text-black rounded transition-colors"
                                    >
                                        Asignar Mesa
                                    </button>
                                </li>
                            ))
                    )}
                </ul>
            </div>
        </div>
    );
}