// src/app/admin/components/ComprobantesView.tsx

"use client";

import { useState } from "react";
import { useComprobantes } from "@/context/ComprobanteContext";
import { FileText, Download, Search, Eye } from "lucide-react";

export function ComprobantesView() {
    const { comprobantes, isLoading, descargarPdf } = useComprobantes();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterTipo, setFilterTipo] = useState("todos");

    const filteredComprobantes = comprobantes.filter(comp => {
        const matchesSearch = comp.numeroCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
            comp.ordenId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            comp.mesaNumero.toString().includes(searchTerm);
        const matchesTipo = filterTipo === "todos" || comp.tipo === filterTipo;
        return matchesSearch && matchesTipo;
    });

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).toLocaleString("es-PE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C6A96B]"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-serif text-white">Comprobantes Electrónicos</h2>
                    <p className="text-stone-400 text-sm mt-1">
                        Gestiona boletas y facturas emitidas
                    </p>
                </div>
                <div className="text-sm text-stone-500">
                    Total: {filteredComprobantes.length} comprobantes
                </div>
            </div>

            {/* Filtros */}
            <div className="flex gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-500" />
                        <input
                            type="text"
                            placeholder="Buscar por número, orden o mesa..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#121214] border border-stone-800 rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:border-[#C6A96B] outline-none"
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    {["todos", "BOLETA", "FACTURA"].map((tipo) => (
                        <button
                            key={tipo}
                            onClick={() => setFilterTipo(tipo)}
                            className={`px-4 py-2 rounded text-sm uppercase tracking-widest transition-colors ${filterTipo === tipo
                                ? "bg-[#C6A96B] text-black"
                                : "border border-stone-800 text-stone-400 hover:text-white hover:border-stone-600"
                                }`}
                        >
                            {tipo === "todos" ? "Todos" : tipo}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tabla de comprobantes */}
            <div className="bg-[#121214] border border-stone-800 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-stone-900/50 border-b border-stone-800">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-stone-400 uppercase tracking-wider">
                                    Tipo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-stone-400 uppercase tracking-wider">
                                    Número
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-stone-400 uppercase tracking-wider">
                                    Mesa
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-stone-400 uppercase tracking-wider">
                                    Orden ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-stone-400 uppercase tracking-wider">
                                    Total
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-stone-400 uppercase tracking-wider">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-800">
                            {filteredComprobantes.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-stone-500">
                                        <FileText className="w-12 h-12 mx-auto mb-3 text-stone-700" />
                                        No hay comprobantes registrados
                                    </td>
                                </tr>
                            ) : (
                                filteredComprobantes.map((comprobante) => (
                                    <tr key={comprobante.id} className="hover:bg-stone-900/30 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${comprobante.tipo === "BOLETA"
                                                ? "bg-green-500/10 text-green-500 border border-green-500/30"
                                                : "bg-blue-500/10 text-blue-500 border border-blue-500/30"
                                                }`}>
                                                {comprobante.tipo}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-white">
                                            {comprobante.numeroCompleto}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-300">
                                            Mesa {comprobante.mesaNumero}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-stone-400">
                                            {comprobante.ordenId}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#C6A96B]">
                                            S/ {comprobante.total.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <button
                                                onClick={() => descargarPdf(comprobante.id)}
                                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#C6A96B]/10 text-[#C6A96B] border border-[#C6A96B]/30 hover:bg-[#C6A96B]/20 transition-colors text-xs"
                                                title="Descargar PDF"
                                            >
                                                <Download className="w-3 h-3" />
                                                PDF
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}