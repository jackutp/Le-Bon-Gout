// src/context/ComprobanteContext.tsx

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { comprobanteService, Comprobante } from '@/services/comprobanteService';

interface ComprobanteContextType {
    comprobantes: Comprobante[];
    isLoading: boolean;
    error: string | null;
    fetchComprobantes: () => Promise<void>;
    descargarPdf: (id: number) => Promise<void>;
}

const ComprobanteContext = createContext<ComprobanteContextType | undefined>(undefined);

export function ComprobanteProvider({ children }: { children: ReactNode }) {
    const [comprobantes, setComprobantes] = useState<Comprobante[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchComprobantes = async () => {
        setIsLoading(true);
        try {
            const data = await comprobanteService.listarComprobantes();
            setComprobantes(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const descargarPdf = async (id: number) => {
        try {
            await comprobanteService.descargarPdf(id);
        } catch (err: any) {
            console.error("Error al descargar PDF:", err);
        }
    };

    useEffect(() => {
        fetchComprobantes();
    }, []);

    return (
        <ComprobanteContext.Provider
            value={{
                comprobantes,
                isLoading,
                error,
                fetchComprobantes,
                descargarPdf,
            }}
        >
            {children}
        </ComprobanteContext.Provider>
    );
}

export function useComprobantes() {
    const context = useContext(ComprobanteContext);
    if (!context) {
        throw new Error('useComprobantes must be used within a ComprobanteProvider');
    }
    return context;
}