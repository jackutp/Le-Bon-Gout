// src/app/admin/components/InsumosView.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash, X, Search } from "lucide-react";
import { useInsumos } from "@/context/InsumoContext";
import { insumoService } from "@/services/insumoService";

const INSUMO_CATEGORIES = [
    "all", "carnes", "ave", "caza", "pescados", "mariscos",
    "caviar", "verduras", "especias", "vinos", "bebidas"
];

const UNIDADES = ["KG", "LATAS", "G", "L", "ML"];

export function InsumosView() {
    const { insumos, updateInsumo, deleteInsumo, refreshInsumos, searchInsumos, loading, error } = useInsumos();

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedInsumo, setSelectedInsumo] = useState<any>(null);
    const [insumoFilter, setInsumoFilter] = useState<string>("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredInsumos, setFilteredInsumos] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        nombre: "",
        unidadMedida: "KG" as "KG" | "LATAS" | "G" | "L" | "ML",
        stock: 0,
    });

    const getStockState = (stock: number) => {
        if (stock === 0)
            return { label: "Agotado", color: "text-red-500 border-red-500/30 bg-red-900/10" };
        if (stock < 10)
            return { label: "Stock Bajo", color: "text-red-500 border-red-500/30 bg-red-900/10" };
        return { label: "Disponible", color: "text-stone-500" };
    };

    // Filtrar y buscar insumos
    useEffect(() => {
        let result = [...insumos];

        // Filtro por categoría
        if (insumoFilter !== "all") {
            result = result.filter((item: any) => item.categoria === insumoFilter);
        }

        // Búsqueda local por nombre
        if (searchTerm.trim().length >= 2) {
            result = result.filter((item: any) =>
                item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            );

            // Si no hay resultados locales, buscar en backend
            if (result.length === 0) {
                searchInsumos(searchTerm).then((backendResults) => {
                    setFilteredInsumos(backendResults);
                }).catch(() => {
                    setFilteredInsumos([]);
                });
                return;
            }
        }

        setFilteredInsumos(result);
    }, [insumos, insumoFilter, searchTerm, searchInsumos]);

    const resetForm = () => {
        setFormData({ nombre: "", unidadMedida: "KG", stock: 0 });
    };

    const openAddModal = () => {
        resetForm();
        setShowAddModal(true);
    };

    const openEditModal = (insumo: any) => {
        setSelectedInsumo(insumo);
        setFormData({
            nombre: insumo.nombre,
            unidadMedida: insumo.unidadMedida || "KG",
            stock: insumo.stock,
        });
        setShowEditModal(true);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.nombre.trim() || formData.stock < 0) {
            alert("Complete todos los campos correctamente");
            return;
        }
        try {
            await insumoService.create({
                nombre: formData.nombre.trim(),
                unidadMedida: formData.unidadMedida,
                stock: formData.stock,
                estadoInsumo: formData.stock > 0 ? "DISPONIBLE" : "VACIO",
            });
            await refreshInsumos();
            setShowAddModal(false);
            resetForm();
        } catch (error: any) {
            console.error("Error al guardar insumo:", error);
            alert(error.message || "Error al guardar insumo");
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedInsumo) return;

        try {
            // Usar PUT completo para actualizar nombre, unidad Y stock
            await updateInsumo(selectedInsumo.insumoid, {
                nombre: formData.nombre.trim(),
                unidadMedida: formData.unidadMedida,
                stock: formData.stock,
                estadoInsumo: formData.stock > 0 ? "DISPONIBLE" : "VACIO",
            });
            setShowEditModal(false);
            setSelectedInsumo(null);
            resetForm();
        } catch (error: any) {
            console.error("Error actualizando insumo:", error);
            alert(error.message || "Error al actualizar el insumo");
        }
    };

    const handleDelete = async (id: number, nombre: string) => {
        if (confirm(`¿Está seguro de eliminar "${nombre}"?`)) {
            try {
                await deleteInsumo(id);
            } catch (error) {
                console.error("Error eliminando insumo:", error);
                alert("Error al eliminar insumo");
            }
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-serif text-white">Inventario de Insumos</h2>
                </div>
                <div className="bg-[#121214] border border-stone-800 rounded p-12 text-center text-stone-500">
                    Cargando insumos...
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-serif text-white">Inventario de Insumos</h2>
                </div>
                <div className="bg-[#121214] border border-stone-800 rounded p-12 text-center">
                    <p className="text-red-500 mb-4">Error: {error}</p>
                    <button
                        onClick={refreshInsumos}
                        className="text-[#C6A96B] underline hover:text-white"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Encabezado */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-serif text-white">Inventario de Insumos</h2>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 bg-[#C6A96B] text-black px-4 py-2 rounded text-sm uppercase tracking-widest hover:bg-white transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Agregar Insumo
                </button>
            </div>

            {/* Tabla de Insumos */}
            <div className="bg-[#121214] border border-stone-800 rounded overflow-hidden">
                <div className="p-4 border-b border-stone-800 bg-black/20 space-y-4">
                    <div className="flex flex-wrap gap-4 justify-between items-center">
                        <h3 className="text-lg font-serif text-[#C6A96B]">Cuadro de Insumos</h3>
                        <div className="flex gap-2 flex-wrap">
                            {INSUMO_CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setInsumoFilter(cat)}
                                    className={`px-2 py-1 rounded text-xs uppercase tracking-widest transition-colors ${insumoFilter === cat
                                            ? "bg-[#C6A96B] text-black"
                                            : "border border-stone-700 text-stone-400 hover:text-white"
                                        }`}
                                >
                                    {cat === "all" ? "Todos" : cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* BUSCADOR */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar insumo por nombre..."
                            className="w-full bg-[#0B0B0C] border border-stone-800 text-white pl-10 pr-10 py-2 rounded text-sm focus:border-[#C6A96B] outline-none transition-colors"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                <table className="w-full text-left">
                    <thead className="bg-black/40 border-b border-stone-800 text-xs uppercase tracking-widest text-stone-400">
                        <tr>
                            <th className="p-3">Nombre</th>
                            <th className="p-3">Unidad</th>
                            <th className="p-3">Stock</th>
                            <th className="p-3">Estado</th>
                            <th className="p-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800 text-sm">
                        {filteredInsumos.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-stone-500">
                                    {searchTerm
                                        ? `No se encontraron insumos con "${searchTerm}"`
                                        : "No se encontraron insumos"}
                                </td>
                            </tr>
                        ) : (
                            filteredInsumos.map((item: any) => {
                                const state = getStockState(item.stock);
                                return (
                                    <tr
                                        key={item.insumoid}
                                        className={item.stock < 10 ? "bg-red-900/10" : ""}
                                    >
                                        <td className="p-3 font-medium">{item.nombre}</td>
                                        <td className="p-3 text-stone-400">{item.unidadMedida}</td>
                                        <td className="p-3 font-mono">{item.stock}</td>
                                        <td className="p-3">
                                            <span
                                                className={`inline-flex items-center gap-1 px-2 py-0.5 border rounded-full text-xs ${state.color}`}
                                            >
                                                {state.label}
                                            </span>
                                        </td>
                                        <td className="p-3 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => openEditModal(item)}
                                                    className="p-2 border border-stone-700 hover:border-[#C6A96B] text-stone-400 hover:text-[#C6A96B] rounded transition-colors"
                                                    title="Editar insumo"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.insumoid, item.nombre)}
                                                    className="p-2 border border-stone-700 hover:border-red-500 text-stone-400 hover:text-red-500 rounded transition-colors"
                                                    title="Eliminar insumo"
                                                >
                                                    <Trash className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* MODAL AGREGAR INSUMO */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setShowAddModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative bg-[#121214] border border-stone-800 shadow-2xl p-6 max-w-md w-full"
                        >
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="absolute top-4 right-4 text-stone-500 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-serif text-[#C6A96B] mb-4">
                                Agregar Insumo
                            </h2>

                            <form onSubmit={handleAdd} className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.nombre}
                                        onChange={(e) =>
                                            setFormData({ ...formData, nombre: e.target.value })
                                        }
                                        placeholder="Ej: Harina de trigo"
                                        className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded focus:border-[#C6A96B] outline-none transition-colors"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                            Unidad
                                        </label>
                                        <select
                                            value={formData.unidadMedida}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    unidadMedida: e.target.value as any,
                                                })
                                            }
                                            className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded focus:border-[#C6A96B] outline-none transition-colors"
                                        >
                                            {UNIDADES.map((u) => (
                                                <option key={u} value={u}>
                                                    {u}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                            Stock Inicial
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.stock}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    stock: parseInt(e.target.value) || 0,
                                                })
                                            }
                                            min="0"
                                            className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded focus:border-[#C6A96B] outline-none transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                        className="flex-1 border border-stone-800 text-stone-400 py-2 hover:text-white rounded transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-[#C6A96B] text-black py-2 hover:bg-white rounded transition-colors"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* MODAL EDITAR INSUMO */}
            <AnimatePresence>
                {showEditModal && selectedInsumo && (
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
                            className="relative bg-[#121214] border border-stone-800 shadow-2xl p-6 max-w-md w-full"
                        >
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="absolute top-4 right-4 text-stone-500 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-serif text-[#C6A96B] mb-4">
                                Editar Insumo
                            </h2>

                            {/* Info actual */}
                            <div className="mb-4 p-3 bg-black/20 rounded border border-stone-800">
                                <p className="text-xs text-stone-400">
                                    Nombre actual: <span className="text-white">{selectedInsumo.nombre}</span>
                                </p>
                                <p className="text-xs text-stone-400">
                                    Stock actual: <span className="text-white">{selectedInsumo.stock}</span>
                                </p>
                            </div>

                            <form onSubmit={handleUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.nombre}
                                        onChange={(e) =>
                                            setFormData({ ...formData, nombre: e.target.value })
                                        }
                                        className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded focus:border-[#C6A96B] outline-none transition-colors"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                            Unidad
                                        </label>
                                        <select
                                            value={formData.unidadMedida}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    unidadMedida: e.target.value as any,
                                                })
                                            }
                                            className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded focus:border-[#C6A96B] outline-none transition-colors"
                                        >
                                            {UNIDADES.map((u) => (
                                                <option key={u} value={u}>
                                                    {u}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                            Stock
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.stock}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    stock: parseInt(e.target.value) || 0,
                                                })
                                            }
                                            min="0"
                                            className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded focus:border-[#C6A96B] outline-none transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        className="flex-1 border border-stone-800 text-stone-400 py-2 hover:text-white rounded transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-[#C6A96B] text-black py-2 hover:bg-white rounded transition-colors"
                                    >
                                        Guardar Cambios
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