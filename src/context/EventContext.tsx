// src/app/context/EventContext.tsx
"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { eventService, EventRequest, EventStatus, UpdateStatusDTO } from '../services/eventService';

interface EventContextType {
    events: EventRequest[];
    loading: boolean;
    error: string | null;
    stats: { PENDIENTE: number; RECIBIDO: number; CANCELADO: number };
    fetchEvents: (page?: number, size?: number) => Promise<void>;
    updateEventStatus: (id: number, status: EventStatus, reason?: string) => Promise<void>;
    deleteEvent: (id: number) => Promise<void>;
    fetchStats: () => Promise<void>;
    refreshData: () => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: React.ReactNode }) {
    const [events, setEvents] = useState<EventRequest[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState({ PENDIENTE: 0, RECIBIDO: 0, CANCELADO: 0 });
    const [currentPage, setCurrentPage] = useState(0);

    const fetchEvents = useCallback(async (page: number = 0, size: number = 10) => {
        setLoading(true);
        setError(null);
        try {
            const response = await eventService.getAllEvents(page, size);
            setEvents(response.content);
            setCurrentPage(page);
        } catch (err: any) {
            setError(err.message || 'Error al cargar los eventos');
            console.error('Error fetching events:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchStats = useCallback(async () => {
        try {
            const statsData = await eventService.getStats();
            setStats(statsData);
        } catch (err: any) {
            console.error('Error fetching stats:', err);
        }
    }, []);

    const updateEventStatus = useCallback(async (id: number, status: EventStatus, reason?: string) => {
        setLoading(true);
        try {
            const updateData: UpdateStatusDTO = { status, reason };
            await eventService.updateEventStatus(id, updateData);

            // Actualizar evento en la lista local
            setEvents(prevEvents =>
                prevEvents.map(event =>
                    event.id === id ? { ...event, status } : event
                )
            );

            // Actualizar estadísticas
            await fetchStats();
        } catch (err: any) {
            setError(err.message || 'Error al actualizar el estado');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [fetchStats]);

    const deleteEvent = useCallback(async (id: number) => {
        setLoading(true);
        try {
            await eventService.deleteEvent(id);

            // Eliminar evento de la lista local
            setEvents(prevEvents => prevEvents.filter(event => event.id !== id));

            // Actualizar estadísticas
            await fetchStats();
        } catch (err: any) {
            setError(err.message || 'Error al eliminar el evento');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [fetchStats]);

    const refreshData = useCallback(async () => {
        await Promise.all([fetchEvents(currentPage), fetchStats()]);
    }, [fetchEvents, fetchStats, currentPage]);

    useEffect(() => {
        refreshData();
    }, [refreshData]);

    return (
        <EventContext.Provider value={{
            events,
            loading,
            error,
            stats,
            fetchEvents,
            updateEventStatus,
            deleteEvent,
            fetchStats,
            refreshData
        }}>
            {children}
        </EventContext.Provider>
    );
}

export function useEvents() {
    const context = useContext(EventContext);
    if (context === undefined) {
        throw new Error('useEvents must be used within an EventProvider');
    }
    return context;
}