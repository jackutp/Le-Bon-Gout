// src/app/admin/components/ProductosView.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, X } from "lucide-react";
import { useProductos } from "@/context/ProductoContext";

const PRODUCTO_CATEGORIES = ["all", "PLATO", "BEBIDA", "POSTRE"];

export function ProductosView() {
    const { menuItems, updateStock } = useProductos();

    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProducto, setSelectedProducto] = useState<any>(null);
    const [productoFilter, setProductoFilter] = useState<string>("all");
    const [nuevoStock, setNuevoStock] = useState<number>(0);

    const getStockState = (stock: number) => {
        if (stock === 0)
            return { label: "Agotado", color: "text-red-500 border-red-500/30 bg-red-900/10" };
        if (stock < 10)
            return { label: "Stock Bajo", color: "text-red-500 border-red-500/30 bg-red-900/10" };
        return { label: "Disponible", color: "text-stone-500" };
    };

    const filteredProductos =
        productoFilter === "all"
            ? menuItems
            : menuItems.filter((item: any) => item.categoria === productoFilter);

    const openEditModal = (producto: any) => {
        setSelectedProducto(producto);
        setNuevoStock(producto.stock);
        setShowEditModal(true);
    };

    const handleUpdateStock = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedProducto || nuevoStock < 0) {
            alert("El stock no puede ser negativo");
            return;
        }
        try {
            await updateStock(selectedProducto.productoid, nuevoStock);
            setShowEditModal(false);
            setSelectedProducto(null);
        } catch (error) {
            console.error("Error actualizando stock de producto:", error);
            alert("Error al actualizar el stock del producto");
        }
    };

    return (
        <div className="space-y-6">
            {/* Encabezado */}
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-serif text-white">Inventario de Productos</h2>
                <p className="text-xs text-stone-500">
                    {menuItems.length} productos registrados
                </p>
            </div>

            {/* Tabla de Productos */}
            <div className="bg-[#121214] border border-stone-800 rounded overflow-hidden">
                <div className="p-4 border-b border-stone-800 bg-black/20 flex flex-wrap gap-4 justify-between items-center">
                    <h3 className="text-lg font-serif text-[#C6A96B]">Cuadro de Productos</h3>
                    <div className="flex gap-2">
                        {PRODUCTO_CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setProductoFilter(cat)}
                                className={`px-2 py-1 rounded text-xs uppercase tracking-widest transition-colors ${productoFilter === cat
                                        ? "bg-[#C6A96B] text-black"
                                        : "border border-stone-700 text-stone-400 hover:text-white"
                                    }`}
                            >
                                {cat === "all" ? "Todos" : cat}
                            </button>
                        ))}
                    </div>
                </div>

                <table className="w-full text-left">
                    <thead className="bg-black/40 border-b border-stone-800 text-xs uppercase tracking-widest text-stone-400">
                        <tr>
                            <th className="p-3">Nombre</th>
                            <th className="p-3">Categoría</th>
                            <th className="p-3">Precio</th>
                            <th className="p-3">Stock</th>
                            <th className="p-3">Estado</th>
                            <th className="p-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800 text-sm">
                        {filteredProductos.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-stone-500">
                                    No se encontraron productos
                                </td>
                            </tr>
                        ) : (
                            filteredProductos.map((item: any) => {
                                const state = getStockState(item.stock);
                                return (
                                    <tr
                                        key={item.productoid}
                                        className={item.stock < 10 ? "bg-red-900/10" : ""}
                                    >
                                        <td className="p-3 font-medium">{item.nombre}</td>
                                        <td className="p-3 text-stone-400">{item.categoria}</td>
                                        <td className="p-3 text-[#C6A96B]">
                                            S/ {item.precio.toFixed(2)}
                                        </td>
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
                                                >
                                                    <Edit className="w-4 h-4" />
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

            {/* MODAL EDITAR STOCK DE PRODUCTO */}
            <AnimatePresence>
                {showEditModal && selectedProducto && (
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
                                Editar Stock: {selectedProducto.nombre}
                            </h2>

                            <div className="mb-4 p-3 bg-black/20 rounded border border-stone-800">
                                <p className="text-xs text-stone-400">
                                    Categoría: {selectedProducto.categoria}
                                </p>
                                <p className="text-xs text-stone-400">
                                    Precio: S/ {selectedProducto.precio.toFixed(2)}
                                </p>
                                <p className="text-xs text-stone-400">
                                    Stock actual: {selectedProducto.stock}
                                </p>
                            </div>

                            <form onSubmit={handleUpdateStock} className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Nuevo Stock
                                    </label>
                                    <input
                                        type="number"
                                        value={nuevoStock}
                                        onChange={(e) =>
                                            setNuevoStock(parseInt(e.target.value) || 0)
                                        }
                                        min="0"
                                        className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded"
                                        required
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        className="flex-1 border border-stone-800 text-stone-400 py-2 hover:text-white rounded"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-[#C6A96B] text-black py-2 hover:bg-white rounded"
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