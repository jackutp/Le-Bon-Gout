// src/hooks/usePedidoActivo.ts

import { useState, useCallback } from 'react';
import { pedidoHelperService, PedidoInfo } from '@/services/pedidoHelperService';

export function usePedidoActivo() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const obtenerPedidoActivo = useCallback(async (mesaNumero: number): Promise<PedidoInfo | null> => {
        setIsLoading(true);
        setError(null);

        try {
            const pedido = await pedidoHelperService.obtenerPedidoActivoPorMesa(mesaNumero);
            if (!pedido) {
                setError("No se encontró un pedido activo para esta mesa");
            }
            return pedido;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        obtenerPedidoActivo,
        isLoading,
        error,
    };
}