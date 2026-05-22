"use client";

import { useMetricas } from "@/context/MetricasContext";
import { Loader2 } from "lucide-react";

export function DashboardView() {
    const { metricasPedidos, metricasPagos, isLoading, error } = useMetricas();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-[#C6A96B]" />
            </div>
        );
    }

    if (error || !metricasPedidos || !metricasPagos) {
        return (
            <div className="text-center text-stone-400 py-12">
                <p>Error al cargar las métricas: {error}</p>
            </div>
        );
    }

    // Calcular ticket promedio
    const ticketPromedio = metricasPedidos.ordenesCompletadas > 0
        ? metricasPagos.ventasDelDia / metricasPedidos.ordenesCompletadas
        : 0;

    const maxSale = Math.max(...metricasPagos.ventasUltimos7Dias, 1);

    return (
        <div className="space-y-6">
            {/* Tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#121214] p-5 border border-stone-800 rounded-lg">
                    <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-2">Ventas del Día</h3>
                    <p className="text-2xl font-serif text-[#C6A96B]">S/ {metricasPagos.ventasDelDia.toFixed(2)}</p>
                </div>
                <div className="bg-[#121214] p-5 border border-stone-800 rounded-lg">
                    <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-2">Órdenes Completadas</h3>
                    <p className="text-2xl font-serif text-white">{metricasPedidos.ordenesCompletadas}</p>
                </div>
                <div className="bg-[#121214] p-5 border border-stone-800 rounded-lg">
                    <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-2">Ticket Promedio</h3>
                    <p className="text-2xl font-serif text-white">S/ {ticketPromedio.toFixed(2)}</p>
                </div>
                <div className="bg-[#121214] p-5 border border-stone-800 rounded-lg">
                    <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-2">Ocupación</h3>
                    <p className="text-2xl font-serif text-white">{metricasPagos.ocupacionPorcentaje.toFixed(0)}%</p>
                    <p className="text-xs text-stone-500">{metricasPagos.mesasOcupadas}/{metricasPagos.totalMesas} mesas</p>
                </div>
            </div>

            {/* Ventas Semanales */}
            <div className="bg-[#121214] border border-stone-800 rounded-lg p-5">
                <h3 className="text-sm uppercase tracking-widest text-stone-400 mb-6">Ventas Últimos 7 Días</h3>
                <div className="flex items-end justify-between h-48 gap-2">
                    {metricasPagos.diasSemana.map((dia, i) => (
                        <div key={dia} className="flex-1 flex flex-col items-center gap-2">
                            <div className="w-full bg-[#C6A96B]/20 rounded-t relative" style={{ height: `${(metricasPagos.ventasUltimos7Dias[i] / maxSale) * 100}%` }}>
                                <div className="absolute bottom-0 w-full bg-[#C6A96B] rounded-t transition-all hover:bg-[#C6A96B]/80" style={{ height: `${(metricasPagos.ventasUltimos7Dias[i] / maxSale) * 100}%` }} />
                            </div>
                            <span className="text-xs text-stone-500">{dia}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Productos Top */}
            <div className="bg-[#121214] border border-stone-800 rounded-lg p-5">
                <h3 className="text-sm uppercase tracking-widest text-stone-400 mb-6">Productos Más Vendidos</h3>
                <div className="space-y-4">
                    {metricasPedidos.productosTop.map((producto, i) => (
                        <div key={producto.nombre} className="flex items-center gap-4">
                            <span className="text-[#C6A96B] font-serif text-lg w-6">{i + 1}</span>
                            <div className="flex-1">
                                <div className="flex justify-between text-sm mb-1">
                                    <span>{producto.nombre}</span>
                                    <span className="text-stone-400">{producto.cantidad} und</span>
                                </div>
                                <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#C6A96B] rounded-full" style={{ width: `${(producto.cantidad / metricasPedidos.productosTop[0].cantidad) * 100}%` }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Órdenes por Estado */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Object.entries(metricasPedidos.ordenesPorEstado).map(([estado, cantidad]) => {
                    const colors: Record<string, string> = {
                        PENDIENTE: "text-orange-500",
                        EN_PREPARACION: "text-amber-500",
                        SERVIDO: "text-blue-500",
                        COMPLETADO: "text-green-500"
                    };
                    return (
                        <div key={estado} className="bg-[#121214] p-4 border border-stone-800 rounded-lg">
                            <h3 className="text-xs uppercase tracking-widest text-stone-400 mb-2">{estado}</h3>
                            <p className={`text-2xl font-serif ${colors[estado] || "text-white"}`}>{cantidad}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}