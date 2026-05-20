"use client";

import { useState } from "react";
import { usePedidos } from "@/context/PedidoContext";
import { useMenuLocal } from "@/context/MenuLocalContext";

import { ViewType, OrderItemState, InvoiceData } from "./types";
import { MOCK_TABLES } from "./utils";

import { SidebarIzquierdo } from "./components/layout/SidebarIzquierdo";
import { SidebarDerecho } from "./components/layout/SidebarDerecho";
import { CatalogoProductos } from "./components/productos/CatalogoProductos";
import { EstadosMesa } from "./components/mesas/EstadosMesa";
import { ResumenOrden } from "./components/orden/ResumenOrden";
import { ModalConfirmacion } from "./components/modales/ModalConfirmacion";
import { ModalInvoice } from "./components/modales/ModalInvoice";

export default function MeseroPage() {
  const { addOrder } = usePedidos();
  const { menuItems } = useMenuLocal();
  const waiterName = "Jean-Paul";

  const [selectedTable, setSelectedTable] = useState("1");
  const [currentView, setCurrentView] = useState<ViewType>("productos");
  const [order, setOrder] = useState<OrderItemState[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [showSentModal, setShowSentModal] = useState(false);
  const [invoiceModal, setInvoiceModal] = useState<InvoiceData | null>(null);

  const addToOrder = (id: number) => {
    setOrder((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        const prod = menuItems.find((p) => p.id === id);
        if (prod && existing.qty < prod.inStock) {
          return prev.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item);
        }
        return prev;
      }
      return [...prev, { id, qty: 1 }];
    });
  };

  const removeFromOrder = (id: number) => {
    setOrder((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing && existing.qty > 1) {
        return prev.map((item) => item.id === id ? { ...item, qty: item.qty - 1 } : item);
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  const orderItems = order.map(item => {
    const prod = menuItems.find(p => p.id === item.id)!;
    return { ...prod, qty: item.qty };
  });

  const total = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleConfirm = () => {
    const itemsForContext = orderItems.map(item => ({
      id: Date.now() + item.id,
      productId: item.id,
      name: item.name,
      price: item.price,
      qty: item.qty,
    }));
    addOrder(parseInt(selectedTable), itemsForContext);
    alert(`Orden enviada a cocina para la Mesa ${selectedTable}`);
    setOrder([]);
    setShowModal(false);
    setShowSentModal(false);
  };

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-stone-100 flex font-sans">
      <div className="grid grid-cols-12 w-full min-h-screen">
        <SidebarIzquierdo
          currentView={currentView}
          setCurrentView={setCurrentView}
          selectedTable={selectedTable}
          setSelectedTable={setSelectedTable}
        />

        {/* COLUMNA 2: CONTENIDO CENTRAL */}
        <div className="col-span-8 flex flex-col h-screen overflow-hidden">
          <header className="flex justify-between items-center p-4 border-b border-stone-800 bg-[#121214]/80 backdrop-blur">
            <div>
              <h1 className="text-lg font-serif text-[#C6A96B]">
                {currentView === "productos" ? "Catalogo de Productos" : "Estados de Mesa"}
              </h1>
              <p className="text-xs text-stone-400">Bienvenido, {waiterName}</p>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4">
            {currentView === "productos" ? (
              <CatalogoProductos
                addToOrder={addToOrder}
              />
            ) : (
              <EstadosMesa
                tables={MOCK_TABLES}
                setInvoiceModal={setInvoiceModal}
              />
            )}
          </main>
        </div>

        <SidebarDerecho>
          <ResumenOrden
            selectedTable={selectedTable}
            orderItems={orderItems}
            total={total}
            removeFromOrder={removeFromOrder}
            addToOrder={addToOrder}
            setShowModal={setShowModal}
          />
        </SidebarDerecho>
      </div>

      <ModalConfirmacion
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        selectedTable={selectedTable}
        orderItems={orderItems}
        total={total}
        handleConfirm={handleConfirm}
      />

      <ModalInvoice
        isOpen={invoiceModal !== null}
        onClose={() => setInvoiceModal(null)}
        invoiceModal={invoiceModal}
      />
    </div>
  );
}