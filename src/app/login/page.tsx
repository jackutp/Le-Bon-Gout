"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

type Credentials = Record<string, string>;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRecovering, setIsRecovering] = useState(false);
  const [error, setError] = useState("");

  const credentials: Credentials = {
    "mesero@res.com": "m12345",
    "chef@res.com": "c12345",
    "admin@res.com": "a12345",
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, ingresa tu correo y contrasena.");
      return;
    }

    const lowerEmail = email.toLowerCase();
    const validPassword = credentials[lowerEmail];

    if (!validPassword) {
      setError("Correo electronico no reconocido.");
      return;
    }

    if (password !== validPassword) {
      setError("Contrasena incorrecta.");
      return;
    }

    if (lowerEmail.includes("mesero")) {
      router.push("/mesero");
    } else if (lowerEmail.includes("chef")) {
      router.push("/cocina");
    } else if (lowerEmail.includes("admin")) {
      router.push("/admin");
    } else {
      setError("Credenciales no reconocidas.");
    }
  };

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Por favor, ingresa tu correo electronico para enviarte las instrucciones.");
      return;
    }
    alert(`Instrucciones de recuperacion enviadas a ${email}`);
    setIsRecovering(false);
  };

  return (
    <div className="bg-[#0B0B0C] min-h-screen font-sans selection:bg-[#C6A96B] selection:text-white flex flex-col">
      <nav className="w-full p-4 md:p-6 absolute top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-stone-400 hover:text-[#C6A96B] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm uppercase tracking-widest hidden sm:inline">Volver</span>
          </Link>
          <Link href="/" className="text-lg md:text-xl font-serif tracking-widest uppercase text-[#C6A96B]">
            Le Bon Gout
          </Link>
          <div className="w-16 hidden sm:block" />
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-4 md:p-6 relative z-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-[#121214] p-6 md:p-10 border border-stone-800 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C6A96B] to-transparent opacity-50" />

          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-2">
              {isRecovering ? "Recuperar Acceso" : "Iniciar Sesion"}
            </h2>
            <p className="text-stone-400 text-sm">
              {isRecovering
                ? "Ingresa tu correo para recibir las instrucciones."
                : "Acceso exclusivo para el personal."}
            </p>
          </div>

          {!isRecovering ? (
            <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
              <div>
                <label className="block text-stone-400 text-xs uppercase tracking-widest mb-2">
                  Correo Electronico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-3 focus:outline-none focus:border-[#C6A96B] transition-colors"
                  placeholder="mesero@lebongout.com"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-stone-400 text-xs uppercase tracking-widest">
                    Contrasena
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsRecovering(true)}
                    className="text-[#C6A96B] text-xs hover:text-white transition-colors"
                  >
                    Olvidaste?
                  </button>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-3 focus:outline-none focus:border-[#C6A96B] transition-colors"
                  placeholder="********"
                />
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <button
                type="submit"
                className="w-full bg-[#C6A96B] text-black font-medium uppercase tracking-widest text-sm py-3 hover:bg-white transition-colors mt-4"
              >
                Ingresar
              </button>
            </form>
          ) : (
            <form onSubmit={handleRecover} className="space-y-5 md:space-y-6">
              <div>
                <label className="block text-stone-400 text-xs uppercase tracking-widest mb-2">
                  Correo Electronico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-3 focus:outline-none focus:border-[#C6A96B] transition-colors"
                  placeholder="personal@lebongout.com"
                />
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <div className="space-y-4 mt-4">
                <button
                  type="submit"
                  className="w-full bg-[#C6A96B] text-black font-medium uppercase tracking-widest text-sm py-3 hover:bg-white transition-colors"
                >
                  Enviar Instrucciones
                </button>
                <button
                  type="button"
                  onClick={() => setIsRecovering(false)}
                  className="w-full border border-stone-800 text-stone-400 uppercase tracking-widest text-sm py-3 hover:text-white hover:border-[#C6A96B] transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}