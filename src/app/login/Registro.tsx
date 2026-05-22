"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export interface RegistroFormData {
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    clave: string;
}

export default function Registro() {
    const router = useRouter();
    const { registro, isLoading, error: authError } = useAuth();
    const [formData, setFormData] = useState<RegistroFormData>({
        nombre: "",
        apellido: "",
        dni: "",
        email: "",
        clave: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!formData.nombre || !formData.apellido || !formData.dni || !formData.email || !formData.clave) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        if (!/^\d{7,8}$/.test(formData.dni)) {
            setError("El DNI debe contener 7 u 8 dígitos numéricos.");
            return;
        }

        const successReg = await registro({
            nombre: formData.nombre,
            apellido: formData.apellido,
            dni: formData.dni,
            email: formData.email,
            clave: formData.clave,
        });

        if (successReg) {
            setSuccess("Registro exitoso. Redirigiendo...");
            setTimeout(() => {
                router.push('/');
            }, 2000);
        } else {
            setError(authError || "Error al registrarse. El email o DNI ya existe.");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-[#121214] p-6 md:p-8 rounded-lg shadow-xl border border-stone-800 relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C6A96B] to-transparent opacity-50" />

            <div className="text-center mb-6">
                <h2 className="text-2xl font-serif text-white mb-2">Crear Cuenta</h2>
                <p className="text-stone-400 text-sm">Regístrate para formar parte del equipo.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-stone-400 text-xs uppercase tracking-widest mb-1">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="w-full bg-[#0B0B0C] border border-stone-800 rounded text-white px-4 py-2 focus:outline-none focus:border-[#C6A96B] transition-colors"
                            placeholder="Juan"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-stone-400 text-xs uppercase tracking-widest mb-1">
                            Apellido
                        </label>
                        <input
                            type="text"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            className="w-full bg-[#0B0B0C] border border-stone-800 rounded text-white px-4 py-2 focus:outline-none focus:border-[#C6A96B] transition-colors"
                            placeholder="Pérez"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-stone-400 text-xs uppercase tracking-widest mb-1">
                        DNI
                    </label>
                    <input
                        type="text"
                        name="dni"
                        value={formData.dni}
                        onChange={handleChange}
                        className="w-full bg-[#0B0B0C] border border-stone-800 rounded text-white px-4 py-2 focus:outline-none focus:border-[#C6A96B] transition-colors"
                        placeholder="12345678"
                        required
                    />
                </div>

                <div>
                    <label className="block text-stone-400 text-xs uppercase tracking-widest mb-1">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#0B0B0C] border border-stone-800 rounded text-white px-4 py-2 focus:outline-none focus:border-[#C6A96B] transition-colors"
                        placeholder="juan@example.com"
                        required
                    />
                </div>

                <div>
                    <label className="block text-stone-400 text-xs uppercase tracking-widest mb-1">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        name="clave"
                        value={formData.clave}
                        onChange={handleChange}
                        className="w-full bg-[#0B0B0C] border border-stone-800 rounded text-white px-4 py-2 focus:outline-none focus:border-[#C6A96B] transition-colors"
                        placeholder="********"
                        required
                    />
                </div>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                {success && <p className="text-green-500 text-sm text-center">{success}</p>}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#C6A96B] text-black font-medium uppercase tracking-widest text-sm py-3 rounded hover:bg-white transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Registrando..." : "Registrarse"}
                </button>
            </form>
        </motion.div>
    );
}