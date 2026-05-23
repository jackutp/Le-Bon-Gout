// src/services/cocinaService.ts
import { apiFetch } from './apiClient';

export interface ItemCocina {
    id: number;
    productoId: number;
    nombre: string;
    cantidad: number;
    notas: string;
    completado: boolean;
}

export interface PedidoCocina {
    id: number;
    ordenId: string;
    mesaNumero: number;
    hora: string;
    estado: string;
    items: ItemCocina[];
}

export const cocinaService = {
    // Obtener pedidos pendientes
    async getPedidosPendientes(): Promise<PedidoCocina[]> {
        const response = await apiFetch('/cocina/pedidos/pendientes');

        if (!response.ok) {
            throw new Error('Error al cargar los pedidos de cocina');
        }

        return response.json();
    },

    // Obtener historial de pedidos (LISTO y SERVIDO)
    async getHistorialPedidos(): Promise<PedidoCocina[]> {
        const response = await apiFetch('/cocina/pedidos/historial');

        if (!response.ok) {
            throw new Error('Error al cargar el historial de pedidos');
        }

        return response.json();
    },

    // Marcar item como completado
    async marcarItemCompletado(itemId: number): Promise<ItemCocina> {
        const response = await apiFetch(`/cocina/items/${itemId}/completado`, {
            method: 'PATCH',
        });

        if (!response.ok) {
            throw new Error('Error al marcar item como completado');
        }

        return response.json();
    },

    // Marcar pedido como servido
    async marcarPedidoServido(ordenId: string): Promise<void> {
        const response = await apiFetch(`/cocina/pedidos/${ordenId}/servido`, {
            method: 'PATCH',
        });

        if (!response.ok) {
            throw new Error('Error al marcar pedido como servido');
        }
    },
};