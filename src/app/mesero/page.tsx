"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { LogOut, Plus, Minus, Send, X, ShoppingBag, Clock, LayoutGrid, FileText, Receipt, Package } from "lucide-react";
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
      <div className="grid grid-cols-12 w-full min-h-screen">
        
        {/* COLUMNA 1: SIDEBAR IZQUIERDO */}
        <div className="col-span-2 bg-[#121214] border-r border-stone-800 flex flex-col h-screen sticky top-0 overflow-y-auto">
          <div className="p-4 border-b border-stone-800">
            <h2 className="text-lg font-serif text-[#C6A96B] uppercase tracking-widest">Le Bon Gout</h2>
            <p className="text-xs text-stone-500 mt-1">Panel Mesero</p>
          </div>
          
          <nav className="flex-1 p-3 space-y-2">
            <button
              onClick={() => { setCurrentView("productos"); }}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded text-sm uppercase tracking-widest transition-colors ${currentView === "productos" ? "bg-[#C6A96B]/10 text-[#C6A96B] border border-[#C6A96B]/30" : "text-stone-400 hover:text-white hover:bg-stone-900 border border-transparent"}`}
            >
              <Package className="w-4 h-4" />
              <span className="text-xs">Productos</span>
            </button>
            
            <button
              onClick={() => { setCurrentView("estados"); }}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded text-sm uppercase tracking-widest transition-colors ${currentView === "estados" ? "bg-[#C6A96B]/10 text-[#C6A96B] border border-[#C6A96B]/30" : "text-stone-400 hover:text-white hover:bg-stone-900 border border-transparent"}`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="text-xs">Estados de Mesa</span>
            </button>
          </nav>

          <div className="p-3 border-t border-stone-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-stone-400 uppercase tracking-widest">mesa:</span>
              <select 
                value={selectedTable} 
                onChange={(e) => setSelectedTable(e.target.value)} 
                className="bg-[#0B0B0C] border border-stone-800 text-white px-2 py-1 text-sm w-20"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <Link href="/login" className="flex items-center justify-center gap-2 w-full px-3 py-2 text-xs text-stone-400 hover:text-white uppercase tracking-widest transition-colors">
              <LogOut className="w-3 h-3" />
              Cerrar Sesion
            </Link>
          </div>
        </div>

        {/* COLUMNA 2: CONTENIDO CENTRAL */}
        <div className="col-span-8 flex flex-col h-screen overflow-hidden">
          <header className="flex justify-between items-center p-4 border-b border-stone-800 bg-[#121214]/80 backdrop-blur">
            <div>
              <h1 className="text-lg font-serif text-[#C6A96B]">
                {currentView === "productos" ? "Catalogo de Productos" : "Estados de Mesa"}
              </h1>
              <p className="text-xs text-stone-400">Bienvenido, {waiterName}</p>
            </div>
            <button onClick={() => setShowSentModal(true)} className="bg-[#C6A96B]/10 text-[#C6A96B] px-3 py-1.5 rounded text-xs uppercase tracking-widest hover:bg-[#C6A96B]/20 border border-[#C6A96B]/30">
              Enviados
            </button>
          </header>

          <main className="flex-1 overflow-y-auto p-4">
            {currentView === "productos" ? (
              <>
                <div className="flex gap-2 mb-4">
                  {["all", "Plato", "Bebida", "Postre"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded text-xs uppercase tracking-widest transition-colors ${categoryFilter === cat ? "bg-[#C6A96B] text-black" : "border border-stone-800 text-stone-400 hover:text-white hover:border-[#C6A96B]"}`}
                    >
                      {cat === "all" ? "Todos" : cat === "Plato" ? "Platillos" : cat === "Bebida" ? "Bebidas" : cat}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredItems.map((product) => (
                    <motion.div key={product.id} whileHover={{ scale: 1.01 }} className={`bg-[#121214] border ${product.inStock === 0 ? 'border-red-900/50 opacity-70' : 'border-stone-800'} rounded overflow-hidden flex flex-col`}>
                      <div className="relative h-32 w-full">
                        <Image src={product.img} alt={product.name} fill className="object-cover" />
                        <div className="absolute top-2 right-2">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${product.inStock > 0 ? 'bg-black/80 text-[#C6A96B] border border-[#C6A96B]' : 'bg-red-900/80 text-white border border-red-500'}`}>
                            {product.inStock > 0 ? `${product.inStock}` : 'Agot'}
                          </span>
                        </div>
                      </div>
                      <div className="p-3 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="font-serif text-base mb-0.5">{product.name}</h3>
                          <p className="text-xs text-stone-400 mb-2">{product.desc}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-base font-medium text-[#C6A96B]">S/ {product.price.toFixed(2)}</span>
                          <button onClick={() => addToOrder(product.id)} disabled={product.inStock === 0} className="bg-stone-800 hover:bg-[#C6A96B] hover:text-black disabled:opacity-50 disabled:hover:bg-stone-800 disabled:hover:text-white text-white p-1.5 rounded transition-colors">
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                  {MOCK_TABLES.map((table) => (
                    <motion.div key={table.id} whileHover={{ scale: 1.01 }} className={`bg-[#121214] border ${table.occupied ? 'border-stone-800' : 'border-stone-800/50'} rounded overflow-hidden flex flex-col`}>
                      <div className="relative h-24 w-full">
                        <Image src={table.img} alt={`Mesa ${table.number}`} fill className="object-cover opacity-60" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-2 left-2">
                          <h3 className="font-serif text-lg text-white">Mesa {table.number}</h3>
                        </div>
                      </div>
                      <div className="p-3">
                        {table.occupied ? (
                          <>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-xs text-stone-400">Total:</span>
                              <span className="font-serif text-base text-[#C6A96B]">S/ {table.total.toFixed(2)}</span>
                            </div>
                            <button 
                              onClick={() => setInvoiceModal({ table: table.number, total: table.total })}
                              className="w-full bg-[#C6A96B]/10 text-[#C6A96B] border border-[#C6A96B]/30 px-2 py-1.5 rounded text-xs uppercase tracking-widest hover:bg-[#C6A96B]/20 transition-colors flex items-center justify-center gap-1.5"
                            >
                              <Receipt className="w-3 h-3" />
                              Comprobante
                            </button>
                          </>
                        ) : (
                          <div className="text-center text-stone-500 text-xs py-2">Disponible</div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </main>
        </div>

        {/* COLUMNA 3: SIDEBAR DERECHO - TOTAL */}
        <div className="col-span-2 bg-[#121214] border-l border-stone-800 flex flex-col h-screen sticky top-0 overflow-y-auto">
          <div className="p-4 border-b border-stone-800 bg-black/20">
            <h2 className="text-lg font-serif text-[#C6A96B] flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Mesa {selectedTable}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {orderItems.length === 0 ? (
              <div className="h-full flex items-center justify-center text-stone-500 text-xs italic text-center">
                No hay productos seleccionados.
              </div>
            ) : (
              <AnimatePresence>
                {orderItems.map((item) => (
                  <motion.div key={item.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex justify-between items-center border-b border-stone-800 pb-2">
                    <div className="flex-1">
                      <h4 className="text-xs font-medium">{item.name}</h4>
                      <p className="text-xs text-[#C6A96B]">S/ {item.price.toFixed(2)} x {item.qty}</p>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <button onClick={() => removeFromOrder(item.id)} className="p-1 bg-stone-800 hover:bg-stone-700 rounded text-stone-300">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-4 text-center text-xs">{item.qty}</span>
                      <button onClick={() => addToOrder(item.id)} disabled={item.qty >= item.inStock} className="p-1 bg-stone-800 hover:bg-stone-700 disabled:opacity-50 rounded text-stone-300">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          <div className="p-4 border-t border-stone-800 bg-black/20">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-stone-400 uppercase tracking-widest">Total</span>
              <span className="text-xl font-serif text-[#C6A96B]">S/ {total.toFixed(2)}</span>
            </div>
            <button onClick={() => setShowModal(true)} disabled={order.length === 0} className="w-full bg-[#C6A96B] hover:bg-white text-black font-medium uppercase tracking-widest text-xs py-3 transition-colors disabled:opacity-50 disabled:hover:bg-[#C6A96B] flex justify-center items-center gap-1.5">
              <Send className="w-3 h-3" />
              Enviar a Cocina
            </button>
          </div>
        </div>
      </div>

      {/* MODAL CONFIRMACION */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="relative bg-[#121214] border border-stone-800 shadow-2xl p-6 max-w-md w-full">
              <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-stone-500 hover:text-white"><X className="w-4 h-4" /></button>
              <h2 className="text-xl font-serif text-[#C6A96B] mb-1">Resumen de Orden</h2>
              <p className="text-stone-400 text-xs mb-4 uppercase tracking-widest">Mesa {selectedTable}</p>
              <div className="space-y-2 mb-4 max-h-40 overflow-y-auto pr-2">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-xs">
                    <span><span className="text-[#C6A96B] mr-1">{item.qty}x</span> {item.name}</span>
                    <span className="text-stone-400">S/ {(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-stone-800 pt-3 flex justify-between items-center mb-6">
                <span className="font-serif text-sm">Total Final</span>
                <span className="font-serif text-lg text-[#C6A96B]">S/ {total.toFixed(2)}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowModal(false)} className="flex-1 border border-stone-800 text-stone-400 uppercase tracking-widest text-xs py-2 hover:text-white transition-colors">
                  Cancelar
                </button>
                <button onClick={handleConfirm} className="flex-1 bg-[#C6A96B] text-black uppercase tracking-widest text-xs py-2 hover:bg-white transition-colors">
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
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-[#121214] border border-stone-800 shadow-2xl p-6 max-w-lg w-full max-h-[70vh] overflow-y-auto">
              <button onClick={() => setShowSentModal(false)} className="absolute top-3 right-3 text-stone-500 hover:text-white"><X className="w-4 h-4" /></button>
              <h2 className="text-xl font-serif text-[#C6A96B] mb-4">Pedidos Enviados</h2>
              {sentOrders.length === 0 ? (
                <p className="text-stone-500 text-center py-6">No hay pedidos enviados.</p>
              ) : (
                <div className="space-y-3">
                  {sentOrders.map(order => (
                    <div key={order.id} className="border border-stone-800 rounded p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="font-serif text-base text-[#C6A96B]">Mesa {order.table}</span>
                          <p className="text-xs text-stone-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {order.time}</p>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded ${order.status === 'served' ? 'bg-green-900/30 text-green-500' : 'bg-amber-500/20 text-amber-500'}`}>
                          {order.status === 'served' ? 'Completado' : 'En cocina'}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {order.items.map(item => (
                          <div key={item.id} className="flex justify-between items-center text-xs">
                            <span>{item.qty}x {item.name}</span>
                            <div className="flex items-center gap-1">
                              <button onClick={() => updateItemQty(order.id, item.productId, -1)} className="p-1 bg-stone-800 rounded"><Minus className="w-2 h-2" /></button>
                              <span>{item.qty}</span>
                              <button onClick={() => updateItemQty(order.id, item.productId, 1)} className="p-1 bg-stone-800 rounded"><Plus className="w-2 h-2" /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 pt-3 border-t border-stone-800">
                <button onClick={() => setShowSentModal(false)} className="w-full bg-[#C6A96B] text-black font-medium uppercase tracking-widest text-xs py-2 hover:bg-white transition-colors">
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
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-[#121214] border border-stone-800 shadow-2xl p-6 max-w-sm w-full">
              <button onClick={() => setInvoiceModal(null)} className="absolute top-3 right-3 text-stone-500 hover:text-white"><X className="w-4 h-4" /></button>
              <h2 className="text-xl font-serif text-[#C6A96B] mb-1">Emitir Comprobante</h2>
              <p className="text-stone-400 text-xs mb-4 uppercase tracking-widest">Mesa {invoiceModal.table} - Total: S/ {invoiceModal.total.toFixed(2)}</p>
              
              <div className="space-y-2 mb-4">
                <button 
                  onClick={() => { setTimeout(() => { alert("Boleta emitida correctamente"); setInvoiceModal(null); }, 300); }}
                  className="w-full p-3 border border-stone-800 hover:border-[#C6A96B] rounded flex items-center gap-3 transition-colors"
                >
                  <FileText className="w-6 h-6 text-[#C6A96B]" />
                  <div className="text-left">
                    <p className="text-white text-sm font-medium">Boleta electronica</p>
                    <p className="text-xs text-stone-500">Comprobante persona natural</p>
                  </div>
                </button>
                <button 
                  onClick={() => { setTimeout(() => { alert("Factura emitida correctamente"); setInvoiceModal(null); }, 300); }}
                  className="w-full p-3 border border-stone-800 hover:border-[#C6A96B] rounded flex items-center gap-3 transition-colors"
                >
                  <Receipt className="w-6 h-6 text-[#C6A96B]" />
                  <div className="text-left">
                    <p className="text-white text-sm font-medium">Factura electronica</p>
                    <p className="text-xs text-stone-500">Comprobante con RUC</p>
                  </div>
                </button>
              </div>
              
              <button onClick={() => setInvoiceModal(null)} className="w-full border border-stone-800 text-stone-400 uppercase tracking-widest text-xs py-2 hover:text-white transition-colors">
                Cancelar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}