"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LogOut, Plus, Minus, Send, X, ShoppingBag, Clock, UtensilsCrossed, LayoutGrid, FileText, Receipt, Truck, Package, Edit, Save } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useOrders } from "@/context/OrderContext";

type ViewType = "productos" | "estados";

const MOCK_TABLES = [
  { id: 1, number: 1, occupied: true, total: 145.00, img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400" },
  { id: 2, number: 2, occupied: true, total: 89.50, img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400" },
  { id: 3, number: 3, occupied: false, total: 0, img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400" },
  { id: 4, number: 4, occupied: true, total: 210.00, img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400" },
  { id: 5, number: 5, occupied: false, total: 0, img: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?w=400" },
  { id: 6, number: 6, occupied: true, total: 175.00, img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400" },
  { id: 7, number: 7, occupied: false, total: 0, img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400" },
  { id: 8, number: 8, occupied: true, total: 320.00, img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400" },
];

export default function MeseroPage() {
  const { orders, addOrder, updateOrderItems, menuItems, syncStockChange } = useOrders();
  const waiterName = "Jean-Paul";
  const [selectedTable, setSelectedTable] = useState("1");
  const [currentView, setCurrentView] = useState<ViewType>("productos");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [order, setOrder] = useState<{ id: number; qty: number }[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showSentModal, setShowSentModal] = useState(false);
  const [invoiceModal, setInvoiceModal] = useState<{ table: number; total: number } | null>(null);
  const [invoiceType, setInvoiceType] = useState<"boleta" | "factura" | null>(null);

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

  const sentOrders = orders.filter(o => o.status === "pending" || o.status === "served");

  const updateItemQty = (orderId: string, productId: number, delta: number) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    const oldItem = order.items.find(i => i.productId === productId);
    if (!oldItem) return;
    
    const newQty = Math.max(0, oldItem.qty + delta);
    if (newQty === 0) return;
    
    syncStockChange(productId, oldItem.qty, newQty);
    
    const newItems = order.items.map(item => {
      if (item.productId === productId) {
        return { ...item, qty: newQty };
      }
      return item;
    });
    updateOrderItems(orderId, newItems);
  };

  const filteredItems = categoryFilter === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === categoryFilter);

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-stone-100 flex font-sans">
      {/* SIDEBAR PERSISTENTE */}
      <aside className="hidden lg:flex w-64 bg-[#121214] border-r border-stone-800 flex-col h-screen fixed left-0 top-0 z-30">
        <div className="p-6 border-b border-stone-800">
          <h2 className="text-xl font-serif text-[#C6A96B] uppercase tracking-widest">Le Bon Gout</h2>
          <p className="text-xs text-stone-500 mt-1">Panel Mesero</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: "productos", icon: Package, label: "Productos" },
            { id: "estados", icon: LayoutGrid, label: "Estados de Mesa" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setCurrentView(item.id as ViewType); }}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded text-sm uppercase tracking-widest transition-colors ${currentView === item.id ? "bg-[#C6A96B]/10 text-[#C6A96B] border border-[#C6A96B]/30" : "text-stone-400 hover:text-white hover:bg-stone-900"
                }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-stone-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-stone-400">Mesa:</span>
            <select 
              value={selectedTable} 
              onChange={(e) => setSelectedTable(e.target.value)} 
              className="bg-[#0B0B0C] border border-stone-800 text-white px-2 py-1 text-sm"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <Link href="/login" className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm text-stone-400 hover:text-white uppercase tracking-widest transition-colors">
            <LogOut className="w-4 h-4" />
            Cerrar Sesion
          </Link>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 lg:ml-64 flex flex-col h-screen overflow-hidden">
        <header className="flex justify-between items-center p-4 lg:p-6 border-b border-stone-800 bg-[#121214]">
          <div>
            <h1 className="text-xl lg:text-2xl font-serif text-[#C6A96B]">
              {currentView === "productos" ? "Catalogo de Productos" : "Estados de Mesa"}
            </h1>
            <p className="text-sm text-stone-400">Bienvenido, {waiterName}</p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowSentModal(true)} className="bg-[#C6A96B]/10 text-[#C6A96B] px-3 py-2 rounded text-sm uppercase tracking-widest hover:bg-[#C6A96B]/20 border border-[#C6A96B]/30">
              Enviados
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {currentView === "productos" ? (
            <>
              {/* FILTROS */}
              <div className="flex gap-2 mb-6">
                {["all", "Plato", "Bebida", "Postre"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-4 py-2 rounded text-sm uppercase tracking-widest transition-colors ${categoryFilter === cat ? "bg-[#C6A96B] text-black" : "border border-stone-800 text-stone-400 hover:text-white hover:border-[#C6A96B]"}`}
                  >
                    {cat === "all" ? "Todos" : cat === "Plato" ? "Platillos" : cat === "Bebida" ? "Bebidas" : cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {filteredItems.map((product) => (
                  <motion.div key={product.id} whileHover={{ scale: 1.02 }} className={`bg-[#121214] border ${product.inStock === 0 ? 'border-red-900/50 opacity-70' : 'border-stone-800'} rounded-lg overflow-hidden flex flex-col`}>
                    <div className="relative h-40 lg:h-48 w-full">
                      <Image src={product.img} alt={product.name} fill className="object-cover" />
                      <div className="absolute top-2 lg:top-3 right-2 lg:right-3">
                        <span className={`text-xs font-bold px-2 lg:px-3 py-1 rounded-full ${product.inStock > 0 ? 'bg-black/80 text-[#C6A96B] border border-[#C6A96B]' : 'bg-red-900/80 text-white border border-red-500'}`}>
                          {product.inStock > 0 ? `${product.inStock}` : 'Agot'}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 lg:p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-lg lg:text-xl mb-1">{product.name}</h3>
                        <p className="text-xs lg:text-sm text-stone-400 mb-2 lg:mb-4">{product.desc}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-[#C6A96B]">S/ {product.price.toFixed(2)}</span>
                        <button onClick={() => addToOrder(product.id)} disabled={product.inStock === 0} className="bg-stone-800 hover:bg-[#C6A96B] hover:text-black disabled:opacity-50 disabled:hover:bg-stone-800 disabled:hover:text-white text-white p-2 rounded transition-colors">
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <>
              {/* ESTADOS DE MESA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {MOCK_TABLES.map((table) => (
                  <motion.div key={table.id} whileHover={{ scale: 1.02 }} className={`bg-[#121214] border ${table.occupied ? 'border-stone-800' : 'border-stone-800/50'} rounded-lg overflow-hidden flex flex-col`}>
                    <div className="relative h-32 w-full">
                      <Image src={table.img} alt={`Mesa ${table.number}`} fill className="object-cover opacity-60" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="font-serif text-xl text-white">Mesa {table.number}</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      {table.occupied ? (
                        <>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-stone-400 text-sm">Total:</span>
                            <span className="font-serif text-lg text-[#C6A96B]">S/ {table.total.toFixed(2)}</span>
                          </div>
                          <button 
                            onClick={() => setInvoiceModal({ table: table.number, total: table.total })}
                            className="w-full bg-[#C6A96B]/10 text-[#C6A96B] border border-[#C6A96B]/30 px-3 py-2 rounded text-sm uppercase tracking-widest hover:bg-[#C6A96B]/20 transition-colors flex items-center justify-center gap-2"
                          >
                            <Receipt className="w-4 h-4" />
                            Emitir comprobante
                          </button>
                        </>
                      ) : (
                        <div className="text-center text-stone-500 text-sm py-2">Disponible</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>

      {/* PANEL PEDIDO (SIDEBAR DERECHO) */}
      <aside className="hidden lg:flex w-80 bg-[#121214] border-l border-stone-800 flex-col h-screen fixed right-0 top-0">
        <div className="p-6 border-b border-stone-800 bg-black/20">
          <h2 className="text-xl font-serif text-[#C6A96B] flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Mesa {selectedTable}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {orderItems.length === 0 ? (
            <div className="h-full flex items-center justify-center text-stone-500 text-sm italic text-center">
              No hay productos seleccionados.
            </div>
          ) : (
            <AnimatePresence>
              {orderItems.map((item) => (
                <motion.div key={item.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex justify-between items-center border-b border-stone-800 pb-4">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{item.name}</h4>
                    <p className="text-xs text-[#C6A96B]">S/ {item.price.toFixed(2)} x {item.qty}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button onClick={() => removeFromOrder(item.id)} className="p-1 bg-stone-800 hover:bg-stone-700 rounded text-stone-300">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-4 text-center text-sm">{item.qty}</span>
                    <button onClick={() => addToOrder(item.id)} disabled={item.qty >= item.inStock} className="p-1 bg-stone-800 hover:bg-stone-700 disabled:opacity-50 rounded text-stone-300">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        <div className="p-6 border-t border-stone-800 bg-black/20">
          <div className="flex justify-between items-center mb-4 lg:mb-6">
            <span className="text-stone-400 uppercase tracking-widest text-sm">Total</span>
            <span className="text-2xl font-serif text-[#C6A96B]">S/ {total.toFixed(2)}</span>
          </div>
          <button onClick={() => setShowModal(true)} disabled={order.length === 0} className="w-full bg-[#C6A96B] hover:bg-white text-black font-medium uppercase tracking-widest text-sm py-4 transition-colors disabled:opacity-50 disabled:hover:bg-[#C6A96B] flex justify-center items-center gap-2">
            <Send className="w-4 h-4" />
            Enviar a Cocina
          </button>
        </div>
      </aside>

      {/* MODAL CONFIRMACION */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-[#121214] border border-stone-800 shadow-2xl p-8 max-w-md w-full">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-stone-500 hover:text-white"><X className="w-5 h-5" /></button>
              <h2 className="text-2xl font-serif text-[#C6A96B] mb-2">Resumen de Orden</h2>
              <p className="text-stone-400 text-sm mb-6 uppercase tracking-widest">Mesa {selectedTable}</p>
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span><span className="text-[#C6A96B] mr-2">{item.qty}x</span> {item.name}</span>
                    <span className="text-stone-400">S/ {(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-stone-800 pt-4 flex justify-between items-center mb-8">
                <span className="font-serif text-lg">Total Final</span>
                <span className="font-serif text-xl text-[#C6A96B]">S/ {total.toFixed(2)}</span>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setShowModal(false)} className="flex-1 border border-stone-800 text-stone-400 uppercase tracking-widest text-xs py-3 hover:text-white transition-colors">
                  Cancelar
                </button>
                <button onClick={handleConfirm} className="flex-1 bg-[#C6A96B] text-black uppercase tracking-widest text-xs py-3 hover:bg-white transition-colors">
                  Confirmar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL PEDIDOS ENVIADOS */}
      <AnimatePresence>
        {showSentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowSentModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-[#121214] border border-stone-800 shadow-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <button onClick={() => setShowSentModal(false)} className="absolute top-4 right-4 text-stone-500 hover:text-white"><X className="w-5 h-5" /></button>
              <h2 className="text-2xl font-serif text-[#C6A96B] mb-6">Pedidos Enviados</h2>
              {sentOrders.length === 0 ? (
                <p className="text-stone-500 text-center py-8">No hay pedidos enviados.</p>
              ) : (
                <div className="space-y-4">
                  {sentOrders.map(order => (
                    <div key={order.id} className="border border-stone-800 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <span className="font-serif text-lg text-[#C6A96B]">Mesa {order.table}</span>
                          <p className="text-xs text-stone-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {order.time}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded ${order.status === 'served' ? 'bg-green-900/30 text-green-500' : 'bg-amber-500/20 text-amber-500'}`}>
                          {order.status === 'served' ? 'Completado' : 'En cocina'}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {order.items.map(item => (
                          <div key={item.id} className="flex justify-between items-center text-sm">
                            <span>{item.qty}x {item.name}</span>
                            <div className="flex items-center gap-2">
                              <button onClick={() => updateItemQty(order.id, item.productId, -1)} className="p-1 bg-stone-800 rounded"><Minus className="w-3 h-3" /></button>
                              <span>{item.qty}</span>
                              <button onClick={() => updateItemQty(order.id, item.productId, 1)} className="p-1 bg-stone-800 rounded"><Plus className="w-3 h-3" /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-6 pt-4 border-t border-stone-800">
                <button onClick={() => setShowSentModal(false)} className="w-full bg-[#C6A96B] text-black font-medium uppercase tracking-widest text-sm py-3 hover:bg-white transition-colors">
                  Aceptar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL INVOICE */}
      <AnimatePresence>
        {invoiceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setInvoiceModal(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-[#121214] border border-stone-800 shadow-2xl p-8 max-w-md w-full">
              <button onClick={() => setInvoiceModal(null)} className="absolute top-4 right-4 text-stone-500 hover:text-white"><X className="w-5 h-5" /></button>
              <h2 className="text-2xl font-serif text-[#C6A96B] mb-2">Emitir Comprobante</h2>
              <p className="text-stone-400 text-sm mb-6 uppercase tracking-widest">Mesa {invoiceModal.table} - Total: S/ {invoiceModal.total.toFixed(2)}</p>
              
              <div className="space-y-4 mb-6">
                <button 
                  onClick={() => { setInvoiceType("boleta"); setTimeout(() => { alert("Boleta emitida correctamente"); setInvoiceModal(null); }, 300); }}
                  className="w-full p-4 border border-stone-800 hover:border-[#C6A96B] rounded-lg flex items-center gap-4 transition-colors"
                >
                  <FileText className="w-8 h-8 text-[#C6A96B]" />
                  <div className="text-left">
                    <p className="text-white font-medium">Boleta electronica</p>
                    <p className="text-xs text-stone-500">Comprobante para persona natural</p>
                  </div>
                </button>
                <button 
                  onClick={() => { setInvoiceType("factura"); setTimeout(() => { alert("Factura emitida correctamente"); setInvoiceModal(null); }, 300); }}
                  className="w-full p-4 border border-stone-800 hover:border-[#C6A96B] rounded-lg flex items-center gap-4 transition-colors"
                >
                  <Receipt className="w-8 h-8 text-[#C6A96B]" />
                  <div className="text-left">
                    <p className="text-white font-medium">Factura electronica</p>
                    <p className="text-xs text-stone-500">Comprobante con RUC</p>
                  </div>
                </button>
              </div>
              
              <button onClick={() => setInvoiceModal(null)} className="w-full border border-stone-800 text-stone-400 uppercase tracking-widest text-sm py-3 hover:text-white transition-colors">
                Cancelar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MOBILE BOTTOM BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#121214] border-t border-stone-800 p-4 flex justify-between items-center z-40">
        <div className="flex items-center gap-3">
          <ShoppingBag className="w-5 h-5 text-[#C6A96B]" />
          <div>
            <p className="text-xs text-stone-400">Mesa {selectedTable}</p>
            <p className="text-lg font-serif text-[#C6A96B]">S/ {total.toFixed(2)}</p>
          </div>
        </div>
        <button onClick={() => setShowModal(true)} disabled={order.length === 0} className="bg-[#C6A96B] hover:bg-white text-black font-medium uppercase tracking-widest text-sm px-6 py-3 transition-colors disabled:opacity-50 disabled:hover:bg-[#C6A96B] flex items-center gap-2">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}