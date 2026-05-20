// src/app/mesero/page.tsx

"use client";

import { useState } from "react";
import { usePedidos } from "@/context/PedidoContext";
import { useProductos } from "@/context/ProductoContext";  // ← Usar el mismo contexto
import { useMesa } from "@/context/MesaContext";
import { ViewType, OrderItemState, InvoiceData } from "./types";

import { SidebarIzquierdo } from "./components/layout/SidebarIzquierdo";
import { SidebarDerecho } from "./components/layout/SidebarDerecho";
import { CatalogoProductos } from "./components/productos/CatalogoProductos";
import { EstadosMesa } from "./components/mesas/EstadosMesa";
import { ResumenOrden } from "./components/orden/ResumenOrden";
import { ModalConfirmacion } from "./components/modales/ModalConfirmacion";
import { ModalInvoice } from "./components/modales/ModalInvoice";

export default function MeseroPage() {
  const { crearPedido, isLoading: pedidoLoading } = usePedidos();
  const { menuItems, loading: productosLoading } = useProductos();  // ← Mismo contexto
  const { mesas, refreshMesas } = useMesa();
  const waiterName = "Jean-Paul";

  const [currentView, setCurrentView] = useState<ViewType>("productos");
  const [order, setOrder] = useState<OrderItemState[]>([]);
  const [selectedMesaId, setSelectedMesaId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [invoiceModal, setInvoiceModal] = useState<InvoiceData | null>(null);
  const [showMesaSelector, setShowMesaSelector] = useState(false);

  const addToOrder = (id: number) => {
    setOrder((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        const prod = menuItems.find((p) => p.productoid === id);
        if (prod && existing.qty < prod.stock) {
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

  // Mapeo para ResumenOrden (usa productoid como id)
  // Mapeo para ResumenOrden (usa productoid como id) - CON VALIDACIÓN
  const orderItems = order.map(item => {
    const prod = menuItems.find(p => p.productoid === item.id);

    if (!prod) {
      console.warn(`Producto con ID ${item.id} no encontrado en el menú`);
      return null;
    }

    return {
      id: prod.productoid!,
      // Español (para compatibilidad)
      nombre: prod.nombre,
      precio: prod.precio,
      descripcion: prod.descripcion,
      categoria: prod.categoria,
      img: prod.imagenUrl || prod.imagenProducto || "/placeholder.jpg",
      inStock: prod.stock,
      qty: item.qty,
      // Inglés (para ResumenOrden)
      name: prod.nombre,
      price: prod.precio,
    };
  }).filter((item): item is NonNullable<typeof item> => item !== null);

  const total = orderItems.reduce((acc, item) => acc + item.precio * item.qty, 0);

  const handleConfirm = async () => {
    if (!selectedMesaId) {
      setShowMesaSelector(true);
      return;
    }

    // Buscar la mesa seleccionada para obtener su ID real
    const mesaSeleccionada = mesas.find(m => m.numero === selectedMesaId);

    if (!mesaSeleccionada) {
      alert("Mesa no encontrada");
      return;
    }

    const itemsForBackend = orderItems.map(item => ({
      productoId: item.id,
      nombre: item.nombre,
      precio: item.precio,
      cantidad: item.qty,
      notas: "",
    }));

    const pedido = await crearPedido({
      mesaNumero: mesaSeleccionada.id,  // ← Enviar el ID real (no el número)
      items: itemsForBackend,
    });

    if (pedido) {
      alert(`Pedido #${pedido.ordenId} enviado a cocina para la Mesa ${selectedMesaId}`);
      setOrder([]);
      setSelectedMesaId(null);
      await refreshMesas();  // ← AGREGAR ESTA LÍNEA
    } else {
      alert("Error al crear el pedido");
    }
    setShowModal(false);
  };

  const mesasDisponibles = mesas.filter(m => m.estado === "DISPONIBLE");


  if (productosLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0B0B0C]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C6A96B]"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-stone-100 flex font-sans">
      <div className="grid grid-cols-12 w-full min-h-screen">
        <SidebarIzquierdo
          currentView={currentView}
          setCurrentView={setCurrentView}
        />

        <div className="col-span-8 flex flex-col h-screen overflow-hidden">
          <header className="flex justify-between items-center p-4 border-b border-stone-800 bg-[#121214]/80 backdrop-blur">
            <div>
              <h1 className="text-lg font-serif text-[#C6A96B]">
                {currentView === "productos" ? "Catalogo de Productos" : "Estados de Mesa"}
              </h1>
              <p className="text-xs text-stone-400">Bienvenido, {waiterName}</p>
            </div>
            {selectedMesaId && (
              <div className="text-xs text-[#C6A96B] border border-[#C6A96B]/30 px-3 py-1 rounded">
                Mesa {selectedMesaId}
              </div>
            )}
          </header>

          <main className="flex-1 overflow-y-auto p-4">
            {currentView === "productos" ? (
              <CatalogoProductos addToOrder={addToOrder} />
            ) : (
              <EstadosMesa setInvoiceModal={setInvoiceModal} />
            )}
          </main>
        </div>

        <SidebarDerecho>
          <ResumenOrden
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
        orderItems={orderItems}
        total={total}
        handleConfirm={handleConfirm}
        isLoading={pedidoLoading}
      />

      {showMesaSelector && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black/80" onClick={() => setShowMesaSelector(false)} />
            <div className="relative bg-[#121214] rounded-lg w-full max-w-md p-6 border border-stone-800">
              <h3 className="text-xl font-serif text-[#C6A96B] mb-4">Seleccionar Mesa</h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {mesasDisponibles.length === 0 ? (
                  <p className="text-stone-400 col-span-2 text-center py-4">No hay mesas disponibles</p>
                ) : (
                  mesasDisponibles.map((mesa) => (
                    <button
                      key={mesa.id}
                      onClick={() => {
                        setSelectedMesaId(mesa.numero);
                        setShowMesaSelector(false);
                        setShowModal(true);
                      }}
                      className="bg-stone-800 hover:bg-[#C6A96B] hover:text-black p-4 rounded transition-colors"
                    >
                      <span className="text-lg font-bold">Mesa {mesa.numero}</span>
                      <p className="text-xs opacity-70">{mesa.capacidad} personas</p>
                    </button>
                  ))
                )}
              </div>
              <button
                onClick={() => setShowMesaSelector(false)}
                className="w-full border border-stone-800 text-stone-400 uppercase tracking-widest text-xs py-2 hover:text-white transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <ModalInvoice
        isOpen={invoiceModal !== null}
        onClose={() => setInvoiceModal(null)}
        invoiceModal={invoiceModal}
      />
    </div>
  );
}