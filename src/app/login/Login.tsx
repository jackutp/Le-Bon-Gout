"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export interface LoginFormData {
    email: string;
    clave: string;
}

export default function Login() {
    const router = useRouter();
    const { login, isLoading, error: authError } = useAuth();
    const [formData, setFormData] = useState<LoginFormData>({ email: "", clave: "" });
    const [error, setError] = useState("");
    const [isRecovering, setIsRecovering] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!formData.email || !formData.clave) {
            setError("Por favor, ingresa tu correo y contraseña.");
            return;
        }

        const success = await login({
            email: formData.email,
            password: formData.clave,
        });

        if (success) {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                switch (user.tipo) {
                    case 'MESERO':
                        router.push('/mesero');
                        break;
                    case 'COCINERO':
                        router.push('/cocina');
                        break;
                    case 'ADMINISTRADOR':
                        router.push('/admin');
                        break;
                    default:
                        router.push('/');
                }
            }
        } else {
            setError(authError || "Credenciales incorrectas");
        }
    };

    const handleRecover = (e: React.FormEvent) => {
        e.preventDefault();
        // Lógica de recuperación aquí
        alert("Funcionalidad de recuperación pendiente");
        setIsRecovering(false);
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
                <h2 className="text-2xl font-serif text-white mb-2">
                    {isRecovering ? "Recuperar Acceso" : "Iniciar Sesión"}
                </h2>
                <p className="text-stone-400 text-sm">
                    {isRecovering
                        ? "Ingresa tu correo para recibir las instrucciones."
                        : "Acceso exclusivo para usuarios registrados."}
                </p>
            </div>

            {!isRecovering ? (
                <form onSubmit={handleLogin} className="space-y-4">
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
                            placeholder="user@lebongout.com"
                            required
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-stone-400 text-xs uppercase tracking-widest">
                                Contraseña
                            </label>
                            <button
                                type="button"
                                onClick={() => setIsRecovering(true)}
                                className="text-[#C6A96B] text-xs hover:text-white transition-colors"
                            >
                                ¿Olvidaste?
                            </button>
                        </div>
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

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#C6A96B] text-black font-medium uppercase tracking-widest text-sm py-3 rounded hover:bg-white transition-colors mt-4 disabled:opacity-50"
                    >
                        {isLoading ? "Cargando..." : "Iniciar sesión"}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleRecover} className="space-y-4">
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
                            placeholder="personal@lebongout.com"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <div className="space-y-3 mt-4">
                        <button
                            type="submit"
                            className="w-full bg-[#C6A96B] text-black font-medium uppercase tracking-widest text-sm py-3 rounded hover:bg-white transition-colors"
                        >
                            Enviar Instrucciones
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsRecovering(false)}
                            className="w-full border border-stone-800 rounded text-stone-400 uppercase tracking-widest text-sm py-3 hover:text-white hover:border-[#C6A96B] transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}
        </motion.div>
    );
}