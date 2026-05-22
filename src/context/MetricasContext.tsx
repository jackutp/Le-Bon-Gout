// src/context/MetricasContext.tsx

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { metricasService, MetricasPedidos, MetricasPagos } from '@/services/metricasService';

interface MetricasContextType {
    metricasPedidos: MetricasPedidos | null;
    metricasPagos: MetricasPagos | null;
    isLoading: boolean;
    error: string | null;
    refreshMetricas: () => Promise<void>;
}

const MetricasContext = createContext<MetricasContextType | undefined>(undefined);

export function MetricasProvider({ children }: { children: ReactNode }) {
    const [metricasPedidos, setMetricasPedidos] = useState<MetricasPedidos | null>(null);
    const [metricasPagos, setMetricasPagos] = useState<MetricasPagos | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refreshMetricas = async () => {
        setIsLoading(true);
        try {
            const [pedidos, pagos] = await Promise.all([
                metricasService.getMetricasPedidos(),
                metricasService.getMetricasPagos()
            ]);
            setMetricasPedidos(pedidos);
            setMetricasPagos(pagos);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshMetricas();
        const interval = setInterval(refreshMetricas, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <MetricasContext.Provider
            value={{
                metricasPedidos,
                metricasPagos,
                isLoading,
                error,
                refreshMetricas,
            }}
        >
            {children}
        </MetricasContext.Provider>
    );
}

export function useMetricas() {
    const context = useContext(MetricasContext);
    if (!context) throw new Error('useMetricas must be used within MetricasProvider');
    return context;
}