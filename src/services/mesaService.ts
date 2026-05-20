// src/services/mesaService.ts

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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090/api';

class MesaService {
    private getHeaders() {
        return {
            'Content-Type': 'application/json',
        };
    }

    async getAllMesas(): Promise<Mesa[]> {
        const response = await fetch(`${API_BASE_URL}/mesas`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al cargar las mesas');
        }

        return response.json();
    }

    async getMesaById(id: number): Promise<Mesa> {
        const response = await fetch(`${API_BASE_URL}/mesas/${id}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al cargar la mesa');
        }

        return response.json();
    }

    async createMesa(data: CreateMesaDTO): Promise<Mesa> {
        const response = await fetch(`${API_BASE_URL}/mesas`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Error al crear la mesa');
        }

        return response.json();
    }

    async updateMesa(id: number, data: UpdateMesaDTO): Promise<Mesa> {
        const response = await fetch(`${API_BASE_URL}/mesas/${id}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Error al actualizar la mesa');
        }

        return response.json();
    }

    async deleteMesa(id: number): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/mesas/${id}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Error al eliminar la mesa');
        }
    }

    async updateMesaEstado(id: number, estado: string, totalActual?: number, ordenActualId?: string): Promise<Mesa> {
        const response = await fetch(`${API_BASE_URL}/mesas/${id}/estado`, {
            method: 'PATCH',
            headers: this.getHeaders(),
            body: JSON.stringify({ estado, totalActual, ordenActualId }),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el estado de la mesa');
        }

        return response.json();
    }

    async updateMesaTotal(id: number, total: number): Promise<Mesa> {
        const response = await fetch(`${API_BASE_URL}/mesas/${id}/total`, {
            method: 'PATCH',
            headers: this.getHeaders(),
            body: JSON.stringify({ total }),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el total de la mesa');
        }

        return response.json();
    }
}

export const mesaService = new MesaService();