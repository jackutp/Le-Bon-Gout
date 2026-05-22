// src/app/mesero/components/reservas/ReservasView.tsx

"use client";

import { useEffect, useState } from "react";
import { reservaService, ReservaResponse } from "@/services/reservaService";
import { Users, RefreshCw, Calendar } from "lucide-react";
export function ReservasView() {
    const [reservas, setReservas] = useState<ReservaResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<number | null>(null);
    const [filtro, setFiltro] = useState<string>("ACEPTADA");

    const cargarReservas = async () => {
        setLoading(true);
        try {
            let data: ReservaResponse[];
            if (filtro === "TODAS") {
                data = await reservaService.listarReservas();
            } else {
                data = await reservaService.listarPorEstado(filtro);
            }
            setReservas(data);
        } catch (error) {
            console.error("Error cargando reservas:", error);
        } finally {
            setLoading(false);
        }
    };

    const marcarAtendido = async (id: number) => {
        setUpdatingId(id);
        try {
            await reservaService.actualizarEstado(id, "COMPLETADA");
            await cargarReservas();
        } catch (error) {
            console.error("Error al marcar reserva:", error);
            alert("Error al actualizar la reserva");
        } finally {
            setUpdatingId(null);
        }
    };

    useEffect(() => {
        cargarReservas();
    }, [filtro]);

    const getEstadoColor = (estado: string) => {
        switch (estado) {
            case "PENDIENTE": return "bg-amber-500/10 text-amber-500 border border-amber-500/30";
            case "ACEPTADA": return "bg-green-500/10 text-green-500 border border-green-500/30";
            case "CANCELADA": return "bg-red-500/10 text-red-500 border border-red-500/30";
            case "COMPLETADA": return "bg-blue-500/10 text-blue-500 border border-blue-500/30";
            default: return "bg-stone-500/10 text-stone-500";
        }
    };

    const reservasNormalizadas = reservas.map(r => ({
        ...r,
        apellido: r.apellido || null,
        telefono: r.telefono || null,
        alergias: r.alergias || null,
    }));

    return (
        <div className="space-y-6">
            {/* Header con filtros */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#C6A96B]" />
                    <h2 className="text-xl font-serif text-white">Gestión de Reservas</h2>
                </div>
                <div className="flex gap-2">
                    {["ACEPTADA", "PENDIENTE", "TODAS"].map((opcion) => (
                        <button
                            key={opcion}
                            onClick={() => setFiltro(opcion)}
                            className={`px-4 py-2 rounded text-sm uppercase tracking-widest transition-colors ${filtro === opcion
                                ? "bg-[#C6A96B] text-black"
                                : "border border-stone-800 text-stone-400 hover:text-white hover:border-[#C6A96B]"
                                }`}
                        >
                            {opcion === "TODAS" ? "Todas" : opcion}
                        </button>
                    ))}
                    <button
                        onClick={cargarReservas}
                        disabled={loading}
                        className="text-stone-400 hover:text-[#C6A96B] transition-colors p-2 rounded border border-stone-800 hover:border-[#C6A96B] disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Lista de reservas */}
            {loading && reservas.length === 0 ? (
                <div className="bg-[#121214] border border-stone-800 rounded-lg p-12">
                    <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C6A96B]"></div>
                    </div>
                </div>
            ) : reservas.length === 0 ? (
                <div className="bg-[#121214] border border-stone-800 rounded-lg p-12 text-center">
                    <Users className="w-12 h-12 text-stone-600 mx-auto mb-3" />
                    <p className="text-stone-500">No hay reservas con el estado seleccionado</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {reservasNormalizadas.map((reserva) => (
                        <div
                            key={reserva.id}
                            className="bg-[#121214] border border-stone-800 rounded-lg p-4 hover:border-[#C6A96B]/50 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <p className="font-serif text-base text-white">
                                        {reserva.nombre} {reserva.apellido || ""}
                                    </p>
                                    <p className="text-xs text-stone-400">
                                        {reserva.fecha} • {reserva.hora} hrs • {reserva.personas} {reserva.personas === 1 ? "persona" : "personas"}
                                    </p>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${getEstadoColor(reserva.estado)}`}>
                                    {reserva.estado}
                                </span>
                            </div>
                            <div className="text-xs text-stone-500 mb-3">
                                <p>{reserva.email}</p>
                                {reserva.telefono && <p>{reserva.telefono}</p>}
                                {reserva.experiencia && (
                                    <p className="text-[#C6A96B] text-xs mt-1">
                                        {reserva.experiencia}
                                    </p>
                                )}
                                {reserva.alergias && (
                                    <p className="text-amber-500 text-xs mt-1 truncate">
                                        Alergias: {reserva.alergias.substring(0, 40)}
                                    </p>
                                )}
                            </div>
                            {reserva.estado === "ACEPTADA" && (
                                <button
                                    onClick={() => marcarAtendido(reserva.id)}
                                    disabled={updatingId === reserva.id}
                                    className="w-full flex items-center justify-center gap-2 bg-green-600/20 text-green-500 border border-green-500/30 px-3 py-2 rounded text-xs uppercase tracking-widest hover:bg-green-600/30 transition-colors disabled:opacity-50"
                                >
                                    {updatingId === reserva.id ? "Procesando..." : "Marcar como Atendido"}
                                </button>
                            )}
                            {reserva.estado === "PENDIENTE" && (
                                <div className="text-center text-xs text-amber-500 py-2">
                                    Pendiente de confirmación
                                </div>
                            )}
                            {reserva.estado === "COMPLETADA" && (
                                <div className="text-center text-xs text-green-500 py-2">
                                    ✓ Atendido
                                </div>
                            )}
                            {reserva.estado === "CANCELADA" && (
                                <div className="text-center text-xs text-red-500 py-2">
                                    Cancelada
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}