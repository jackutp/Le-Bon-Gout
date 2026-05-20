// src/services/pedidoService.ts

export interface PedidoItemRequest {
    productoId: number;
    nombre: string;
    precio: number;
    cantidad: number;
    notas?: string;
}

export interface CrearPedidoRequest {
    mesaNumero: number;
    items: PedidoItemRequest[];
}

export interface PedidoItemResponse {
    id: number;
    productoId: number;
    nombre: string;
    precio: number;
    cantidad: number;
    notas: string;
    completado: boolean;
}

export interface PedidoResponse {
    id: number;
    ordenId: string;
    mesaNumero: number;
    hora: string;
    estado: "PENDIENTE" | "EN_PREPARACION" | "SERVIDO" | "COMPLETADO";
    items: PedidoItemResponse[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090/api';

class PedidoService {
    private getHeaders() {
        return {
            'Content-Type': 'application/json',
        };
    }

    async crearPedido(data: CrearPedidoRequest): Promise<PedidoResponse> {
        const response = await fetch(`${API_BASE_URL}/pedidos`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Error al crear el pedido');
        }

        return response.json();
    }

    async getAllPedidos(): Promise<PedidoResponse[]> {
        const response = await fetch(`${API_BASE_URL}/pedidos`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al cargar los pedidos');
        }

        return response.json();
    }

    async getPedidoById(id: number): Promise<PedidoResponse> {
        const response = await fetch(`${API_BASE_URL}/pedidos/${id}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al cargar el pedido');
        }

        return response.json();
    }

    async getPedidoByOrdenId(ordenId: string): Promise<PedidoResponse> {
        const response = await fetch(`${API_BASE_URL}/pedidos/orden/${ordenId}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al cargar el pedido');
        }

        return response.json();
    }

    async getPedidosByEstado(estado: string): Promise<PedidoResponse[]> {
        const response = await fetch(`${API_BASE_URL}/pedidos/estado/${estado}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al cargar los pedidos');
        }

        return response.json();
    }

    async actualizarEstado(id: number, estado: string): Promise<PedidoResponse> {
        const response = await fetch(`${API_BASE_URL}/pedidos/${id}/estado`, {
            method: 'PATCH',
            headers: this.getHeaders(),
            body: JSON.stringify({ estado }),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el estado');
        }

        return response.json();
    }

    async actualizarItemCompletado(itemId: number, completado: boolean): Promise<PedidoItemResponse> {
        const response = await fetch(`${API_BASE_URL}/pedidos/items/${itemId}/completado`, {
            method: 'PATCH',
            headers: this.getHeaders(),
            body: JSON.stringify({ completado }),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el item');
        }

        return response.json();
    }
}

export const pedidoService = new PedidoService();