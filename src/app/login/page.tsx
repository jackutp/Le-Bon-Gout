"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Login from "./Login";
import Registro from "./Registro";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "registro">("login");

  return (
    <div className="bg-[#0B0B0C] min-h-screen font-sans selection:bg-[#C6A96B] selection:text-white flex flex-col">
      <nav className="w-full p-4 md:p-6 absolute top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-stone-400 hover:text-[#C6A96B] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm uppercase tracking-widest hidden sm:inline">Volver</span>
          </Link>
          <Link href="/" className="text-lg md:text-xl font-serif tracking-widest uppercase text-[#C6A96B]">
            Le Bon Goût
          </Link>
          <div className="w-16 hidden sm:block" />
        </div>
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 relative z-0 mt-20">
        <div className="w-full max-w-md flex justify-center mb-6 border-b border-stone-800">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 pb-3 text-sm font-medium uppercase tracking-widest transition-colors ${
              activeTab === "login"
                ? "text-[#C6A96B] border-b-2 border-[#C6A96B]"
                : "text-stone-500 hover:text-stone-300"
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => setActiveTab("registro")}
            className={`flex-1 pb-3 text-sm font-medium uppercase tracking-widest transition-colors ${
              activeTab === "registro"
                ? "text-[#C6A96B] border-b-2 border-[#C6A96B]"
                : "text-stone-500 hover:text-stone-300"
            }`}
          >
            Registrarse
          </button>
        </div>

        {activeTab === "login" ? <Login /> : <Registro />}
      </div>
    </div>
  );
}