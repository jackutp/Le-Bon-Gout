// src/context/InsumoContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { insumoService, Insumo } from '@/services/insumoService';

interface InsumoContextType {
    insumos: Insumo[];
    loading: boolean;
    addInsumo: (insumo: Omit<Insumo, 'insumoid'>) => Promise<void>;
    updateInsumo: (id: number, insumo: Partial<Insumo>) => Promise<void>;
    updateStock: (id: number, stock: number) => Promise<void>;
    deleteInsumo: (id: number) => Promise<void>;
    refreshInsumos: () => Promise<void>;
    getLowStock: () => Insumo[];
    getOutOfStock: () => Insumo[];
}

const InsumoContext = createContext<InsumoContextType | undefined>(undefined);

export function InsumoProvider({ children }: { children: React.ReactNode }) {
    const [insumos, setInsumos] = useState<Insumo[]>([]);
    const [loading, setLoading] = useState(true);

    const refreshInsumos = async () => {
        try {
            setLoading(true);
            const data = await insumoService.getAll();
            setInsumos(data);
        } catch (error) {
            console.error('Error cargando insumos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshInsumos();
    }, []);

    const addInsumo = async (insumo: Omit<Insumo, 'insumoid'>) => {
        await insumoService.create(insumo);
        await refreshInsumos();
    };

    const updateInsumo = async (id: number, insumo: Partial<Insumo>) => {
        await insumoService.update(id, insumo);
        await refreshInsumos();
    };

    const updateStock = async (id: number, stock: number) => {
        await insumoService.updateStock(id, stock);
        await refreshInsumos();
    };

    const deleteInsumo = async (id: number) => {
        await insumoService.delete(id);
        await refreshInsumos();
    };

    const getLowStock = () => {
        return insumos.filter(i => i.estadoInsumo === 'BAJO');
    };

    const getOutOfStock = () => {
        return insumos.filter(i => i.estadoInsumo === 'VACIO');
    };

    return (
        <InsumoContext.Provider value={{
            insumos,
            loading,
            addInsumo,
            updateInsumo,
            updateStock,
            deleteInsumo,
            refreshInsumos,
            getLowStock,
            getOutOfStock,
        }}>
            {children}
        </InsumoContext.Provider>
    );
}

export function useInsumos() {
    const context = useContext(InsumoContext);
    if (!context) throw new Error('useInsumos must be used within InsumoProvider');
    return context;
}