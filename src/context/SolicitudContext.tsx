// src/context/SolicitudContext.tsx

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { solicitudService } from '@/services/solicitudService';
import { Solicitud, CrearSolicitudDTO, EstadisticasSolicitudes } from '@/types/solicitud';
import { useAuth } from './AuthContext';

interface SolicitudContextType {
    solicitudes: Solicitud[];
    isLoading: boolean;
    error: string | null;
    estadisticas: EstadisticasSolicitudes | null;
    crearSolicitud: (data: CrearSolicitudDTO) => Promise<Solicitud | null>;
    actualizarEstado: (id: number, estado: string) => Promise<Solicitud | null>;
    listarSolicitudes: () => Promise<void>;
    listarPorEstado: (estado: string) => Promise<Solicitud[]>;
    listarPorTipo: (tipo: string) => Promise<Solicitud[]>;
    obtenerSolicitud: (id: number) => Promise<Solicitud | null>;
}

const SolicitudContext = createContext<SolicitudContextType | undefined>(undefined);

export function SolicitudProvider({ children }: { children: ReactNode }) {
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [estadisticas, setEstadisticas] = useState<EstadisticasSolicitudes | null>(null);
    const { isAuthenticated } = useAuth();

    const listarSolicitudes = async () => {
        if (!isAuthenticated) return;

        setIsLoading(true);
        try {
            const data = await solicitudService.listarSolicitudes();
            setSolicitudes(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const cargarEstadisticas = async () => {
        if (!isAuthenticated) return;

        try {
            const data = await solicitudService.obtenerEstadisticas();
            setEstadisticas(data);
        } catch (err: any) {
            console.error('Error al cargar estadísticas:', err);
        }
    };

    const crearSolicitud = async (data: CrearSolicitudDTO): Promise<Solicitud | null> => {
        setIsLoading(true);
        setError(null);
        try {
            const nuevaSolicitud = await solicitudService.crearSolicitud(data);
            await listarSolicitudes();
            await cargarEstadisticas();
            return nuevaSolicitud;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const actualizarEstado = async (id: number, estado: string): Promise<Solicitud | null> => {
        setIsLoading(true);
        setError(null);
        try {
            const actualizada = await solicitudService.actualizarEstado(id, estado);
            await listarSolicitudes();
            await cargarEstadisticas();
            return actualizada;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const listarPorEstado = async (estado: string): Promise<Solicitud[]> => {
        try {
            return await solicitudService.listarPorEstado(estado);
        } catch (err: any) {
            setError(err.message);
            return [];
        }
    };

    const listarPorTipo = async (tipo: string): Promise<Solicitud[]> => {
        try {
            return await solicitudService.listarPorTipo(tipo);
        } catch (err: any) {
            setError(err.message);
            return [];
        }
    };

    const obtenerSolicitud = async (id: number): Promise<Solicitud | null> => {
        try {
            return await solicitudService.obtenerSolicitud(id);
        } catch (err: any) {
            setError(err.message);
            return null;
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            listarSolicitudes();
            cargarEstadisticas();
        }
    }, [isAuthenticated]);

    return (
        <SolicitudContext.Provider
            value={{
                solicitudes,
                isLoading,
                error,
                estadisticas,
                crearSolicitud,
                actualizarEstado,
                listarSolicitudes,
                listarPorEstado,
                listarPorTipo,
                obtenerSolicitud,
            }}
        >
            {children}
        </SolicitudContext.Provider>
    );
}

export function useSolicitudes() {
    const context = useContext(SolicitudContext);
    if (!context) {
        throw new Error('useSolicitudes must be used within a SolicitudProvider');
    }
    return context;
}