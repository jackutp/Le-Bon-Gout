// src/services/mesaService.ts
import { apiFetch } from './apiClient';

export interface Mesa {
    id: number;
    numero: number;
    capacidad: number;
    estado: "DISPONIBLE" | "OCUPADO" | "RESERVADO";
    totalActual: number;
    ordenActualId?: string;
}

export interface CreateMesaDTO {
    numero: number;
    capacidad: number;
}

export interface UpdateMesaDTO {
    numero: number;
    capacidad: number;
}

class MesaService {
    async getAllMesas(): Promise<Mesa[]> {
        const response = await apiFetch('/mesas/all');
        if (!response.ok) {
            throw new Error('Error al cargar las mesas');
        }
        return response.json();
    }

    async getMesaById(id: number): Promise<Mesa> {
        const response = await apiFetch(`/mesas/${id}`);
        if (!response.ok) {
            throw new Error('Error al cargar la mesa');
        }
        return response.json();
    }

    async createMesa(data: CreateMesaDTO): Promise<Mesa> {
        const response = await apiFetch('/mesas/crear', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Error al crear la mesa');
        }
        return response.json();
    }

    async updateMesa(id: number, data: UpdateMesaDTO): Promise<Mesa> {
        const response = await apiFetch(`/mesas/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Error al actualizar la mesa');
        }
        return response.json();
    }

    async deleteMesa(id: number): Promise<void> {
        const response = await apiFetch(`/mesas/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Error al eliminar la mesa');
        }
    }

    async updateMesaEstado(id: number, estado: string, totalActual?: number, ordenActualId?: string): Promise<Mesa> {
        const response = await apiFetch(`/mesas/${id}/estado`, {
            method: 'PATCH',
            body: JSON.stringify({ estado, totalActual, ordenActualId }),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el estado de la mesa');
        }
        return response.json();
    }

    async updateMesaTotal(id: number, total: number): Promise<Mesa> {
        const response = await apiFetch(`/mesas/${id}/total`, {
            method: 'PATCH',
            body: JSON.stringify({ total }),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el total de la mesa');
        }
        return response.json();
    }
}

export const mesaService = new MesaService();