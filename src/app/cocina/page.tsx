"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useCocina } from "@/context/CocinaContext";
import { HeaderCocina } from "./components/HeaderCocina";
import { TarjetaOrdenCocina } from "./components/TarjetaOrdenCocina";
import { ModalHistorial } from "./components/ModalHistorial";
import { ModalDetallePedido } from "./components/ModalDetallePedido";
import { Order, PedidoCocinaFront } from "./types";

export default function CocinaPage() {
  const chefName = "Chef Isabelle";
  const { pedidos, historial, isLoading, marcarItemCompletado, marcarPedidoServido, fetchPedidos, fetchHistorial } = useCocina();
  const [showHistorial, setShowHistorial] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Transformar datos del backend al formato que espera el frontend
  const transformPedidos = (pedidosList: PedidoCocinaFront[]): Order[] => {
    return pedidosList.map(pedido => ({
      id: pedido.ordenId,
      table: pedido.mesaNumero,
      time: pedido.hora,
      status: pedido.estado === "LISTO" ? "pending" : "pending",
      items: pedido.items.map(item => ({
        id: item.id,
        name: item.nombre,
        qty: item.cantidad,
        notes: item.notas,
        completed: item.completado
      }))
    }));
  };

  const handleToggleItem = async (orderId: string, itemId: number) => {
    const pedido = pedidos.find(p => p.ordenId === orderId);
    const item = pedido?.items.find(i => i.id === itemId);
    if (item) {
      await marcarItemCompletado(item.id);
      await fetchPedidos();
      await fetchHistorial();
    }
  };

  const handleMarkOrderServed = async (orderId: string) => {
    await marcarPedidoServido(orderId);
    await fetchPedidos();
    await fetchHistorial();
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
  };


  const activeOrders = transformPedidos(pedidos);
  const completedOrdersCount = historial.length;
  const historialTransformado = transformPedidos(historial);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0B0B0C]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C6A96B]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-stone-100 font-sans flex flex-col">
      <HeaderCocina
        chefName={chefName}
        activeOrdersCount={activeOrders.length}
        completedOrdersCount={completedOrdersCount}
        onViewHistory={() => setShowHistorial(true)}
      />

      <main className="flex-1 p-3 lg:p-6 overflow-x-auto">
        <div className="flex gap-3 lg:gap-6 h-full items-start">
          <AnimatePresence>
            {activeOrders.length === 0 ? (
              <div className="w-full h-full flex flex-col items-center justify-center text-stone-500">
                <CheckCircle className="w-12 lg:w-16 mb-4 text-stone-800" />
                <p className="text-lg lg:text-xl font-serif">No hay comandas</p>
                <p className="text-sm">Buen trabajo, Chef.</p>
              </div>
            ) : (
              activeOrders.map((order) => (
                <TarjetaOrdenCocina
                  key={order.id}
                  order={order}
                  toggleItemCompletion={handleToggleItem}
                  markOrderServed={handleMarkOrderServed}
                  onViewDetails={handleViewDetails}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </main>

      <ModalHistorial
        isOpen={showHistorial}
        onClose={() => setShowHistorial(false)}
        pedidosServidos={historialTransformado}
      />

      <ModalDetallePedido
        isOpen={selectedOrder !== null}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
      />
    </div>
  );
}