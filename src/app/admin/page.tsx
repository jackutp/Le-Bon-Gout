"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, LayoutDashboard, Package, Users, BookOpen, 
  Calendar, Truck, AlertTriangle, Plus, Edit, Trash, CheckCircle, X
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Staff = { id: number; name: string; email: string; role: "Mesero" | "Cocinero"; ordersToday?: number; avgTime?: string };
type MenuItem = { id: number; name: string; price: number; desc: string; category: "Plato" | "Bebida" | "Postre"; img: string };
type Waste = { id: number; item: string; qty: string; reason: string; date: string };
type Reservation = { id: number; name: string; details: string; date: string };

const INITIAL_STAFF: Staff[] = [
  { id: 1, name: "Jean-Paul", email: "jean@lebongout.com", role: "Mesero", ordersToday: 24 },
  { id: 2, name: "Maria Garcia", email: "maria@lebongout.com", role: "Mesero", ordersToday: 18 },
  { id: 3, name: "Chef Isabelle", email: "isabelle@lebongout.com", role: "Cocinero", avgTime: "14m" },
  { id: 4, name: "Carlos Ruiz", email: "carlos@lebongout.com", role: "Cocinero", avgTime: "16m" },
];

const INITIAL_MENU: MenuItem[] = [
  { id: 1, name: "Filet Mignon", price: 45, desc: "Puré con trufa, espárragos", category: "Plato", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800" },
  { id: 2, name: "Ravioli de Langosta", price: 38, desc: "Crema de azafrán, caviar", category: "Plato", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800" },
  { id: 3, name: "Chablis Grand Cru", price: 120, desc: "Vino blanco, 2019", category: "Bebida", img: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800" },
  { id: 4, name: "Mousse de Chocolate", price: 18, desc: "Lámina de oro, frambuesa", category: "Postre", img: "https://images.unsplash.com/photo-1574966739987-65e38f2cea46?auto=format&fit=crop&q=80&w=800" },
];

const INITIAL_WASTE: Waste[] = [
  { id: 1, item: "Mousse de Chocolate", qty: "1 porción", reason: "Se cayó al emplatar", date: "Hoy, 19:15" },
];

const RESERVATIONS: Reservation[] = [
  { id: 1, name: "Familia Vigneau", details: "Mesa 4 • 20:00 hrs • 4 pax", date: "14/Oct" },
  { id: 2, name: "Empresa Moderna", details: "Mesa 8 • 19:30 hrs • 8 pax", date: "14/Oct" },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const adminName = "Admin Principal";

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardView />;
      case "inventario": return <InventoryView />;
      case "personal": return <StaffView />;
      case "carta": return <MenuView />;
      case "reservas": return <ReservationsView />;
      case "proveedores": return <SuppliersView />;
      case "mermas": return <WasteView />;
      default: return <DashboardView />;
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-stone-100 font-sans flex">
      {/* Mobile Menu Button */}
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#121214] border border-stone-800 rounded">
        <LayoutDashboard className="w-6 h-6 text-[#C6A96B]" />
      </button>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 bg-[#121214] border-r border-stone-800 flex-col h-screen fixed left-0 top-0">
        <div className="p-6 border-b border-stone-800">
          <h2 className="text-xl font-serif text-[#C6A96B] uppercase tracking-widest">Le Bon Gout</h2>
          <p className="text-xs text-stone-500 mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {[
            { id: "dashboard", icon: LayoutDashboard, label: "Metricas" },
            { id: "inventario", icon: Package, label: "Inventario" },
            { id: "personal", icon: Users, label: "Personal" },
            { id: "carta", icon: BookOpen, label: "Editor Carta" },
            { id: "reservas", icon: Calendar, label: "Reservas" },
            { id: "proveedores", icon: Truck, label: "Proveedores" },
            { id: "mermas", icon: AlertTriangle, label: "Mermas" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2 lg:py-3 rounded text-sm uppercase tracking-widest transition-colors ${
                activeTab === item.id ? "bg-[#C6A96B]/10 text-[#C6A96B] border border-[#C6A96B]/30" : "text-stone-400 hover:text-white hover:bg-stone-900"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-stone-800">
          <Link href="/login" className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm text-stone-400 hover:text-white uppercase tracking-widest transition-colors">
            <LogOut className="w-4 h-4" />
            Cerrar Sesion
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/80" onClick={() => setSidebarOpen(false)}>
          <aside className="w-64 bg-[#121214] border-r border-stone-800 flex flex-col h-full" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-stone-800 flex justify-between items-center">
              <h2 className="text-xl font-serif text-[#C6A96B] uppercase tracking-widest">Le Bon Gout</h2>
              <button onClick={() => setSidebarOpen(false)} className="text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {[
                { id: "dashboard", icon: LayoutDashboard, label: "Metricas" },
                { id: "inventario", icon: Package, label: "Inventario" },
                { id: "personal", icon: Users, label: "Personal" },
                { id: "carta", icon: BookOpen, label: "Editor Carta" },
                { id: "reservas", icon: Calendar, label: "Reservas" },
                { id: "proveedores", icon: Truck, label: "Proveedores" },
                { id: "mermas", icon: AlertTriangle, label: "Mermas" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm uppercase tracking-widest transition-colors ${
                    activeTab === item.id ? "bg-[#C6A96B]/10 text-[#C6A96B] border border-[#C6A96B]/30" : "text-stone-400 hover:text-white hover:bg-stone-900"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="p-4 border-t border-stone-800">
              <Link href="/login" className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm text-stone-400 hover:text-white uppercase tracking-widest transition-colors">
                <LogOut className="w-4 h-4" />
                Cerrar Sesion
              </Link>
            </div>
          </aside>
        </div>
      )}

      <main className="flex-1 lg:ml-64 h-screen overflow-y-auto bg-[#0B0B0C]">
        <header className="flex justify-between items-center p-4 lg:p-8">
          <h1 className="text-xl lg:text-2xl font-serif text-white uppercase tracking-widest ml-12 lg:ml-0">{activeTab.replace("-", " ")}</h1>
          <p className="text-sm text-stone-400 hidden sm:block">Bienvenido, {adminName}</p>
        </header>
        <div className="px-4 lg:px-8 pb-8">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// --- DASHBOARD ---
function DashboardView() {
  const days = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
  const salesData = [3200, 4100, 3800, 4500, 4200, 5200, 4520];
  const maxSale = Math.max(...salesData);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[#121214] p-6 border border-stone-800 rounded">
          <h3 className="text-sm uppercase tracking-widest text-stone-400 mb-2">Ventas del Dia</h3>
          <p className="text-3xl font-serif text-[#C6A96B]">$4,520</p>
        </div>
        <div className="bg-[#121214] p-6 border border-stone-800 rounded">
          <h3 className="text-sm uppercase tracking-widest text-stone-400 mb-2">Ordenes Completadas</h3>
          <p className="text-3xl font-serif text-white">48</p>
        </div>
        <div className="bg-[#121214] p-6 border border-stone-800 rounded">
          <h3 className="text-sm uppercase tracking-widest text-stone-400 mb-2">Ticket Promedio</h3>
          <p className="text-3xl font-serif text-white">$94.16</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#121214] border border-stone-800 rounded p-6">
          <h3 className="text-sm uppercase tracking-widest text-stone-400 mb-6">Ventas Semanales</h3>
          <div className="flex items-end justify-between h-48 gap-2">
            {days.map((day, i) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-[#C6A96B]/20 rounded-t relative" style={{ height: `${(salesData[i] / maxSale) * 100}%` }}>
                  <div className="absolute bottom-0 w-full bg-[#C6A96B] rounded-t transition-all hover:bg-[#C6A96B]/80" style={{ height: "100%" }} />
                </div>
                <span className="text-xs text-stone-500">{day}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-[#121214] border border-stone-800 rounded p-6">
          <h3 className="text-sm uppercase tracking-widest text-stone-400 mb-6">Productos Top</h3>
          <div className="space-y-4">
            {["Filet Mignon", "Ravioli de Langosta", "Chablis Grand Cru", "Mousse de Chocolate"].map((item, i) => (
              <div key={item} className="flex items-center gap-4">
                <span className="text-[#C6A96B] font-serif text-lg w-6">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item}</span>
                    <span className="text-stone-400">{85 - i * 15} uds</span>
                  </div>
                  <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#C6A96B] rounded-full" style={{ width: `${85 - i * 15}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- INVENTORY ---
const INVENTORY = [
  { id: 1, name: "Trufa Negra", stock: 2, unit: "kg" },
  { id: 2, name: "Caviar Beluga", stock: 5, unit: "latas" },
  { id: 3, name: "Filete de Res", stock: 24, unit: "kg" },
  { id: 4, name: "Azafran", stock: 8, unit: "g" },
  { id: 5, name: "Vino Chablis", stock: 15, unit: "botellas" },
];

function InventoryView() {
  return (
    <div className="bg-[#121214] border border-stone-800 rounded overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-black/40 border-b border-stone-800 text-xs uppercase tracking-widest text-stone-400">
          <tr>
            <th className="p-4">Producto</th>
            <th className="p-4">Unidad</th>
            <th className="p-4">Stock</th>
            <th className="p-4 text-right">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-800 text-sm">
          {INVENTORY.map((item) => (
            <tr key={item.id} className={item.stock < 10 ? "bg-red-900/10" : ""}>
              <td className="p-4">{item.name}</td>
              <td className="p-4 text-stone-400">{item.unit}</td>
              <td className="p-4 font-mono">{item.stock}</td>
              <td className="p-4 text-right">
                {item.stock < 10 ? (
                  <span className="inline-flex items-center gap-2 text-red-500 px-3 py-1 border border-red-500/30 rounded-full text-xs">
                    <AlertTriangle className="w-3 h-3" />
                    Stock Critico
                  </span>
                ) : (
                  <span className="text-stone-500">Normal</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- STAFF ---
function StaffView() {
  const [staff, setStaff] = useState<Staff[]>(INITIAL_STAFF);
  const [newStaff, setNewStaff] = useState({ name: "", email: "", role: "Mesero" as "Mesero" | "Cocinero" });

  const addStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.email) return;
    setStaff([...staff, { ...newStaff, id: Date.now() }]);
    setNewStaff({ name: "", email: "", role: "Mesero" });
  };

  const meseros = staff.filter(s => s.role === "Mesero");
  const cocineros = staff.filter(s => s.role === "Cocinero");

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-[#121214] border border-stone-800 rounded p-6">
        <h2 className="text-xl font-serif text-[#C6A96B] mb-6">Nuevo Personal</h2>
        <form onSubmit={addStaff} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Nombre</label>
            <input 
              type="text" 
              value={newStaff.name}
              onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
              className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 focus:border-[#C6A96B]" 
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Email</label>
            <input 
              type="email" 
              value={newStaff.email}
              onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
              className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 focus:border-[#C6A96B]" 
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Rol</label>
            <select 
              value={newStaff.role}
              onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value as "Mesero" | "Cocinero" })}
              className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 focus:border-[#C6A96B]"
            >
              <option>Mesero</option>
              <option>Cocinero</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-[#C6A96B] text-black uppercase tracking-widest text-sm py-3 mt-4 hover:bg-white transition-colors">
            Registrar
          </button>
        </form>
      </div>

      <div className="bg-[#121214] border border-stone-800 rounded p-6">
        <h2 className="text-xl font-serif text-[#C6A96B] mb-6">Meseros</h2>
        <div className="space-y-4">
          {meseros.map(s => (
            <div key={s.id} className="flex justify-between items-center p-3 border border-stone-800 rounded">
              <div>
                <p className="text-sm">{s.name}</p>
                <p className="text-xs text-stone-500">{s.ordersToday} pedidos hoy</p>
              </div>
              <span className="text-[#C6A96B] text-sm">Activo</span>
            </div>
          ))}
          {meseros.length === 0 && <p className="text-stone-500 text-sm">No hay meseros registrados</p>}
        </div>
      </div>

      <div className="bg-[#121214] border border-stone-800 rounded p-6">
        <h2 className="text-xl font-serif text-[#C6A96B] mb-6">Cocineros</h2>
        <div className="space-y-4">
          {cocineros.map(s => (
            <div key={s.id} className="flex justify-between items-center p-3 border border-stone-800 rounded">
              <div>
                <p className="text-sm">{s.name}</p>
                <p className="text-xs text-stone-500">Promedio: {s.avgTime}/plato</p>
              </div>
              <span className="text-[#C6A96B] text-sm">Optimo</span>
            </div>
          ))}
          {cocineros.length === 0 && <p className="text-stone-500 text-sm">No hay cocineros registrados</p>}
        </div>
      </div>
    </div>
  );
}

// --- MENU ---
function MenuView() {
  const [menu, setMenu] = useState<MenuItem[]>(INITIAL_MENU);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState({ name: "", price: "", desc: "", category: "Plato" as "Plato" | "Bebida" | "Postre", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800" });

  const openEdit = (item: MenuItem) => { setEditingItem(item); setNewItem({ name: item.name, price: item.price.toString(), desc: item.desc, category: item.category, img: item.img }); setShowModal(true); };
  const openAdd = () => { setEditingItem(null); setNewItem({ name: "", price: "", desc: "", category: "Plato", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800" }); setShowModal(true); };
  
  const saveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;
    if (editingItem) {
      setMenu(menu.map(m => m.id === editingItem.id ? { ...m, name: newItem.name, price: parseInt(newItem.price), desc: newItem.desc, category: newItem.category, img: newItem.img } : m));
    } else {
      setMenu([...menu, { id: Date.now(), name: newItem.name, price: parseInt(newItem.price), desc: newItem.desc, category: newItem.category, img: newItem.img }]);
    }
    setShowModal(false);
  };

  const deleteItem = (id: number) => {
    if (confirm("Estas seguro de eliminar este plato?")) {
      setMenu(menu.filter(m => m.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-stone-400 text-sm">Gestiona los platillos visibles en el catalogo de meseros.</p>
        <button onClick={openAdd} className="flex items-center gap-2 bg-[#C6A96B] text-black px-4 py-2 rounded text-sm uppercase tracking-widest hover:bg-white transition-colors">
          <Plus className="w-4 h-4" />
          Nuevo Platillo
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {menu.map(item => (
          <div key={item.id} className="bg-[#121214] border border-stone-800 rounded flex overflow-hidden">
            <div className="w-32 relative">
              <Image src={item.img} alt={item.name} fill className="object-cover" />
            </div>
            <div className="p-4 flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-serif text-lg">{item.name}</h3>
                <span className="text-[#C6A96B]">${item.price}</span>
              </div>
              <p className="text-xs text-stone-400 mb-2">{item.desc}</p>
              <span className="text-xs text-amber-500 bg-amber-500/10 px-2 py-1 rounded">{item.category}</span>
              <div className="flex justify-end gap-2 mt-2">
                <button onClick={() => openEdit(item)} className="p-2 border border-stone-700 hover:border-[#C6A96B] hover:text-[#C6A96B] rounded transition-colors text-stone-400">
                  <Edit className="w-4 h-4" />
                </button>
                <button onClick={() => deleteItem(item.id)} className="p-2 border border-stone-700 hover:border-red-500 hover:text-red-500 rounded transition-colors text-stone-400">
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-[#121214] border border-stone-800 shadow-2xl p-8 max-w-md w-full">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-stone-500 hover:text-white"><X className="w-5 h-5" /></button>
              <h2 className="text-2xl font-serif text-[#C6A96B] mb-6">{editingItem ? "Editar Platillo" : "Nuevo Platillo"}</h2>
              <form onSubmit={saveItem} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Nombre</label>
                  <input type="text" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Precio</label>
                  <input type="number" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Descripcion</label>
                  <input type="text" value={newItem.desc} onChange={(e) => setNewItem({ ...newItem, desc: e.target.value })} className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Categoria</label>
                  <select value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value as "Plato" | "Bebida" | "Postre" })} className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2">
                    <option>Plato</option>
                    <option>Bebida</option>
                    <option>Postre</option>
                  </select>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-stone-800 text-stone-400 py-3 hover:text-white">Cancelar</button>
                  <button type="submit" className="flex-1 bg-[#C6A96B] text-black py-3 hover:bg-white">Guardar</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- RESERVATIONS ---
function ReservationsView() {
  const [reservations, setReservations] = useState<Reservation[]>(RESERVATIONS);
  const [selectedDate, setSelectedDate] = useState("14/Oct");

  const dates = ["14/Oct", "15/Oct", "16/Oct", "17/Oct", "18/Oct", "19/Oct", "20/Oct"];
  const assignTable = (id: number) => {
    alert("Mesa asignada correctamente!");
    setReservations(reservations.filter(r => r.id !== id));
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-[#121214] border border-stone-800 rounded p-6">
        <h3 className="text-sm uppercase tracking-widest text-stone-400 mb-4">Calendario</h3>
        <div className="grid grid-cols-2 gap-2">
          {dates.map(d => (
            <button key={d} onClick={() => setSelectedDate(d)} className={`py-3 rounded text-sm ${selectedDate === d ? "bg-[#C6A96B] text-black" : "border border-stone-800 hover:border-[#C6A96B]"}`}>
              {d}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-[#121214] border border-stone-800 rounded p-6">
        <h2 className="text-xl font-serif text-[#C6A96B] mb-6">Reservas del {selectedDate}</h2>
        <ul className="space-y-4">
          {reservations.filter(r => r.date === selectedDate).length === 0 ? (
            <p className="text-stone-500 text-sm">No hay reservas para esta fecha</p>
          ) : (
            reservations.filter(r => r.date === selectedDate).map(r => (
              <li key={r.id} className="flex justify-between items-center pb-4 border-b border-stone-800">
                <div>
                  <p className="text-sm">{r.name}</p>
                  <p className="text-xs text-stone-500">{r.details}</p>
                </div>
                <button onClick={() => assignTable(r.id)} className="text-xs border border-[#C6A96B] text-[#C6A96B] px-3 py-1 hover:bg-[#C6A96B] hover:text-black">
                  Asignar Mesa
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

// --- SUPPLIERS ---
function SuppliersView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-[#121214] border border-stone-800 rounded p-6">
          <h2 className="text-xl font-serif text-white mb-6">Directorio de Proveedores</h2>
          <div className="space-y-4">
            <div className="p-4 border border-stone-800 rounded flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Maison de la Truffe</p>
                <p className="text-xs text-stone-500">Insumos Premium - Calidad: 9.8/10</p>
              </div>
              <button className="text-xs uppercase tracking-widest text-[#C6A96B] hover:text-white transition-colors">Ver POs</button>
            </div>
          </div>
        </div>
        <div className="bg-[#121214] border border-stone-800 rounded p-6 flex flex-col">
          <h2 className="text-xl font-serif text-[#C6A96B] mb-6">Carga de Facturas</h2>
          <div className="flex-1 border-2 border-dashed border-stone-700 rounded-lg flex flex-col items-center justify-center text-stone-500 hover:border-[#C6A96B] hover:text-[#C6A96B] transition-colors cursor-pointer">
            <Plus className="w-8 h-8 mb-2" />
            <p className="text-xs uppercase tracking-widest">Arrastra archivo XML/PDF</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- WASTE ---
function WasteView() {
  const [waste, setWaste] = useState<Waste[]>(INITIAL_WASTE);
  const [showModal, setShowModal] = useState(false);
  const [newWaste, setNewWaste] = useState({ item: "", qty: "", reason: "" });

  const addWaste = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWaste.item || !newWaste.qty) return;
    setWaste([...waste, { id: Date.now(), item: newWaste.item, qty: newWaste.qty, reason: newWaste.reason, date: "Hoy, " + new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }) }]);
    setNewWaste({ item: "", qty: "", reason: "" });
    setShowModal(false);
  };

  const items = ["Filet Mignon", "Ravioli de Langosta", "Mousse de Chocolate", "Chablis Grand Cru", "Trufa Negra", "Caviar Beluga"];

  return (
    <div className="bg-[#121214] border border-stone-800 rounded p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-serif text-white">Registro de Mermas</h2>
        <button onClick={() => setShowModal(true)} className="bg-red-900/30 text-red-500 border border-red-500/50 px-4 py-2 rounded text-sm uppercase tracking-widest hover:bg-red-900/50 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Registrar Merma
        </button>
      </div>
      <table className="w-full text-left">
        <thead className="bg-black/40 border-b border-stone-800 text-xs uppercase tracking-widest text-stone-400">
          <tr>
            <th className="p-4">Plato/Insumo</th>
            <th className="p-4">Cantidad</th>
            <th className="p-4">Motivo de Cancelacion</th>
            <th className="p-4">Fecha</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-800 text-sm">
          {waste.map(w => (
            <tr key={w.id}>
              <td className="p-4">{w.item}</td>
              <td className="p-4">{w.qty}</td>
              <td className="p-4 italic text-stone-400">{w.reason}</td>
              <td className="p-4 text-stone-500">{w.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-[#121214] border border-stone-800 shadow-2xl p-8 max-w-md w-full">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-stone-500 hover:text-white"><X className="w-5 h-5" /></button>
              <h2 className="text-2xl font-serif text-red-500 mb-6">Registrar Merma</h2>
              <form onSubmit={addWaste} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Plato/Insumo</label>
                  <select value={newWaste.item} onChange={(e) => setNewWaste({ ...newWaste, item: e.target.value })} className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2">
                    <option value="">Seleccionar...</option>
                    {items.map(i => <option key={i}>{i}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Cantidad</label>
                  <input type="text" value={newWaste.qty} onChange={(e) => setNewWaste({ ...newWaste, qty: e.target.value })} placeholder="1 porcion, 500g..." className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Motivo</label>
                  <input type="text" value={newWaste.reason} onChange={(e) => setNewWaste({ ...newWaste, reason: e.target.value })} placeholder="Se cayo, mal estado..." className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2" />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 border border-stone-800 text-stone-400 py-3 hover:text-white">Cancelar</button>
                  <button type="submit" className="flex-1 bg-red-500 text-white py-3 hover:bg-red-600">Registrar</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}