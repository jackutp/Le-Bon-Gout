// src/services/reservaService.ts

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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090/api';

class ReservaService {
    private getHeaders() {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        };
    }

    async crearReserva(data: CrearReservaRequest): Promise<ReservaResponse> {
        const response = await fetch(`${API_BASE_URL}/reservas`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Error al crear la reserva');
        }

        return response.json();
    }

    async listarReservas(): Promise<ReservaResponse[]> {
        const response = await fetch(`${API_BASE_URL}/reservas`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al cargar las reservas');
        }

        return response.json();
    }

    async listarPorEstado(estado: string): Promise<ReservaResponse[]> {
        const response = await fetch(`${API_BASE_URL}/reservas/estado/${estado}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al cargar las reservas');
        }

        return response.json();
    }

    async listarReservasDelDia(): Promise<ReservaResponse[]> {
        const response = await fetch(`${API_BASE_URL}/reservas/dia`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al cargar las reservas del día');
        }

        return response.json();
    }

    async actualizarEstado(id: number, estado: string): Promise<ReservaResponse> {
        const response = await fetch(`${API_BASE_URL}/reservas/${id}/estado?estado=${estado}`, {
            method: 'PATCH',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el estado');
        }

        return response.json();
    }
}

export const reservaService = new ReservaService();