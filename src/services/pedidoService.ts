// src/services/pedidoService.ts
import { apiFetch } from './apiClient';

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

class PedidoService {
    async crearPedido(data: CrearPedidoRequest): Promise<PedidoResponse> {
        const response = await apiFetch('/pedidos/crear', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Error al crear el pedido');
        }
        return response.json();
    }

    async getAllPedidos(): Promise<PedidoResponse[]> {
        const response = await apiFetch('/pedidos/all');
        if (!response.ok) {
            throw new Error('Error al cargar los pedidos');
        }
        return response.json();
    }

    async getPedidoById(id: number): Promise<PedidoResponse> {
        const response = await apiFetch(`/pedidos/${id}`);
        if (!response.ok) {
            throw new Error('Error al cargar el pedido');
        }
        return response.json();
    }

    async getPedidoByOrdenId(ordenId: string): Promise<PedidoResponse> {
        const response = await apiFetch(`/pedidos/orden/${ordenId}`);
        if (!response.ok) {
            throw new Error('Error al cargar el pedido');
        }
        return response.json();
    }

    async getPedidosByEstado(estado: string): Promise<PedidoResponse[]> {
        const response = await apiFetch(`/pedidos/estado/${estado}`);
        if (!response.ok) {
            throw new Error('Error al cargar los pedidos');
        }
        return response.json();
    }

    async actualizarEstado(id: number, estado: string): Promise<PedidoResponse> {
        const response = await apiFetch(`/pedidos/${id}/estado`, {
            method: 'PATCH',
            body: JSON.stringify({ estado }),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el estado');
        }
        return response.json();
    }

    async actualizarItemCompletado(itemId: number, completado: boolean): Promise<PedidoItemResponse> {
        const response = await apiFetch(`/pedidos/items/${itemId}/completado`, {
            method: 'PATCH',
            body: JSON.stringify({ completado }),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el item');
        }
        return response.json();
    }
}

export const pedidoService = new PedidoService();