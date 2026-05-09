// src/app/admin/components/InventoryView.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash, X } from "lucide-react";
import { useProductos } from "@/context/ProductoContext";
import { useInsumos } from "@/context/InsumoContext";
import { insumoService } from "@/services/insumoService";

export function InventoryView() {
    // PRODUCTOS desde backend
    const { menuItems, updateStock: updateProductStock, deleteMenuItem: deleteProduct } = useProductos();

    // INSUMOS desde backend
    const { insumos, updateStock: updateInsumoStock, deleteInsumo, refreshInsumos } = useInsumos();

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [addType, setAddType] = useState<"insumo" | "producto">("insumo");
    const [selectedItem, setSelectedItem] = useState<{ id: number; type: "insumo" | "producto"; data: any } | null>(null);
    const [insumoFilter, setInsumoFilter] = useState<string>("all");
    const [productoFilter, setProductoFilter] = useState<string>("all");
    const [formData, setFormData] = useState({
        name: "", unit: "kg", stock: "", category: "PLATO", price: ""
    });

    const INSUMO_CATEGORIES = ["all", "carnes", "ave", "caza", "pescados", "mariscos", "caviar", "verduras", "especias", "vinos", "bebidas"];
    const PRODUCTO_CATEGORIES = ["all", "PLATO", "BEBIDA", "POSTRE"];

    const getStockState = (stock: number) => {
        if (stock === 0) return { label: "Agotado", color: "text-red-500 border-red-500/30 bg-red-900/10" };
        if (stock < 10) return { label: "Stock Bajo", color: "text-red-500 border-red-500/30 bg-red-900/10" };
        return { label: "Disponible", color: "text-stone-500" };
    };

    // INSUMOS filtrados
    const filteredInventory = insumoFilter === "all"
        ? insumos
        : insumos.filter((item: any) => item.categoria === insumoFilter);

    // PRODUCTOS filtrados
    const filteredProducts = productoFilter === "all"
        ? menuItems
        : menuItems.filter((item: any) => item.categoria === productoFilter);

    const openAddModal = () => {
        setFormData({ name: "", unit: "kg", stock: "", category: "PLATO", price: "" });
        setAddType("insumo");
        setShowAddModal(true);
    };

    const openEditModal = (id: number, type: "insumo" | "producto", data: any) => {
        setSelectedItem({ id, type, data });
        if (type === "producto") {
            setFormData({
                name: data.nombre,
                unit: "",
                stock: data.stock?.toString() || "0",
                category: data.categoria,
                price: data.precio.toString()
            });
        } else {
            setFormData({
                name: data.nombre,
                unit: data.unidadMedida || "kg",
                stock: data.stock.toString(),
                category: data.categoria || "",
                price: ""
            });
        }
        setAddType(type);
        setShowEditModal(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await insumoService.create({
                nombre: formData.name,
                unidadMedida: formData.unit as any,
                stock: parseInt(formData.stock) || 0,
                estadoInsumo: "DISPONIBLE"
            });
            await refreshInsumos();
            setShowAddModal(false);
            setFormData({ name: "", unit: "kg", stock: "", category: "Plato", price: "" });
        } catch (error) {
            console.error('Error al guardar insumo:', error);
            alert('Error al guardar insumo');
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedItem?.type === "producto") {
            const nuevoStock = parseInt(formData.stock) || 0;
            if (nuevoStock < 0) {
                alert('El stock no puede ser negativo');
                return;
            }
            try {
                await updateProductStock(selectedItem.id, nuevoStock);
                setShowEditModal(false);
                setSelectedItem(null);
            } catch (error) {
                console.error('Error actualizando stock de producto:', error);
                alert('Error al actualizar el stock del producto');
            }
        } else if (selectedItem?.type === "insumo") {
            const nuevoStock = parseInt(formData.stock) || 0;
            if (nuevoStock < 0) {
                alert('El stock no puede ser negativo');
                return;
            }
            try {
                await updateInsumoStock(selectedItem.id, nuevoStock);
                setShowEditModal(false);
                setSelectedItem(null);
            } catch (error) {
                console.error('Error actualizando stock de insumo:', error);
                alert('Error al actualizar el stock del insumo');
            }
        }
    };

    const handleDelete = async (id: number, type: "insumo" | "producto", name: string) => {
        if (confirm(`¿Está seguro de eliminar "${name}"?`)) {
            try {
                if (type === "producto") {
                    await deleteProduct(id);
                } else {
                    await deleteInsumo(id);
                }
            } catch (error) {
                console.error('Error eliminando:', error);
                alert('Error al eliminar');
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-serif text-white">Inventario</h2>
                <button onClick={openAddModal} className="flex items-center gap-2 bg-[#C6A96B] text-black px-4 py-2 rounded text-sm uppercase tracking-widest hover:bg-white transition-colors">
                    <Plus className="w-4 h-4" />
                    Agregar
                </button>
            </div>

            {/* CUADRO 1: INSUMOS */}
            <div className="bg-[#121214] border border-stone-800 rounded overflow-hidden">
                <div className="p-4 border-b border-stone-800 bg-black/20 flex flex-wrap gap-4 justify-between items-center">
                    <h3 className="text-lg font-serif text-[#C6A96B]">Cuadro de Insumos</h3>
                    <div className="flex gap-2 flex-wrap">
                        {INSUMO_CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setInsumoFilter(cat)}
                                className={`px-2 py-1 rounded text-xs uppercase tracking-widest transition-colors ${insumoFilter === cat ? "bg-[#C6A96B] text-black" : "border border-stone-700 text-stone-400 hover:text-white"}`}
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
                            <th className="p-3">Unidad</th>
                            <th className="p-3">Stock</th>
                            <th className="p-3">Estado</th>
                            <th className="p-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800 text-sm">
                        {filteredInventory.map((item: any) => {
                            const state = getStockState(item.stock);
                            return (
                                <tr key={item.insumoid} className={item.stock < 10 ? "bg-red-900/10" : ""}>
                                    <td className="p-3 font-medium">{item.nombre}</td>
                                    <td className="p-3 text-stone-400">{item.unidadMedida}</td>
                                    <td className="p-3 font-mono">{item.stock}</td>
                                    <td className="p-3">
                                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 border rounded-full text-xs ${state.color}`}>
                                            {state.label}
                                        </span>
                                    </td>
                                    <td className="p-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => openEditModal(item.insumoid, "insumo", item)} className="p-2 border border-stone-700 hover:border-[#C6A96B] text-stone-400 hover:text-[#C6A96B] rounded transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(item.insumoid, "insumo", item.nombre)} className="p-2 border border-stone-700 hover:border-red-500 text-stone-400 hover:text-red-500 rounded transition-colors">
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* CUADRO 2: PRODUCTOS */}
            <div className="bg-[#121214] border border-stone-800 rounded overflow-hidden">
                <div className="p-4 border-b border-stone-800 bg-black/20 flex flex-wrap gap-4 justify-between items-center">
                    <h3 className="text-lg font-serif text-[#C6A96B]">Cuadro de Productos</h3>
                    <div className="flex gap-2">
                        {PRODUCTO_CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setProductoFilter(cat)}
                                className={`px-2 py-1 rounded text-xs uppercase tracking-widest transition-colors ${productoFilter === cat ? "bg-[#C6A96B] text-black" : "border border-stone-700 text-stone-400 hover:text-white"}`}
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
                            <th className="p-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800 text-sm">
                        {filteredProducts.map((item: any) => {
                            const state = getStockState(item.stock);
                            return (
                                <tr key={item.productoid}>
                                    <td className="p-3 font-medium">{item.nombre}</td>
                                    <td className="p-3 text-stone-400">{item.categoria}</td>
                                    <td className="p-3 text-[#C6A96B]">S/ {item.precio.toFixed(2)}</td>
                                    <td className="p-3 font-mono">{item.stock}</td>
                                    <td className="p-3 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => openEditModal(item.productoid, "producto", item)} className="p-2 border border-stone-700 hover:border-[#C6A96B] text-stone-400 hover:text-[#C6A96B] rounded transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(item.productoid, "producto", item.nombre)} className="p-2 border border-stone-700 hover:border-red-500 text-stone-400 hover:text-red-500 rounded transition-colors">
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
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
                            <h2 className="text-xl font-serif text-[#C6A96B] mb-4">Agregar Insumo</h2>

                            <form onSubmit={handleSave} className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                            Unidad
                                        </label>
                                        <select
                                            value={formData.unit}
                                            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                            className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded"
                                        >
                                            <option>kg</option>
                                            <option>latas</option>
                                            <option>g</option>
                                            <option>L</option>
                                            <option>ml</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                            Stock
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.stock}
                                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                            className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                        className="flex-1 border border-stone-800 text-stone-400 py-2 hover:text-white rounded"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-[#C6A96B] text-black py-2 hover:bg-white rounded"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* MODAL EDITAR STOCK */}
            <AnimatePresence>
                {showEditModal && selectedItem && (
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
                                {selectedItem?.type === "producto" ? "Editar Stock de Producto" : "Editar Insumo"}
                            </h2>

                            <form onSubmit={handleUpdate} className="space-y-4">
                                {selectedItem?.type === "producto" ? (
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                            Stock
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.stock}
                                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                            className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded"
                                            required
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                                Nombre
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded"
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                                    Unidad
                                                </label>
                                                <select
                                                    value={formData.unit}
                                                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                                                    className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded"
                                                >
                                                    <option>kg</option>
                                                    <option>latas</option>
                                                    <option>g</option>
                                                    <option>L</option>
                                                    <option>ml</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                                    Stock
                                                </label>
                                                <input
                                                    type="number"
                                                    value={formData.stock}
                                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                                    className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}

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