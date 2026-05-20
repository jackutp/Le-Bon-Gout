// src/context/MesaContext.tsx

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mesaService, Mesa, CreateMesaDTO, UpdateMesaDTO } from '@/services/mesaService';

// 🔁 RE-EXPORTAR los tipos desde el service para que estén disponibles
export type { Mesa, CreateMesaDTO, UpdateMesaDTO };

interface MesaContextType {
    mesas: Mesa[];
    isLoading: boolean;
    error: string | null;
    successMessage: string | null;
    fetchMesas: () => Promise<void>;
    refreshMesas: () => Promise<void>;
    createMesa: (data: CreateMesaDTO) => Promise<Mesa | null>;
    updateMesa: (id: number, data: UpdateMesaDTO) => Promise<Mesa | null>;
    deleteMesa: (id: number) => Promise<boolean>;
    updateEstado: (id: number, estado: string, totalActual?: number, ordenActualId?: string) => Promise<Mesa | null>;
    updateTotal: (id: number, total: number) => Promise<Mesa | null>;
    clearMessages: () => void;
}

const MesaContext = createContext<MesaContextType | undefined>(undefined);

export function MesaProvider({ children }: { children: ReactNode }) {
    const [mesas, setMesas] = useState<Mesa[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const clearMessages = () => {
        setError(null);
        setSuccessMessage(null);
    };

    const showError = (msg: string) => {
        setError(msg);
        setTimeout(() => setError(null), 3000);
    };

    const showSuccess = (msg: string) => {
        setSuccessMessage(msg);
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    const fetchMesas = async () => {
        setIsLoading(true);
        try {
            const data = await mesaService.getAllMesas();
            setMesas(data);
        } catch (err: any) {
            showError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    const refreshMesas = async () => {
        await fetchMesas();
    };
    const createMesa = async (data: CreateMesaDTO): Promise<Mesa | null> => {
        try {
            const newMesa = await mesaService.createMesa(data);
            setMesas(prev => [...prev, newMesa]);
            showSuccess('Mesa creada correctamente');
            return newMesa;
        } catch (err: any) {
            showError(err.message);
            return null;
        }
    };

    const updateMesa = async (id: number, data: UpdateMesaDTO): Promise<Mesa | null> => {
        try {
            const updatedMesa = await mesaService.updateMesa(id, data);
            setMesas(prev => prev.map(m => m.id === id ? updatedMesa : m));
            showSuccess('Mesa actualizada correctamente');
            return updatedMesa;
        } catch (err: any) {
            showError(err.message);
            return null;
        }
    };

    const deleteMesa = async (id: number): Promise<boolean> => {
        try {
            await mesaService.deleteMesa(id);
            setMesas(prev => prev.filter(m => m.id !== id));
            showSuccess('Mesa eliminada correctamente');
            return true;
        } catch (err: any) {
            showError(err.message);
            return false;
        }
    };

    const updateEstado = async (id: number, estado: string, totalActual?: number, ordenActualId?: string): Promise<Mesa | null> => {
        try {
            const updatedMesa = await mesaService.updateMesaEstado(id, estado, totalActual, ordenActualId);
            setMesas(prev => prev.map(m => m.id === id ? updatedMesa : m));
            return updatedMesa;
        } catch (err: any) {
            showError(err.message);
            return null;
        }
    };

    const updateTotal = async (id: number, total: number): Promise<Mesa | null> => {
        try {
            const updatedMesa = await mesaService.updateMesaTotal(id, total);
            setMesas(prev => prev.map(m => m.id === id ? updatedMesa : m));
            return updatedMesa;
        } catch (err: any) {
            showError(err.message);
            return null;
        }
    };

    useEffect(() => {
        fetchMesas();
    }, []);

    return (
        <MesaContext.Provider
            value={{
                mesas,
                isLoading,
                error,
                successMessage,
                fetchMesas,
                refreshMesas,
                createMesa,
                updateMesa,
                deleteMesa,
                updateEstado,
                updateTotal,
                clearMessages,
            }}
        >
            {children}
        </MesaContext.Provider>
    );
}

export function useMesa() {
    const context = useContext(MesaContext);
    if (!context) {
        throw new Error('useMesa must be used within a MesaProvider');
    }
    return context;
}