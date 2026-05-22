// src/app/admin/components/StaffView.tsx

"use client";

import { useState, useEffect } from "react";
import { useUsers } from "@/context/UserContext";
import { Plus, Edit, Trash2, X } from "lucide-react";

export function StaffView() {
    const { users, isLoading, createUser, updateUser, deleteUser, fetchUsers } = useUsers();
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        dni: "",
        email: "",
        clave: "",
        tipo: "MESERO" as "MESERO" | "COCINERO",
    });

    // Filtrar solo MESEROS y COCINEROS
    const meseros = users.filter(u => u.tipo === "MESERO");
    const cocineros = users.filter(u => u.tipo === "COCINERO");

    const openAddModal = () => {
        setEditingUser(null);
        setFormData({
            nombre: "",
            apellido: "",
            dni: "",
            email: "",
            clave: "",
            tipo: "MESERO",
        });
        setShowModal(true);
    };

    const openEditModal = (user: any) => {
        setEditingUser(user);
        setFormData({
            nombre: user.nombre,
            apellido: user.apellido,
            dni: user.dni,
            email: user.email,
            clave: "",
            tipo: user.tipo,
        });
        setShowModal(true);
    };

    // En el handleSubmit, asegura que se pase el tipo:
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingUser) {
            await updateUser(editingUser.idUsuario, {
                nombre: formData.nombre,
                apellido: formData.apellido,
                dni: formData.dni,
                email: formData.email,
                clave: formData.clave || undefined,
            }, formData.tipo);
        } else {
            // ✅ Pasar el tipo como segundo argumento
            await createUser({
                nombre: formData.nombre,
                apellido: formData.apellido,
                dni: formData.dni,
                email: formData.email,
                clave: formData.clave,
            }, formData.tipo);
        }

        setShowModal(false);
        await fetchUsers();
    };

    const handleDelete = async (id: number, nombre: string) => {
        if (confirm(`¿Eliminar a ${nombre}?`)) {
            await deleteUser(id);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C6A96B]"></div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Formulario de nuevo personal */}
            <div className="bg-[#121214] border border-stone-800 rounded p-6">
                <h2 className="text-xl font-serif text-[#C6A96B] mb-6">Nuevo Personal</h2>
                <form onSubmit={openAddModal} className="space-y-4">
                    <button
                        type="button"
                        onClick={openAddModal}
                        className="w-full bg-[#C6A96B] text-black uppercase tracking-widest text-sm py-3 hover:bg-white transition-colors flex items-center justify-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Registrar Personal
                    </button>
                </form>
            </div>

            {/* Lista de Meseros */}
            <div className="bg-[#121214] border border-stone-800 rounded p-6">
                <h2 className="text-xl font-serif text-[#C6A96B] mb-6">Meseros</h2>
                <div className="space-y-4">
                    {meseros.map((s) => (
                        <div
                            key={s.idUsuario}
                            className="flex justify-between items-center p-3 border border-stone-800 rounded"
                        >
                            <div>
                                <p className="text-sm">{s.nombre} {s.apellido}</p>
                                <p className="text-xs text-stone-500">{s.email}</p>
                                <p className="text-xs text-stone-500">DNI: {s.dni}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEditModal(s)}
                                    className="p-1 hover:text-[#C6A96B] transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(s.idUsuario, s.nombre)}
                                    className="p-1 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {meseros.length === 0 && (
                        <p className="text-stone-500 text-sm">No hay meseros registrados</p>
                    )}
                </div>
            </div>

            {/* Lista de Cocineros */}
            <div className="bg-[#121214] border border-stone-800 rounded p-6">
                <h2 className="text-xl font-serif text-[#C6A96B] mb-6">Cocineros</h2>
                <div className="space-y-4">
                    {cocineros.map((s) => (
                        <div
                            key={s.idUsuario}
                            className="flex justify-between items-center p-3 border border-stone-800 rounded"
                        >
                            <div>
                                <p className="text-sm">{s.nombre} {s.apellido}</p>
                                <p className="text-xs text-stone-500">{s.email}</p>
                                <p className="text-xs text-stone-500">DNI: {s.dni}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEditModal(s)}
                                    className="p-1 hover:text-[#C6A96B] transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(s.idUsuario, s.nombre)}
                                    className="p-1 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                    {cocineros.length === 0 && (
                        <p className="text-stone-500 text-sm">No hay cocineros registrados</p>
                    )}
                </div>
            </div>

            {/* Modal para crear/editar */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
                    <div className="relative bg-[#121214] border border-stone-800 rounded-lg shadow-2xl w-full max-w-md p-6">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-stone-400 hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h2 className="text-xl font-serif text-[#C6A96B] mb-6">
                            {editingUser ? "Editar Personal" : "Nuevo Personal"}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    value={formData.nombre}
                                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                    className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 focus:border-[#C6A96B] outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                    Apellido
                                </label>
                                <input
                                    type="text"
                                    value={formData.apellido}
                                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                                    className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 focus:border-[#C6A96B] outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                    DNI
                                </label>
                                <input
                                    type="text"
                                    value={formData.dni}
                                    onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                                    className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 focus:border-[#C6A96B] outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 focus:border-[#C6A96B] outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    value={formData.clave}
                                    onChange={(e) => setFormData({ ...formData, clave: e.target.value })}
                                    className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 focus:border-[#C6A96B] outline-none"
                                    placeholder={editingUser ? "Dejar en blanco para no cambiar" : ""}
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                    Rol
                                </label>
                                <select
                                    value={formData.tipo}
                                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value as "MESERO" | "COCINERO" })}
                                    className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 focus:border-[#C6A96B] outline-none"
                                >
                                    <option value="MESERO">Mesero</option>
                                    <option value="COCINERO">Cocinero</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#C6A96B] text-black uppercase tracking-widest text-sm py-3 mt-4 hover:bg-white transition-colors"
                            >
                                {editingUser ? "Actualizar" : "Registrar"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}