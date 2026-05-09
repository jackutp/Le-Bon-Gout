// src/app/admin/components/MenuView.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit, Trash, X, Upload } from "lucide-react";
import Image from "next/image";
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
            descripcion: item.descripcion,
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
            if (editingItem) {
                // Actualizar producto existente
                if (newItem.imagen) {
                    const formData = new FormData();
                    formData.append("nombre", newItem.nombre);
                    formData.append("descripcion", newItem.descripcion);
                    formData.append("precio", newItem.precio);
                    formData.append("categoria", newItem.categoria);
                    formData.append("imagen", newItem.imagen);
                    await productoService.updateWithImage(editingItem.productoid, formData);
                } else {
                    await productoService.update(editingItem.productoid, {
                        nombre: newItem.nombre,
                        descripcion: newItem.descripcion,
                        precio: parseFloat(newItem.precio),
                        categoria: newItem.categoria,
                    });
                }
            } else {
                // Crear nuevo producto
                if (newItem.imagen) {
                    const formData = new FormData();
                    formData.append("nombre", newItem.nombre);
                    formData.append("descripcion", newItem.descripcion);
                    formData.append("precio", newItem.precio);
                    formData.append("categoria", newItem.categoria);
                    formData.append("imagen", newItem.imagen);
                    await productoService.createWithImage(formData);
                } else {
                    await productoService.create({
                        nombre: newItem.nombre,
                        descripcion: newItem.descripcion,
                        precio: parseFloat(newItem.precio),
                        categoria: newItem.categoria,
                        stock: 0,  // 👈 AGREGAR ESTA LÍNEA
                    });
                }
            }

            setShowModal(false);
            await refreshProducts();
            alert(editingItem ? "Producto actualizado correctamente" : "Producto creado correctamente");
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
                await refreshProducts(); // Recargar productos sin recargar la página
                alert("Producto eliminado correctamente");
            } catch (error: any) {
                console.error('Error eliminando producto:', error);
                alert(`Error al eliminar el producto: ${error.message}`);
            }
        }
    };

    if (loading) {
        return <div className="text-center py-12 text-stone-400">Cargando productos...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <p className="text-stone-400 text-sm">
                    Gestiona los platillos visibles en el catálogo de meseros.
                </p>
                <button
                    onClick={openAdd}
                    className="flex items-center gap-2 bg-[#C6A96B] text-black px-4 py-2 rounded text-sm uppercase tracking-widest hover:bg-white transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Nuevo Platillo
                </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {menuItems.map((item: any) => (
                    <div
                        key={item.productoid}
                        className="bg-[#121214] border border-stone-800 rounded flex overflow-hidden"
                    >
                        <div className="w-32 relative">
                            {item.imagenUrl ? (
                                <img
                                    src={productoService.getImageUrl(item.productoid)}
                                    alt={item.nombre}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-stone-800 flex items-center justify-center text-stone-500 text-xs">
                                    Sin imagen
                                </div>
                            )}
                        </div>
                        <div className="p-4 flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-serif text-lg">{item.nombre}</h3>
                                <span className="text-[#C6A96B]">S/ {item.precio}</span>
                            </div>
                            <p className="text-xs text-stone-400 mb-2">{item.descripcion}</p>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-1 rounded">
                                    {item.categoria}
                                </span>
                                <span className={`text-xs px-2 py-1 rounded ${item.stock > 0 ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'}`}>
                                    Stock: {item.stock || 0}
                                </span>
                            </div>
                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    onClick={() => openEdit(item)}
                                    className="p-2 border border-stone-700 hover:border-[#C6A96B] hover:text-[#C6A96B] rounded transition-colors text-stone-400"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDeleteItem(item.productoid, item.nombre)}
                                    className="p-2 border border-stone-700 hover:border-red-500 hover:text-red-500 rounded transition-colors text-stone-400"
                                >
                                    <Trash className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

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
                            className="relative bg-[#121214] border border-stone-800 shadow-2xl p-8 max-w-md w-full"
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
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Imagen
                                    </label>
                                    <div className="flex flex-col gap-4">
                                        {imagePreview && (
                                            <div className="relative w-full h-32 border border-stone-800 rounded overflow-hidden bg-black">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                        )}
                                        <div className="flex items-center justify-center w-full">
                                            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-stone-800 rounded-lg cursor-pointer bg-[#0B0B0C] hover:border-[#C6A96B] transition-colors">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <Upload className="w-6 h-6 text-stone-500 mb-2" />
                                                    <p className="text-xs text-stone-500">
                                                        Click para subir (JPG, PNG)
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
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        value={newItem.nombre}
                                        onChange={(e) =>
                                            setNewItem({ ...newItem, nombre: e.target.value })
                                        }
                                        className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 focus:border-[#C6A96B] outline-none rounded"
                                        required
                                        disabled={saving}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Precio
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={newItem.precio}
                                        onChange={(e) =>
                                            setNewItem({ ...newItem, precio: e.target.value })
                                        }
                                        className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 focus:border-[#C6A96B] outline-none rounded"
                                        required
                                        disabled={saving}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Descripción
                                    </label>
                                    <input
                                        type="text"
                                        value={newItem.descripcion}
                                        onChange={(e) =>
                                            setNewItem({ ...newItem, descripcion: e.target.value })
                                        }
                                        className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 focus:border-[#C6A96B] outline-none rounded"
                                        required
                                        disabled={saving}
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Categoría
                                    </label>
                                    <select
                                        value={newItem.categoria}
                                        onChange={(e) =>
                                            setNewItem({
                                                ...newItem,
                                                categoria: e.target.value as any,
                                            })
                                        }
                                        className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 focus:border-[#C6A96B] outline-none rounded"
                                        disabled={saving}
                                    >
                                        <option value="PLATO">PLATO</option>
                                        <option value="BEBIDA">BEBIDA</option>
                                        <option value="POSTRE">POSTRE</option>
                                    </select>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 border border-stone-800 text-stone-400 py-3 hover:text-white rounded"
                                        disabled={saving}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-[#C6A96B] text-black py-3 hover:bg-white rounded disabled:opacity-50"
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