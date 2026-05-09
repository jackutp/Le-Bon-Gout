// src/context/MermaContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { mermaService, Merma, Producto, Insumo } from '@/services/mermaService';

interface MermaContextType {
    mermas: Merma[];
    productos: Producto[];
    insumos: Insumo[];
    loading: boolean;
    error: string | null;
    addMerma: (merma: Omit<Merma, 'mermaid'>) => Promise<void>;
    updateMerma: (id: number, merma: Partial<Merma>) => Promise<void>;
    deleteMerma: (id: number) => Promise<void>;
    refreshMermas: () => Promise<void>;
    getMermasByTipo: (tipo: "PRODUCTO" | "INSUMO") => Merma[];
}

const MermaContext = createContext<MermaContextType | undefined>(undefined);

export function MermaProvider({ children }: { children: React.ReactNode }) {
    const [mermas, setMermas] = useState<Merma[]>([]);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [insumos, setInsumos] = useState<Insumo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refreshMermas = async () => {
        try {
            setLoading(true);
            setError(null);
            const [mermasData, productosData, insumosData] = await Promise.all([
                mermaService.getAll(),
                mermaService.getProductos(),
                mermaService.getInsumos(),
            ]);
            setMermas(mermasData);
            setProductos(productosData);
            setInsumos(insumosData);
        } catch (error: any) {
            console.error('Error cargando datos:', error);
            setError(error.message || 'Error al cargar datos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshMermas();
    }, []);

    const addMerma = async (merma: Omit<Merma, 'mermaid'>) => {
        await mermaService.create(merma);
        await refreshMermas();
    };

    const updateMerma = async (id: number, merma: Partial<Merma>) => {
        await mermaService.update(id, merma);
        await refreshMermas();
    };

    const deleteMerma = async (id: number) => {
        await mermaService.delete(id);
        await refreshMermas();
    };

    const getMermasByTipo = (tipo: "PRODUCTO" | "INSUMO") => {
        return mermas.filter(m => m.tipoMerma === tipo);
    };

    return (
        <MermaContext.Provider value={{
            mermas,
            productos,
            insumos,
            loading,
            error,
            addMerma,
            updateMerma,
            deleteMerma,
            refreshMermas,
            getMermasByTipo,
        }}>
            {children}
        </MermaContext.Provider>
    );
}

export function useMermas() {
    const context = useContext(MermaContext);
    if (!context) throw new Error('useMermas must be used within MermaProvider');
    return context;
}