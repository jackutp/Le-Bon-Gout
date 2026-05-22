// src/services/cocinaService.ts

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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090/api';

export const cocinaService = {
    // Obtener pedidos pendientes
    async getPedidosPendientes(): Promise<PedidoCocina[]> {
        const response = await fetch(`${API_BASE_URL}/cocina/pedidos/pendientes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al cargar los pedidos de cocina');
        }

        return response.json();
    },

    // ✅ NUEVO: Obtener historial de pedidos (LISTO y SERVIDO)
    async getHistorialPedidos(): Promise<PedidoCocina[]> {
        const response = await fetch(`${API_BASE_URL}/cocina/pedidos/historial`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al cargar el historial de pedidos');
        }

        return response.json();
    },

    // Marcar item como completado
    async marcarItemCompletado(itemId: number): Promise<ItemCocina> {
        const response = await fetch(`${API_BASE_URL}/cocina/items/${itemId}/completado`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al marcar item como completado');
        }

        return response.json();
    },

    // Marcar pedido como servido
    async marcarPedidoServido(ordenId: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/cocina/pedidos/${ordenId}/servido`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al marcar pedido como servido');
        }
    },
};