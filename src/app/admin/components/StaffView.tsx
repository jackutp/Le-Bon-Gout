// src/app/admin/components/StaffView.tsx
"use client";

import { useState } from "react";
import type { Staff } from "../types";

const INITIAL_STAFF: Staff[] = [
    {
        id: 1,
        name: "Jean-Paul",
        email: "jean@lebongout.com",
        role: "Mesero",
        password: "",
        notes: "",
        ordersToday: 24,
    },
    {
        id: 2,
        name: "Maria Garcia",
        email: "maria@lebongout.com",
        role: "Mesero",
        password: "",
        notes: "",
        ordersToday: 18,
    },
    {
        id: 3,
        name: "Chef Isabelle",
        email: "isabelle@lebongout.com",
        role: "Cocinero",
        password: "",
        notes: "",
        avgTime: "14m",
    },
    {
        id: 4,
        name: "Carlos Ruiz",
        email: "carlos@lebongout.com",
        role: "Cocinero",
        password: "",
        notes: "",
        avgTime: "16m",
    },
];

export function StaffView() {
    const [staff, setStaff] = useState<Staff[]>(INITIAL_STAFF);
    const [newStaff, setNewStaff] = useState({
        name: "",
        email: "",
        role: "Mesero" as "Mesero" | "Cocinero",
        password: "",
        notes: "",
    });

    const addStaff = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newStaff.name || !newStaff.email) return;
        setStaff([
            ...staff,
            {
                ...newStaff,
                id: Date.now(),
                ordersToday: newStaff.role === "Mesero" ? 0 : undefined,
                avgTime: newStaff.role === "Cocinero" ? "0m" : undefined,
            },
        ]);
        setNewStaff({
            name: "",
            email: "",
            role: "Mesero",
            password: "",
            notes: "",
        });
    };

    const meseros = staff.filter((s) => s.role === "Mesero");
    const cocineros = staff.filter((s) => s.role === "Cocinero");

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Formulario de nuevo personal */}
            <div className="bg-[#121214] border border-stone-800 rounded p-6">
                <h2 className="text-xl font-serif text-[#C6A96B] mb-6">Nuevo Personal</h2>
                <form onSubmit={addStaff} className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                            Nombre
                        </label>
                        <input
                            type="text"
                            value={newStaff.name}
                            onChange={(e) =>
                                setNewStaff({ ...newStaff, name: e.target.value })
                            }
                            className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 focus:border-[#C6A96B] outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={newStaff.email}
                            onChange={(e) =>
                                setNewStaff({ ...newStaff, email: e.target.value })
                            }
                            className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 focus:border-[#C6A96B] outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={newStaff.password}
                            onChange={(e) =>
                                setNewStaff({ ...newStaff, password: e.target.value })
                            }
                            className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 focus:border-[#C6A96B] outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                            Notas / Permisos
                        </label>
                        <textarea
                            value={newStaff.notes}
                            onChange={(e) =>
                                setNewStaff({ ...newStaff, notes: e.target.value })
                            }
                            className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 focus:border-[#C6A96B] h-24 resize-none outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                            Rol
                        </label>
                        <select
                            value={newStaff.role}
                            onChange={(e) =>
                                setNewStaff({
                                    ...newStaff,
                                    role: e.target.value as "Mesero" | "Cocinero",
                                })
                            }
                            className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 focus:border-[#C6A96B] outline-none"
                        >
                            <option>Mesero</option>
                            <option>Cocinero</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#C6A96B] text-black uppercase tracking-widest text-sm py-3 mt-4 hover:bg-white transition-colors"
                    >
                        Registrar
                    </button>
                </form>
            </div>

            {/* Lista de Meseros */}
            <div className="bg-[#121214] border border-stone-800 rounded p-6">
                <h2 className="text-xl font-serif text-[#C6A96B] mb-6">Meseros</h2>
                <div className="space-y-4">
                    {meseros.map((s) => (
                        <div
                            key={s.id}
                            className="flex justify-between items-center p-3 border border-stone-800 rounded"
                        >
                            <div>
                                <p className="text-sm">{s.name}</p>
                                <p className="text-xs text-stone-500">
                                    {s.ordersToday || 0} pedidos hoy
                                </p>
                            </div>
                            <span className="text-[#C6A96B] text-sm">Activo</span>
                        </div>
                    ))}
                    {meseros.length === 0 && (
                        <p className="text-stone-500 text-sm">No hay meseros registrados</p>
                    )}
                </div>
            </div>

            {/* Lista de Cocineros */}
            <div className="bg-[#121214] border border-stone-800 rounded p-6">
                <h2 className="text-xl font-serif text-[#C6A96B] mb-6">Cocineros</h2>
                <div className="space-y-4">
                    {cocineros.map((s) => (
                        <div
                            key={s.id}
                            className="flex justify-between items-center p-3 border border-stone-800 rounded"
                        >
                            <div>
                                <p className="text-sm">{s.name}</p>
                                <p className="text-xs text-stone-500">
                                    Promedio: {s.avgTime}/plato
                                </p>
                            </div>
                            <span className="text-[#C6A96B] text-sm">Óptimo</span>
                        </div>
                    ))}
                    {cocineros.length === 0 && (
                        <p className="text-stone-500 text-sm">
                            No hay cocineros registrados
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}