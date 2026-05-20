// src/context/PedidoContext.tsx

"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { pedidoService, PedidoResponse, CrearPedidoRequest } from '@/services/pedidoService';

interface PedidoContextType {
  crearPedido: (request: CrearPedidoRequest) => Promise<PedidoResponse | null>;
  isLoading: boolean;
  error: string | null;
  lastPedido: PedidoResponse | null;
}

const PedidoContext = createContext<PedidoContextType | undefined>(undefined);

export function PedidoProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastPedido, setLastPedido] = useState<PedidoResponse | null>(null);

  const crearPedido = async (request: CrearPedidoRequest): Promise<PedidoResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const pedido = await pedidoService.crearPedido(request);
      setLastPedido(pedido);
      return pedido;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PedidoContext.Provider
      value={{
        crearPedido,
        isLoading,
        error,
        lastPedido,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}

export function usePedidos() {
  const context = useContext(PedidoContext);
  if (!context) {
    throw new Error('usePedidos must be used within a PedidoProvider');
  }
  return context;
}