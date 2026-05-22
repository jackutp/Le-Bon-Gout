// src/components/ConfirmModal.tsx

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, LogOut } from "lucide-react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
}

export function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Cerrar Sesión",
    message = "¿Estás seguro de que deseas cerrar sesión?",
    confirmText = "Sí, cerrar sesión",
    cancelText = "Cancelar",
}: Props) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-[#121214] border border-stone-800 rounded-lg shadow-2xl w-full max-w-md p-6"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-stone-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                                <LogOut className="w-5 h-5 text-red-500" />
                            </div>
                            <h2 className="text-xl font-serif text-white">{title}</h2>
                        </div>

                        <p className="text-stone-400 mb-6">{message}</p>

                        <div className="flex gap-3">
                            <button
                                onClick={onConfirm}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm uppercase tracking-widest transition-colors"
                            >
                                {confirmText}
                            </button>
                            <button
                                onClick={onClose}
                                className="flex-1 border border-stone-800 hover:border-stone-600 text-stone-400 py-2 rounded text-sm uppercase tracking-widest transition-colors"
                            >
                                {cancelText}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}