// src/app/unauthorized/page.tsx

"use client";
import Link from "next/link";
import { ShieldX } from "lucide-react";

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen bg-[#0B0B0C] flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
                    <ShieldX className="w-10 h-10 text-red-500" />
                </div>
                <h1 className="text-2xl font-serif text-white mb-2">Acceso No Autorizado</h1>
                <p className="text-stone-400 mb-6">
                    No tienes permisos para acceder a esta página.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-[#C6A96B] text-black px-6 py-2 rounded uppercase tracking-widest text-sm hover:bg-white transition-colors"
                >
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
}