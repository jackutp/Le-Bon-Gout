// src/context/CocinaContext.tsx

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { cocinaService, PedidoCocina, ItemCocina } from '@/services/cocinaService';

interface CocinaContextType {
    pedidos: PedidoCocina[];
    historial: PedidoCocina[];  // ✅ AGREGAR
    isLoading: boolean;
    error: string | null;
    fetchPedidos: () => Promise<void>;
    fetchHistorial: () => Promise<void>;  // ✅ AGREGAR
    marcarItemCompletado: (itemId: number) => Promise<ItemCocina | null>;
    marcarPedidoServido: (ordenId: string) => Promise<boolean>;
}

const CocinaContext = createContext<CocinaContextType | undefined>(undefined);

export function CocinaProvider({ children }: { children: ReactNode }) {
    const [pedidos, setPedidos] = useState<PedidoCocina[]>([]);
    const [historial, setHistorial] = useState<PedidoCocina[]>([]);  // ✅ AGREGAR
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const showError = (msg: string) => {
        setError(msg);
        setTimeout(() => setError(null), 3000);
    };

    const fetchPedidos = async () => {
        try {
            const data = await cocinaService.getPedidosPendientes();
            setPedidos(data);
        } catch (err: any) {
            showError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // ✅ NUEVO: Cargar historial
    const fetchHistorial = async () => {
        try {
            const data = await cocinaService.getHistorialPedidos();
            setHistorial(data);
        } catch (err: any) {
            showError(err.message);
        }
    };

    const marcarItemCompletado = async (itemId: number): Promise<ItemCocina | null> => {
        try {
            const updatedItem = await cocinaService.marcarItemCompletado(itemId);
            await fetchPedidos();
            await fetchHistorial();  // ✅ Actualizar historial también
            return updatedItem;
        } catch (err: any) {
            showError(err.message);
            return null;
        }
    };

    const marcarPedidoServido = async (ordenId: string): Promise<boolean> => {
        try {
            await cocinaService.marcarPedidoServido(ordenId);
            await fetchPedidos();
            await fetchHistorial();  // ✅ Actualizar historial también
            return true;
        } catch (err: any) {
            showError(err.message);
            return false;
        }
    };

    useEffect(() => {
        const cargarDatos = async () => {
            setIsLoading(true);
            await Promise.all([fetchPedidos(), fetchHistorial()]);
            setIsLoading(false);
        };
        cargarDatos();

        // Polling cada 5 segundos
        const interval = setInterval(() => {
            fetchPedidos();
            fetchHistorial();
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <CocinaContext.Provider
            value={{
                pedidos,
                historial,  // ✅ AGREGAR
                isLoading,
                error,
                fetchPedidos,
                fetchHistorial,  // ✅ AGREGAR
                marcarItemCompletado,
                marcarPedidoServido,
            }}
        >
            {children}
        </CocinaContext.Provider>
    );
}

export function useCocina() {
    const context = useContext(CocinaContext);
    if (!context) {
        throw new Error('useCocina must be used within a CocinaProvider');
    }
    return context;
}