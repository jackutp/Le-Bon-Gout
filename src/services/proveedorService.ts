// src/services/proveedorService.ts

export interface Proveedor {
    proveedorid?: number;
    nombre: string;
    descripcion?: string;
    ruc?: string;
    razonSocial?: string;
    direccionFiscal?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface OrdenCompra {
    ordenId: number;
    proveedorId: number;
    proveedorNombre: string;
    fecha: string;
    estado: "PENDIENTE" | "RECIBIDO" | "DEVUELTO" | "CANCELADO";
    facturaNombre?: string;
    facturaTipo?: string;
    tieneFactura: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface InsumoProveedor {
    insumoid: number;
    nombre: string;
    unidadMedida: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090/api';

export const proveedorService = {
    // ============ PROVEEDORES CRUD ============

    async getAllProveedores(): Promise<Proveedor[]> {
        const res = await fetch(`${API_URL}/proveedores`);
        if (!res.ok) throw new Error('Error al cargar proveedores');
        return res.json();
    },

    async getProveedorById(id: number): Promise<Proveedor> {
        const res = await fetch(`${API_URL}/proveedores/${id}`);
        if (!res.ok) throw new Error('Proveedor no encontrado');
        return res.json();
    },

    async createProveedor(proveedor: Omit<Proveedor, 'proveedorid'>): Promise<Proveedor> {
        const res = await fetch(`${API_URL}/proveedores`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(proveedor),
        });
        if (!res.ok) throw new Error('Error al crear proveedor');
        return res.json();
    },

    async updateProveedor(id: number, proveedor: Partial<Proveedor>): Promise<Proveedor> {
        const res = await fetch(`${API_URL}/proveedores/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(proveedor),
        });
        if (!res.ok) throw new Error('Error al actualizar proveedor');
        return res.json();
    },

    async deleteProveedor(id: number): Promise<void> {
        const res = await fetch(`${API_URL}/proveedores/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Error al eliminar proveedor');
    },

    // ============ ÓRDENES DE COMPRA ============

    async getAllOrdenes(): Promise<OrdenCompra[]> {
        const res = await fetch(`${API_URL}/proveedores/ordenes`);
        if (!res.ok) throw new Error('Error al cargar órdenes');
        return res.json();
    },

    async getOrdenesByProveedor(proveedorId: number): Promise<OrdenCompra[]> {
        const res = await fetch(`${API_URL}/proveedores/${proveedorId}/ordenes`);
        if (!res.ok) throw new Error('Error al cargar órdenes del proveedor');
        return res.json();
    },

    async getOrdenById(ordenId: number): Promise<OrdenCompra> {
        const res = await fetch(`${API_URL}/proveedores/ordenes/${ordenId}`);
        if (!res.ok) throw new Error('Orden no encontrada');
        return res.json();
    },

    // src/services/proveedorService.ts

    async createOrden(proveedorId: number): Promise<OrdenCompra> {
        console.log('📡 [createOrden] Enviando:', { proveedorId });  // 👈 LOG

        const res = await fetch(`${API_URL}/proveedores/ordenes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ proveedorId }),  // 👈 Asegurar formato correcto
        });

        console.log('📡 [createOrden] Response status:', res.status);  // 👈 LOG

        if (!res.ok) {
            const errorText = await res.text();
            console.error('❌ [createOrden] Error response:', errorText);
            throw new Error(`Error al crear orden: ${res.status}`);
        }
        return res.json();
    },

    async updateEstadoOrden(ordenId: number, estado: string): Promise<OrdenCompra> {
        const res = await fetch(`${API_URL}/proveedores/ordenes/${ordenId}/estado`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ estado }),
        });
        if (!res.ok) throw new Error('Error al actualizar estado');
        return res.json();
    },

    async subirFactura(ordenId: number, file: File): Promise<OrdenCompra> {
        const formData = new FormData();
        formData.append('factura', file);

        const res = await fetch(`${API_URL}/proveedores/ordenes/${ordenId}/factura`, {
            method: 'POST',
            body: formData,
        });
        if (!res.ok) throw new Error('Error al subir factura');
        return res.json();
    },

    async descargarFactura(ordenId: number): Promise<Blob> {
        const res = await fetch(`${API_URL}/proveedores/ordenes/${ordenId}/factura`);
        if (!res.ok) throw new Error('Error al descargar factura');
        return res.blob();
    },

    async eliminarFactura(ordenId: number): Promise<void> {
        const res = await fetch(`${API_URL}/proveedores/ordenes/${ordenId}/factura`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Error al eliminar factura');
    },

    async deleteOrden(ordenId: number): Promise<void> {
        const res = await fetch(`${API_URL}/proveedores/ordenes/${ordenId}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Error al eliminar orden');
    },
};