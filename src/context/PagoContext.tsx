// src/context/PagoContext.tsx

"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { pagoService, ProcesarPagoRequest, ProcesarPagoResponse } from '@/services/pagoService';

interface PagoContextType {
    procesarPago: (data: ProcesarPagoRequest) => Promise<ProcesarPagoResponse | null>;
    isLoading: boolean;
    error: string | null;
    lastPago: ProcesarPagoResponse | null;
    clearMessages: () => void;
}

const PagoContext = createContext<PagoContextType | undefined>(undefined);

export function PagoProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastPago, setLastPago] = useState<ProcesarPagoResponse | null>(null);

    const clearMessages = () => {
        setError(null);
    };

    const procesarPago = async (data: ProcesarPagoRequest): Promise<ProcesarPagoResponse | null> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await pagoService.procesarPago(data);
            setLastPago(response);
            return response;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PagoContext.Provider
            value={{
                procesarPago,
                isLoading,
                error,
                lastPago,
                clearMessages,
            }}
        >
            {children}
        </PagoContext.Provider>
    );
}

export function usePago() {
    const context = useContext(PagoContext);
    if (!context) {
        throw new Error('usePago must be used within a PagoProvider');
    }
    return context;
}