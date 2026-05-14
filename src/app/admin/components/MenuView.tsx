// src/app/admin/components/MenuView.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash, X, Upload } from "lucide-react";
import { useProductos } from "@/context/ProductoContext";
import { productoService } from "@/services/productoService";

export function MenuView() {
    const { menuItems, loading, refreshProducts, error } = useProductos();
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [newItem, setNewItem] = useState({
        nombre: "",
        precio: "",
        descripcion: "",
        categoria: "PLATO" as "PLATO" | "BEBIDA" | "POSTRE",
        imagen: null as File | null,
    });
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);

    const openEdit = (item: any) => {
        setEditingItem(item);
        setNewItem({
            nombre: item.nombre,
            precio: item.precio.toString(),
            descripcion: item.descripcion || "",
            categoria: item.categoria,
            imagen: null,
        });
        setImagePreview(item.imagenUrl || null);
        setShowModal(true);
    };

    const openAdd = () => {
        setEditingItem(null);
        setNewItem({
            nombre: "",
            precio: "",
            descripcion: "",
            categoria: "PLATO",
            imagen: null,
        });
        setImagePreview(null);
        setShowModal(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setNewItem({ ...newItem, imagen: file });
        }
    };

    const saveItem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItem.nombre || !newItem.precio) return;

        setSaving(true);

        try {
            // Siempre usar FormData porque el backend espera multipart/form-data
            const formData = new FormData();
            formData.append("nombre", newItem.nombre);
            formData.append("descripcion", newItem.descripcion);
            formData.append("precio", newItem.precio);
            formData.append("categoria", newItem.categoria);

            if (newItem.imagen) {
                formData.append("imagen", newItem.imagen);
            }

            if (editingItem) {
                await productoService.update(editingItem.productoid, formData);
            } else {
                await productoService.createWithImage(formData);
            }

            setShowModal(false);
            await refreshProducts();
        } catch (error: any) {
            console.error('Error guardando producto:', error);
            alert(`Error al guardar el producto: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteItem = async (id: number, nombre: string) => {
        if (confirm(`¿Estás seguro de eliminar "${nombre}"?`)) {
            try {
                await productoService.delete(id);
                await refreshProducts();
            } catch (error: any) {
                console.error('Error eliminando producto:', error);
                alert(`Error al eliminar el producto: ${error.message}`);
            }
        }
    };

    if (loading) {
        return (
            <div className="text-center py-12 text-stone-400">
                <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
                Cargando productos...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500 mb-4">Error: {error}</p>
                <button onClick={refreshProducts} className="text-amber-500 underline hover:text-white">
                    Reintentar
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-serif text-white">Gestión de Menú</h2>
                    <p className="text-stone-400 text-sm mt-1">
                        Gestiona los platillos visibles en el catálogo de meseros.
                    </p>
                </div>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 bg-[#C6A96B] text-black px-4 py-2 rounded text-sm uppercase tracking-widest hover:bg-white transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Nuevo Platillo
                </button>
            </div>

            {menuItems.length === 0 ? (
                <div className="bg-[#121214] border border-stone-800 rounded p-12 text-center text-stone-500">
                    No hay productos registrados. Crea el primero.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {menuItems.map((item: any) => (
                        <div
                            key={item.productoid}
                            className="bg-[#121214] border border-stone-800 rounded flex overflow-hidden hover:border-stone-700 transition-colors"
                        >
                            <div className="w-32 h-32 relative flex-shrink-0">
                                {item.imagenProducto ? (
                                    <img
                                        src={productoService.getImageUrl(item.productoid)}
                                        alt={item.nombre}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=200';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full bg-stone-800 flex items-center justify-center text-stone-500 text-xs">
                                        Sin imagen
                                    </div>
                                )}
                            </div>
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-serif text-lg text-white">{item.nombre}</h3>
                                        <span className="text-[#C6A96B] font-medium">S/ {item.precio.toFixed(2)}</span>
                                    </div>
                                    <p className="text-xs text-stone-400 mb-2 line-clamp-2">{item.descripcion}</p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                                        {item.categoria}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openEdit(item)}
                                            className="p-2 border border-stone-700 hover:border-[#C6A96B] hover:text-[#C6A96B] rounded transition-colors text-stone-400"
                                            title="Editar producto"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteItem(item.productoid, item.nombre)}
                                            className="p-2 border border-stone-700 hover:border-red-500 hover:text-red-500 rounded transition-colors text-stone-400"
                                            title="Eliminar producto"
                                        >
                                            <Trash className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* MODAL */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => !saving && setShowModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative bg-[#121214] border border-stone-800 shadow-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => !saving && setShowModal(false)}
                                className="absolute top-4 right-4 text-stone-500 hover:text-white"
                                disabled={saving}
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-2xl font-serif text-[#C6A96B] mb-6">
                                {editingItem ? "Editar Platillo" : "Nuevo Platillo"}
                            </h2>
                            <form onSubmit={saveItem} className="space-y-4">
                                {/* Imagen */}
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Imagen
                                    </label>
                                    <div className="flex flex-col gap-4">
                                        {imagePreview && (
                                            <div className="relative w-full h-40 border border-stone-800 rounded overflow-hidden bg-black">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        )}
                                        <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-stone-800 rounded-lg cursor-pointer bg-[#0B0B0C] hover:border-[#C6A96B] transition-colors">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-6 h-6 text-stone-500 mb-2" />
                                                <p className="text-xs text-stone-500">
                                                    {newItem.imagen ? newItem.imagen.name : "Click para subir (JPG, PNG)"}
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/png, image/jpeg"
                                                onChange={handleImageChange}
                                                disabled={saving}
                                            />
                                        </label>
                                    </div>
                                </div>

                                {/* Nombre */}
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        value={newItem.nombre}
                                        onChange={(e) => setNewItem({ ...newItem, nombre: e.target.value })}
                                        className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 focus:border-[#C6A96B] outline-none rounded"
                                        required
                                        disabled={saving}
                                        placeholder="Ej: Filet Mignon"
                                    />
                                </div>

                                {/* Precio */}
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Precio
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        value={newItem.precio}
                                        onChange={(e) => setNewItem({ ...newItem, precio: e.target.value })}
                                        className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 focus:border-[#C6A96B] outline-none rounded"
                                        required
                                        disabled={saving}
                                        placeholder="0.00"
                                    />
                                </div>

                                {/* Descripción */}
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Descripción
                                    </label>
                                    <textarea
                                        value={newItem.descripcion}
                                        onChange={(e) => setNewItem({ ...newItem, descripcion: e.target.value })}
                                        className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 focus:border-[#C6A96B] outline-none rounded resize-none h-24"
                                        disabled={saving}
                                        placeholder="Descripción del platillo..."
                                    />
                                </div>

                                {/* Categoría */}
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Categoría
                                    </label>
                                    <select
                                        value={newItem.categoria}
                                        onChange={(e) => setNewItem({ ...newItem, categoria: e.target.value as any })}
                                        className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 focus:border-[#C6A96B] outline-none rounded"
                                        disabled={saving}
                                    >
                                        <option value="PLATO">PLATO</option>
                                        <option value="BEBIDA">BEBIDA</option>
                                        <option value="POSTRE">POSTRE</option>
                                    </select>
                                </div>

                                {/* Botones */}
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 border border-stone-800 text-stone-400 py-3 hover:text-white rounded transition-colors"
                                        disabled={saving}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-[#C6A96B] text-black py-3 hover:bg-white rounded transition-colors disabled:opacity-50"
                                        disabled={saving}
                                    >
                                        {saving ? "Guardando..." : "Guardar"}
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