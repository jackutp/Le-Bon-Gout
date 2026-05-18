// src/services/productoService.ts
export interface Producto {
    productoid?: number;
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: "PLATO" | "BEBIDA" | "POSTRE";
    imagenProducto?: string;
    imagenUrl?: string;
    stock: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090/api';

export const productoService = {

    async create(data: Omit<Producto, 'productoid'>): Promise<Producto> {
        const res = await fetch(`${API_URL}/productos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Error al crear producto');
        }
        return res.json();
    },

    // ✅ AGREGAR: Actualizar producto con datos JSON (sin imagen)
    async updateJson(id: number, data: Partial<Producto>): Promise<Producto> {
        const res = await fetch(`${API_URL}/productos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Error al actualizar producto');
        }
        return res.json();
    },
    // Obtener todos los productos
    async getAll(): Promise<Producto[]> {
        const url = `${API_URL}/productos`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const data = await res.json();
        return data.map((p: any) => ({ ...p, stock: p.stock ?? 0 }));
    },

    // Obtener producto por ID
    async getById(id: number): Promise<Producto> {
        const res = await fetch(`${API_URL}/productos/${id}`);
        if (!res.ok) throw new Error('Producto no encontrado');
        const data = await res.json();
        return { ...data, stock: data.stock ?? 0 };
    },

    // Crear producto CON imagen (siempre usa FormData)
    async createWithImage(formData: FormData): Promise<Producto> {
        const res = await fetch(`${API_URL}/productos`, {
            method: 'POST',
            body: formData,
        });
        if (!res.ok) throw new Error('Error al crear producto');
        return res.json();
    },

    // Actualizar producto (siempre usa FormData porque el backend espera multipart)
    async update(id: number, formData: FormData): Promise<Producto> {
        const res = await fetch(`${API_URL}/productos/${id}`, {
            method: 'PUT',
            body: formData,
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || 'Error al actualizar producto');
        }
        return res.json();
    },

    // Actualizar solo stock
    async updateStock(id: number, stock: number): Promise<Producto> {
        const res = await fetch(`${API_URL}/productos/${id}/stock`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stock }),
        });
        if (!res.ok) throw new Error('Error al actualizar stock');
        return res.json();
    },

    // Eliminar producto
    async delete(id: number): Promise<void> {
        const res = await fetch(`${API_URL}/productos/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Error al eliminar producto');
    },

    // Obtener URL de imagen
    getImageUrl(id: number): string {
        return `${API_URL}/productos/${id}/imagen`;
    },
};