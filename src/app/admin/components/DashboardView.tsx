// src/app/admin/components/DashboardView.tsx
"use client";

export function DashboardView() {
    const days = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
    const salesData = [3200, 4100, 3800, 4500, 4200, 5200, 4520];
    const maxSale = Math.max(...salesData);

    return (
        <div className="space-y-6">
            {/* Tarjetas de métricas */}
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-[#121214] p-6 border border-stone-800 rounded">
                    <h3 className="text-sm uppercase tracking-widest text-stone-400 mb-2">
                        Ventas del Dia
                    </h3>
                    <p className="text-3xl font-serif text-[#C6A96B]">S/ 4,520</p>
                </div>

                <div className="bg-[#121214] p-6 border border-stone-800 rounded">
                    <h3 className="text-sm uppercase tracking-widest text-stone-400 mb-2">
                        Ordenes Completadas
                    </h3>
                    <p className="text-3xl font-serif text-white">48</p>
                </div>

                <div className="bg-[#121214] p-6 border border-stone-800 rounded">
                    <h3 className="text-sm uppercase tracking-widest text-stone-400 mb-2">
                        Ticket Promedio
                    </h3>
                    <p className="text-3xl font-serif text-white">S/ 94.16</p>
                </div>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-2 gap-6">
                {/* Ventas Semanales */}
                <div className="bg-[#121214] border border-stone-800 rounded p-6">
                    <h3 className="text-sm uppercase tracking-widest text-stone-400 mb-6">
                        Ventas Semanales
                    </h3>
                    <div className="flex items-end justify-between h-48 gap-2">
                        {days.map((day, i) => (
                            <div key={day} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className="w-full bg-[#C6A96B]/20 rounded-t relative"
                                    style={{ height: `${(salesData[i] / maxSale) * 100}%` }}
                                >
                                    <div
                                        className="absolute bottom-0 w-full bg-[#C6A96B] rounded-t transition-all hover:bg-[#C6A96B]/80"
                                        style={{ height: "100%" }}
                                    />
                                </div>
                                <span className="text-xs text-stone-500">{day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Productos Top */}
                <div className="bg-[#121214] border border-stone-800 rounded p-6">
                    <h3 className="text-sm uppercase tracking-widest text-stone-400 mb-6">
                        Productos Top
                    </h3>
                    <div className="space-y-4">
                        {[
                            "Filet Mignon",
                            "Ravioli de Langosta",
                            "Chablis Grand Cru",
                            "Mousse de Chocolate",
                        ].map((item, i) => (
                            <div key={item} className="flex items-center gap-4">
                                <span className="text-[#C6A96B] font-serif text-lg w-6">
                                    {i + 1}
                                </span>
                                <div className="flex-1">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>{item}</span>
                                        <span className="text-stone-400">{85 - i * 15} PEN</span>
                                    </div>
                                    <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#C6A96B] rounded-full"
                                            style={{ width: `${85 - i * 15}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}