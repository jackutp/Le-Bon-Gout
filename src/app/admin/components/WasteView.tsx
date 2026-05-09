// src/app/admin/components/WasteView.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash, X } from "lucide-react";
import { useMermas } from "@/context/MermaContext";

export function WasteView() {
    const { mermas, productos, insumos, addMerma, updateMerma, deleteMerma, loading } = useMermas();
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [selectedTipo, setSelectedTipo] = useState<"PRODUCTO" | "INSUMO">("PRODUCTO");
    const [formData, setFormData] = useState({
        tipoMerma: "PRODUCTO" as "PRODUCTO" | "INSUMO",
        nombreMerma: "",
        cantidad: "",
        motivo: "",
        referenciaId: undefined as number | undefined,
        unidadMedida: "",
    });

    const openAddModal = () => {
        setEditingItem(null);
        setFormData({
            tipoMerma: "PRODUCTO",
            nombreMerma: "",
            cantidad: "",
            motivo: "",
            referenciaId: undefined,
            unidadMedida: "",
        });
        setShowModal(true);
    };

    const openEditModal = (item: any) => {
        setEditingItem(item);
        setFormData({
            tipoMerma: item.tipoMerma,
            nombreMerma: item.nombreMerma,
            cantidad: item.cantidad,
            motivo: item.motivo,
            referenciaId: item.referenciaId,
            unidadMedida: item.unidadMedida || "",
        });
        setShowEditModal(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addMerma({
                tipoMerma: formData.tipoMerma,
                nombreMerma: formData.nombreMerma,
                cantidad: formData.cantidad,
                motivo: formData.motivo,
                referenciaId: formData.referenciaId,
                unidadMedida: formData.unidadMedida,
            });
            setShowModal(false);
            resetForm();
        } catch (error) {
            console.error('Error guardando merma:', error);
            alert('Error al guardar la merma');
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingItem) return;
        try {
            await updateMerma(editingItem.mermaid, {
                tipoMerma: formData.tipoMerma,
                nombreMerma: formData.nombreMerma,
                cantidad: formData.cantidad,
                motivo: formData.motivo,
                referenciaId: formData.referenciaId,
                unidadMedida: formData.unidadMedida,
            });
            setShowEditModal(false);
            setEditingItem(null);
            resetForm();
        } catch (error) {
            console.error('Error actualizando merma:', error);
            alert('Error al actualizar la merma');
        }
    };

    const handleDelete = async (id: number, nombre: string) => {
        if (confirm(`¿Está seguro de eliminar la merma de "${nombre}"?`)) {
            try {
                await deleteMerma(id);
            } catch (error) {
                console.error('Error eliminando merma:', error);
                alert('Error al eliminar la merma');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            tipoMerma: "PRODUCTO",
            nombreMerma: "",
            cantidad: "",
            motivo: "",
            referenciaId: undefined,
            unidadMedida: "",
        });
    };

    const handleTipoChange = (tipo: "PRODUCTO" | "INSUMO") => {
        setSelectedTipo(tipo);
        setFormData({
            ...formData,
            tipoMerma: tipo,
            nombreMerma: "",
            referenciaId: undefined,
            unidadMedida: "",
        });
    };

    const handleNombreChange = (nombre: string) => {
        setFormData({ ...formData, nombreMerma: nombre });
        if (formData.tipoMerma === "PRODUCTO") {
            const producto = productos.find(p => p.nombre === nombre);
            if (producto) {
                setFormData(prev => ({ ...prev, nombreMerma: nombre, referenciaId: producto.productoid }));
            }
        } else {
            const insumo = insumos.find(i => i.nombre === nombre);
            if (insumo) {
                setFormData(prev => ({
                    ...prev,
                    nombreMerma: nombre,
                    referenciaId: insumo.insumoid,
                    unidadMedida: insumo.unidadMedida
                }));
            }
        }
    };

    if (loading) {
        return <div className="text-center py-12 text-stone-400">Cargando mermas...</div>;
    }

    return (
        <div className="bg-[#121214] border border-stone-800 rounded p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif text-white">Registro de Mermas</h2>
                <button
                    onClick={openAddModal}
                    className="bg-red-900/30 text-red-500 border border-red-500/50 px-4 py-2 rounded text-sm uppercase tracking-widest hover:bg-red-900/50 transition-colors flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Registrar Merma
                </button>
            </div>

            <table className="w-full text-left">
                <thead className="bg-black/40 border-b border-stone-800 text-xs uppercase tracking-widest text-stone-400">
                    <tr>
                        <th className="p-4">Tipo</th>
                        <th className="p-4">Nombre</th>
                        <th className="p-4">Cantidad</th>
                        <th className="p-4">Motivo</th>
                        <th className="p-4">Fecha</th>
                        <th className="p-4 text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-stone-800 text-sm">
                    {mermas.map((item) => (
                        <tr key={item.mermaid}>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded text-xs ${item.tipoMerma === "PRODUCTO"
                                        ? "bg-blue-500/20 text-blue-500"
                                        : "bg-green-500/20 text-green-500"
                                    }`}>
                                    {item.tipoMerma === "PRODUCTO" ? "Producto" : "Insumo"}
                                </span>
                            </td>
                            <td className="p-4 font-medium">{item.nombreMerma}</td>
                            <td className="p-4">
                                {item.cantidad} {item.unidadMedida && item.tipoMerma === "INSUMO" ? item.unidadMedida : ""}
                            </td>
                            <td className="p-4 italic text-stone-400">{item.motivo}</td>
                            <td className="p-4 text-stone-500">
                                {item.fecha ? new Date(item.fecha).toLocaleString() : ""}
                            </td>
                            <td className="p-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => openEditModal(item)}
                                        className="p-2 border border-stone-700 hover:border-[#C6A96B] text-stone-400 hover:text-[#C6A96B] rounded transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.mermaid!, item.nombreMerma)}
                                        className="p-2 border border-stone-700 hover:border-red-500 text-stone-400 hover:text-red-500 rounded transition-colors"
                                    >
                                        <Trash className="w-4 h-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* MODAL AGREGAR */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setShowModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative bg-[#121214] border border-stone-800 shadow-2xl p-8 max-w-md w-full"
                        >
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 text-stone-500 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-2xl font-serif text-red-500 mb-6">Registrar Merma</h2>

                            <form onSubmit={handleSave} className="space-y-4">
                                {/* Tipo de Merma */}
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Tipo
                                    </label>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => handleTipoChange("PRODUCTO")}
                                            className={`flex-1 py-2 rounded text-sm uppercase tracking-widest transition-colors ${selectedTipo === "PRODUCTO"
                                                    ? "bg-blue-600 text-white"
                                                    : "border border-stone-700 text-stone-400 hover:text-white"
                                                }`}
                                        >
                                            Producto
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleTipoChange("INSUMO")}
                                            className={`flex-1 py-2 rounded text-sm uppercase tracking-widest transition-colors ${selectedTipo === "INSUMO"
                                                    ? "bg-green-600 text-white"
                                                    : "border border-stone-700 text-stone-400 hover:text-white"
                                                }`}
                                        >
                                            Insumo
                                        </button>
                                    </div>
                                </div>

                                {/* Nombre */}
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Nombre del {selectedTipo === "PRODUCTO" ? "Producto" : "Insumo"}
                                    </label>
                                    <select
                                        value={formData.nombreMerma}
                                        onChange={(e) => handleNombreChange(e.target.value)}
                                        className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded"
                                        required
                                    >
                                        <option value="">Seleccionar...</option>
                                        {(selectedTipo === "PRODUCTO" ? productos : insumos).map((item) => (
                                            <option key={selectedTipo === "PRODUCTO" ? (item as any).productoid : (item as any).insumoid} value={item.nombre}>
                                                {item.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Cantidad */}
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Cantidad
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={formData.cantidad}
                                            onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
                                            placeholder={selectedTipo === "INSUMO" ? "Ej: 0.5" : "Ej: 1 porción"}
                                            className="flex-1 bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded"
                                            required
                                        />
                                        {selectedTipo === "INSUMO" && formData.unidadMedida && (
                                            <span className="px-3 py-2 bg-stone-800 rounded text-stone-400">
                                                {formData.unidadMedida}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Motivo */}
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Motivo
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.motivo}
                                        onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                                        placeholder="Se cayó, mal estado, cliente canceló..."
                                        className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded"
                                        required
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 border border-stone-800 text-stone-400 py-3 hover:text-white rounded"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-red-500 text-white py-3 hover:bg-red-600 rounded"
                                    >
                                        Registrar
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* MODAL EDITAR */}
            <AnimatePresence>
                {showEditModal && editingItem && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setShowEditModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative bg-[#121214] border border-stone-800 shadow-2xl p-8 max-w-md w-full"
                        >
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="absolute top-4 right-4 text-stone-500 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-2xl font-serif text-[#C6A96B] mb-6">Editar Merma</h2>

                            <form onSubmit={handleUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Cantidad
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.cantidad}
                                        onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
                                        className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Motivo
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.motivo}
                                        onChange={(e) => setFormData({ ...formData, motivo: e.target.value })}
                                        className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded"
                                        required
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        className="flex-1 border border-stone-800 text-stone-400 py-3 hover:text-white rounded"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-[#C6A96B] text-black py-3 hover:bg-white rounded"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}