// src/app/cocina/components/ModalHistorial.tsx

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, CheckCircle } from "lucide-react";
import { Order } from "../types";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    pedidosServidos: Order[];
}

export function ModalHistorial({ isOpen, onClose, pedidosServidos }: Props) {
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
                        className="relative bg-[#121214] border border-stone-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden"
                    >
                        {/* Header - sin botón de limpiar */}
                        <div className="flex justify-between items-center p-4 lg:p-6 border-b border-stone-800">
                            <div>
                                <h2 className="text-xl lg:text-2xl font-serif text-[#C6A96B]">
                                    Historial de Pedidos
                                </h2>
                                <p className="text-sm text-stone-400 mt-1">
                                    Pedidos completados
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-stone-800 rounded transition-colors"
                            >
                                <X className="w-5 h-5 text-stone-400" />
                            </button>
                        </div>

                        {/* Lista de pedidos */}
                        <div className="overflow-y-auto p-4 lg:p-6 space-y-3 max-h-[calc(80vh-80px)]">
                            {pedidosServidos.length === 0 ? (
                                <div className="text-center text-stone-500 py-12">
                                    <CheckCircle className="w-12 h-12 mx-auto mb-3 text-stone-700" />
                                    <p>No hay pedidos en el historial</p>
                                </div>
                            ) : (
                                pedidosServidos.map((pedido) => (
                                    <div
                                        key={pedido.id}
                                        className="bg-[#0B0B0C] border border-stone-800 rounded-lg p-4 hover:border-stone-600 transition-colors"
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="font-serif text-lg text-[#C6A96B]">
                                                    Mesa {pedido.table}
                                                </h3>
                                                <p className="text-xs text-stone-500 font-mono">
                                                    {pedido.id}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-stone-400">
                                                <Clock className="w-4 h-4" />
                                                {pedido.time}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            {pedido.items.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex justify-between text-sm"
                                                >
                                                    <span className="text-stone-300">
                                                        <span className="text-[#C6A96B] mr-2">
                                                            {item.qty}x
                                                        </span>
                                                        {item.name}
                                                    </span>
                                                    {item.completed && (
                                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-3 pt-3 border-t border-stone-800">
                                            <span className="text-xs text-green-500 flex items-center gap-1">
                                                <CheckCircle className="w-3 h-3" />
                                                Completado
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}