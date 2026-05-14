'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { insumoService, Insumo } from '@/services/insumoService';
interface InsumoContextType {
    insumos: Insumo[];
    loading: boolean;
    error: string | null;
    addInsumo: (insumo: Omit<Insumo, 'insumoid'>) => Promise<void>;
    updateInsumo: (id: number, insumo: Partial<Insumo>) => Promise<void>;
    updateStock: (id: number, stock: number) => Promise<void>;
    deleteInsumo: (id: number) => Promise<void>;
    refreshInsumos: () => Promise<void>;
    searchInsumos: (nombre: string) => Promise<Insumo[]>;
    getLowStock: () => Insumo[];
    getOutOfStock: () => Insumo[];
}

const InsumoContext = createContext<InsumoContextType | undefined>(undefined);

export function InsumoProvider({ children }: { children: React.ReactNode }) {
    const [insumos, setInsumos] = useState<Insumo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refreshInsumos = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('🔄 [InsumoContext] Cargando insumos...');
            const data = await insumoService.getAll();
            setInsumos(data);
            console.log('✅ [InsumoContext] Insumos cargados:', data.length);
        } catch (err) {
            console.error('❌ [InsumoContext] Error cargando insumos:', err);
            setError(err instanceof Error ? err.message : 'Error desconocido');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshInsumos();
    }, [refreshInsumos]);

    const addInsumo = async (insumo: Omit<Insumo, 'insumoid'>) => {
        try {
            await insumoService.create(insumo);
            await refreshInsumos();
        } catch (err) {
            console.error('Error agregando insumo:', err);
            throw err;
        }
    };

    const updateInsumo = async (id: number, insumo: Partial<Insumo>) => {
        try {
            await insumoService.update(id, insumo);
            await refreshInsumos();
        } catch (err) {
            console.error('Error actualizando insumo:', err);
            throw err;
        }
    };

    const updateStock = async (id: number, stock: number) => {
        try {
            await insumoService.updateStock(id, stock);
            await refreshInsumos();
        } catch (err) {
            console.error('Error actualizando stock:', err);
            throw err;
        }
    };

    const deleteInsumo = async (id: number) => {
        try {
            await insumoService.delete(id);
            await refreshInsumos();
        } catch (err) {
            console.error('Error eliminando insumo:', err);
            throw err;
        }
    };

    const searchInsumos = async (nombre: string): Promise<Insumo[]> => {
        try {
            return await insumoService.searchByNombre(nombre);
        } catch (err) {
            console.error('Error buscando insumos:', err);
            return [];
        }
    };

    const getLowStock = useCallback(() => {
        return insumos.filter(i => i.estadoInsumo === 'BAJO' || (i.stock < 10 && i.stock > 0));
    }, [insumos]);

    const getOutOfStock = useCallback(() => {
        return insumos.filter(i => i.estadoInsumo === 'VACIO' || i.stock === 0);
    }, [insumos]);

    return (
        <InsumoContext.Provider value={{
            insumos,
            loading,
            error,
            addInsumo,
            updateInsumo,
            updateStock,
            deleteInsumo,
            refreshInsumos,
            searchInsumos,
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