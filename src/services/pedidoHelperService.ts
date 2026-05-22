// src/services/pedidoHelperService.ts

export interface PedidoInfo {
    id: number;
    ordenId: string;
    mesaNumero: number;
    estado: string;
    total?: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090/api';

class PedidoHelperService {

    async obtenerPedidoActivoPorMesa(mesaNumero: number): Promise<PedidoInfo | null> {
        // Estados posibles para un pedido activo (pendiente o servido)
        const estados = ["PENDIENTE", "SERVIDO"];

        for (const estado of estados) {
            try {
                const response = await fetch(`${API_BASE_URL}/pedidos/estado/${estado}`);
                if (!response.ok) continue;

                const pedidos = await response.json();
                const pedido = pedidos.find((p: any) => p.mesaNumero === mesaNumero);

                if (pedido) {
                    return {
                        id: pedido.id,
                        ordenId: pedido.ordenId,
                        mesaNumero: pedido.mesaNumero,
                        estado: pedido.estado,
                    };
                }
            } catch (error) {
                console.error(`Error obteniendo pedidos ${estado}:`, error);
            }
        }

        return null;
    }
}

export const pedidoHelperService = new PedidoHelperService();