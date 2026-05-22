// src/app/cocina/components/ModalDetallePedido.tsx

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, ChefHat, CheckCircle } from "lucide-react";  // ← AGREGAR CheckCircle
import { Order } from "../types";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    order: Order | null;
}

export function ModalDetallePedido({ isOpen, onClose, order }: Props) {
    if (!order) return null;

    const allCompleted = order.items.every(i => i.completed);
    const completedCount = order.items.filter(i => i.completed).length;

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
                        className="relative bg-[#121214] border border-stone-800 rounded-lg shadow-2xl w-full max-w-md"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b border-stone-800">
                            <div className="flex items-center gap-3">
                                <ChefHat className="w-6 h-6 text-[#C6A96B]" />
                                <div>
                                    <h2 className="text-xl font-serif text-white">Detalle del Pedido</h2>
                                    <p className="text-xs text-stone-500">{order.id}</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1 hover:bg-stone-800 rounded transition-colors"
                            >
                                <X className="w-5 h-5 text-stone-400" />
                            </button>
                        </div>

                        {/* Info Mesa */}
                        <div className="p-4 bg-black/30 border-b border-stone-800">
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="text-xs text-stone-400 uppercase">Mesa</span>
                                    <p className="text-2xl font-serif text-[#C6A96B]">{order.table}</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs text-stone-400 uppercase">Hora</span>
                                    <p className="text-lg font-mono">{order.time}</p>
                                </div>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="p-4 max-h-96 overflow-y-auto">
                            <h3 className="text-sm font-semibold text-stone-400 uppercase tracking-wider mb-3">
                                Items ({completedCount}/{order.items.length})
                            </h3>
                            <div className="space-y-3">
                                {order.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`flex justify-between items-center p-2 rounded ${item.completed ? "bg-[#C6A96B]/5" : "bg-stone-900/50"
                                            }`}
                                    >
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-xs font-mono ${item.completed ? "text-green-500" : "text-stone-500"
                                                    }`}>
                                                    {item.completed ? "✓" : "○"}
                                                </span>
                                                <span className="font-medium">
                                                    {item.qty}x {item.name}
                                                </span>
                                            </div>
                                            {item.notes && (
                                                <p className="text-xs text-amber-500 mt-1 ml-5">
                                                    Nota: {item.notes}
                                                </p>
                                            )}
                                        </div>
                                        {item.completed && (
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-stone-800">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-stone-400">Estado</span>
                                <span className={`text-sm font-semibold ${allCompleted ? "text-green-500" : "text-amber-500"
                                    }`}>
                                    {allCompleted ? "Listo para servir" : "En preparación"}
                                </span>
                            </div>
                            <div className="mt-3 h-1.5 bg-stone-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#C6A96B] transition-all duration-300 rounded-full"
                                    style={{ width: `${(completedCount / order.items.length) * 100}%` }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}