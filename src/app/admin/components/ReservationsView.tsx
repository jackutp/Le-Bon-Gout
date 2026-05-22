// src/app/admin/components/ReservationsView.tsx

"use client";

import { useState, useEffect } from "react";
import { reservaService, ReservaResponse } from "@/services/reservaService";
import { RefreshCw } from "lucide-react";

export function ReservationsView() {
    const [reservations, setReservations] = useState<ReservaResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [updatingId, setUpdatingId] = useState<number | null>(null);

    // Generar fechas para los próximos 7 días
    const generateDates = () => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];
            const displayStr = date.toLocaleDateString("es-ES", { day: "2-digit", month: "short" });
            dates.push({ value: dateStr, display: displayStr });
        }
        return dates;
    };

    const dates = generateDates();

    // Cargar reservas
    const loadReservations = async () => {
        setLoading(true);
        try {
            const data = await reservaService.listarReservas();
            setReservations(data);
            // Seleccionar la primera fecha disponible si no hay seleccionada
            if (!selectedDate && dates.length > 0) {
                setSelectedDate(dates[0].value);
            }
        } catch (error) {
            console.error("Error cargando reservas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadReservations();
    }, []);

    // Filtrar reservas por fecha seleccionada
    const filteredReservations = reservations.filter(
        (r) => r.fecha === selectedDate
    );

    // Cambiar estado de reserva a ACEPTADA (equivalente a "asignar mesa")
    const handleAssignTable = async (id: number) => {
        setUpdatingId(id);
        try {
            await reservaService.actualizarEstado(id, "ACEPTADA");
            await loadReservations(); // Recargar lista
            alert("Reserva aceptada correctamente");
        } catch (error) {
            console.error("Error al aceptar reserva:", error);
            alert("Error al aceptar la reserva");
        } finally {
            setUpdatingId(null);
        }
    };

    // Cambiar estado a CANCELADA
    const handleCancelReservation = async (id: number) => {
        if (confirm("¿Estás seguro de cancelar esta reserva?")) {
            setUpdatingId(id);
            try {
                await reservaService.actualizarEstado(id, "CANCELADA");
                await loadReservations();
                alert("Reserva cancelada correctamente");
            } catch (error) {
                console.error("Error al cancelar reserva:", error);
                alert("Error al cancelar la reserva");
            } finally {
                setUpdatingId(null);
            }
        }
    };

    const getEstadoColor = (estado: string) => {
        switch (estado) {
            case "PENDIENTE":
                return "text-amber-500 bg-amber-500/10 border border-amber-500/30";
            case "ACEPTADA":
                return "text-green-500 bg-green-500/10 border border-green-500/30";
            case "CANCELADA":
                return "text-red-500 bg-red-500/10 border border-red-500/30";
            case "COMPLETADA":
                return "text-blue-500 bg-blue-500/10 border border-blue-500/30";
            default:
                return "text-stone-500 bg-stone-500/10";
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Calendario */}
            <div className="bg-[#121214] border border-stone-800 rounded p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm uppercase tracking-widest text-stone-400">
                        Calendario
                    </h3>
                    <button
                        onClick={loadReservations}
                        disabled={loading}
                        className="text-stone-400 hover:text-[#C6A96B] transition-colors p-1"
                        title="Actualizar"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {dates.map((d) => {
                        const count = reservations.filter(r => r.fecha === d.value).length;
                        return (
                            <button
                                key={d.value}
                                onClick={() => setSelectedDate(d.value)}
                                className={`py-3 rounded text-sm transition-colors ${selectedDate === d.value
                                    ? "bg-[#C6A96B] text-black"
                                    : "border border-stone-800 hover:border-[#C6A96B]"
                                    }`}
                            >
                                {d.display}
                                {count > 0 && (
                                    <span className="ml-2 text-xs bg-black/50 px-1.5 py-0.5 rounded-full">
                                        {count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Lista de Reservas */}
            <div className="bg-[#121214] border border-stone-800 rounded p-6">
                <h2 className="text-xl font-serif text-[#C6A96B] mb-6">
                    Reservas del {selectedDate ? new Date(selectedDate).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "long"
                    }) : "---"}
                </h2>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C6A96B]"></div>
                    </div>
                ) : filteredReservations.length === 0 ? (
                    <p className="text-stone-500 text-sm text-center py-8">
                        No hay reservas para esta fecha
                    </p>
                ) : (
                    <ul className="space-y-4">
                        {filteredReservations.map((r) => (
                            <li
                                key={r.id}
                                className="flex justify-between items-center pb-4 border-b border-stone-800"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <p className="text-sm font-medium text-white">
                                            {r.nombre} {r.apellido}
                                        </p>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${getEstadoColor(r.estado)}`}>
                                            {r.estado}
                                        </span>
                                    </div>
                                    <p className="text-xs text-stone-400">
                                        {r.hora} hrs • {r.personas} {r.personas === 1 ? "persona" : "personas"} • {r.experiencia}
                                    </p>
                                    <p className="text-xs text-stone-500 mt-1">
                                        {r.email} {r.telefono ? `• ${r.telefono}` : ""}
                                    </p>
                                    {r.alergias && (
                                        <p className="text-xs text-amber-500 mt-1">
                                            Alergias: {r.alergias.substring(0, 50)}
                                        </p>
                                    )}
                                </div>
                                <div className="flex gap-2 ml-4">
                                    {r.estado === "PENDIENTE" && (
                                        <>
                                            <button
                                                onClick={() => handleAssignTable(r.id)}
                                                disabled={updatingId === r.id}
                                                className="text-xs border border-[#C6A96B] text-[#C6A96B] px-3 py-1 hover:bg-[#C6A96B] hover:text-black rounded transition-colors disabled:opacity-50"
                                            >
                                                {updatingId === r.id ? "..." : "Aceptar"}
                                            </button>
                                            <button
                                                onClick={() => handleCancelReservation(r.id)}
                                                disabled={updatingId === r.id}
                                                className="text-xs border border-red-500/50 text-red-500 px-3 py-1 hover:bg-red-500 hover:text-black rounded transition-colors disabled:opacity-50"
                                            >
                                                Cancelar
                                            </button>
                                        </>
                                    )}
                                    {r.estado === "ACEPTADA" && (
                                        <span className="text-xs text-green-500 px-3 py-1">
                                            Mesa asignada
                                        </span>
                                    )}
                                    {r.estado === "CANCELADA" && (
                                        <span className="text-xs text-red-500 px-3 py-1">
                                            Cancelada
                                        </span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}