// src/services/reservaService.ts
import { apiFetch } from './apiClient';

export interface CrearReservaRequest {
    nombre: string;
    apellido?: string;
    email: string;
    telefono?: string;
    fecha: string;
    hora: string;
    personas: number;
    experiencia: string;
    alergias?: string;
    requerimientos?: string;
    necesidades?: string;
}

export interface ReservaResponse {
    id: number;
    codigo: string;
    estado: "PENDIENTE" | "ACEPTADA" | "CANCELADA" | "COMPLETADA";
    nombre: string;
    apellido?: string;
    email: string;
    telefono?: string;
    fecha: string;
    hora: string;
    personas: number;
    experiencia: string;
    alergias?: string;
    requerimientos?: string;
    necesidades?: string;
    createdAt: string;
    updatedAt: string;
}

class ReservaService {
    async crearReserva(data: CrearReservaRequest): Promise<ReservaResponse> {
        // Reservas a veces son públicas, pero permitimos enviar token si lo tienen o podemos usar skipAuth si no tienen sesión.
        // Si el usuario no tiene token, apiFetch no lo enviará.
        const response = await apiFetch('/reservas/crear', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Error al crear la reserva');
        }

        return response.json();
    }

    async listarReservas(): Promise<ReservaResponse[]> {
        const response = await apiFetch('/reservas/all');

        if (!response.ok) {
            throw new Error('Error al cargar las reservas');
        }

        return response.json();
    }

    async listarPorEstado(estado: string): Promise<ReservaResponse[]> {
        const response = await apiFetch(`/reservas/estado/${estado}`);

        if (!response.ok) {
            throw new Error('Error al cargar las reservas');
        }

        return response.json();
    }

    async listarReservasDelDia(): Promise<ReservaResponse[]> {
        const response = await apiFetch('/reservas/dia');

        if (!response.ok) {
            throw new Error('Error al cargar las reservas del día');
        }

        return response.json();
    }

    async actualizarEstado(id: number, estado: string): Promise<ReservaResponse> {
        const response = await apiFetch(`/reservas/${id}/estado?estado=${estado}`, {
            method: 'PATCH',
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el estado');
        }

        return response.json();
    }
}

export const reservaService = new ReservaService();