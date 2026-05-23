// Cambiar el import al inicio del archivo
import { apiFetch } from './apiClient';

// Cambiar la constante API_URL por solo la ruta relativa
// ❌ Eliminar esta línea:
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090/api';

export const proveedorService = {
  async getAllProveedores(): Promise<Proveedor[]> {
    // ❌ ANTES:
    // const res = await fetch(`${API_URL}/proveedores`);
    
    // ✅ AHORA:
    const res = await apiFetch('/proveedores');
    if (!res.ok) throw new Error('Error al cargar proveedores');
    return res.json();
  },

  async createProveedor(proveedor: Omit<Proveedor, 'proveedorid'>): Promise<Proveedor> {
    const res = await apiFetch('/proveedores', {
      method: 'POST',
      body: JSON.stringify(proveedor),
    });
    if (!res.ok) throw new Error('Error al crear proveedor');
    return res.json();
  },
  
  // El mismo patrón para TODOS los métodos del service
  // Reemplaza fetch(`${API_URL}/...`) por apiFetch('/...')
};

Aplica el mismo cambio a insumoService.ts, mesaService.ts, pedidoService.ts, mermaService.ts, pagoService.ts, metricasService.ts, cocinaService.ts, reservaService.ts, userService.ts.

Para proveedorService.ts específicamente, el método subirFactura usa FormData — el apiFetch ya lo maneja (no agrega Content-Type cuando detecta FormData):

async subirFactura(ordenId: number, file: File): Promise<OrdenCompra> {
  const formData = new FormData();
  formData.append('factura', file);
  // apiFetch detecta FormData y no agrega Content-Type
  const res = await apiFetch(`/proveedores/ordenes/${ordenId}/factura`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Error al subir factura');
  return res.json();
},

Bug 3 — El middleware no lee el rol correctamente
Tu middleware.ts busca payload.tipo o payload.role pero el JWT que genera el backend guarda el rol dentro del array authorities (así lo pone JwtService.java del microservicio users: claims.put("authorities", user.getAuthorities().stream()...)).
Archivo: src/middleware.ts
// ❌ INCORRECTO (no encuentra el rol)
const userRole = payload.tipo || payload.role;

// ✅ CORRECTO — el JWT tiene authorities: ["ADMINISTRADOR"]
const authorities: string[] = payload.authorities || [];
const userRole = authorities[0]; // "ADMINISTRADOR", "MESERO", etc.

// La verificación queda igual:
if (!requiredRoles.includes(userRole)) {
  const url = new URL('/unauthorized', request.url);
  return NextResponse.redirect(url);
}