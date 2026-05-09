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

// src/services/insumoService.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090/api';
console.log('🌐 [productoService] API_URL:', API_URL);

export const productoService = {
    // Obtener todos los productos
    async getAll(): Promise<Producto[]> {
        const url = `${API_URL}/productos`;
        console.log('📡 [getAll] Fetching:', url);

        try {
            const res = await fetch(url);
            console.log('📡 [getAll] Response status:', res.status);

            if (!res.ok) {
                console.error('❌ [getAll] Response not ok:', res.status, res.statusText);
                throw new Error(`Error ${res.status}: ${res.statusText}`);
            }

            const data = await res.json();
            console.log('✅ [getAll] Data received:', data.length, 'productos');
            return data.map((p: any) => ({ ...p, stock: p.stock ?? 0 }));
        } catch (error: any) {
            console.error('❌ [getAll] Fetch error:', error);
            throw new Error(`No se pudo conectar a ${url}: ${error.message}`);
        }
    },

    // Obtener producto por ID
    async getById(id: number): Promise<Producto> {
        const url = `${API_URL}/productos/${id}`;
        console.log('📡 [getById] Fetching:', url);

        const res = await fetch(url);
        if (!res.ok) throw new Error('Producto no encontrado');
        const data = await res.json();
        return { ...data, stock: data.stock ?? 0 };
    },

    // Crear producto (sin imagen)
    async create(producto: Omit<Producto, 'productoid'>): Promise<Producto> {
        const url = `${API_URL}/productos`;
        console.log('📡 [create] POST to:', url, producto);

        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...producto, stock: producto.stock ?? 0 }),
        });
        if (!res.ok) throw new Error('Error al crear producto');
        return res.json();
    },

    // Crear producto CON imagen
    async createWithImage(formData: FormData): Promise<Producto> {
        const url = `${API_URL}/productos`;
        console.log('📡 [createWithImage] POST to:', url);

        const res = await fetch(url, {
            method: 'POST',
            body: formData,
        });
        if (!res.ok) throw new Error('Error al crear producto con imagen');
        return res.json();
    },

    // Actualizar producto (sin imagen)
    async update(id: number, producto: Partial<Producto>): Promise<Producto> {
        const url = `${API_URL}/productos/${id}`;
        console.log('📡 [update] PUT to:', url, producto);

        const res = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto),
        });
        if (!res.ok) throw new Error('Error al actualizar producto');
        return res.json();
    },

    // Actualizar producto CON imagen
    async updateWithImage(id: number, formData: FormData): Promise<Producto> {
        const url = `${API_URL}/productos/${id}`;
        console.log('📡 [updateWithImage] PUT to:', url);

        const res = await fetch(url, {
            method: 'PUT',
            body: formData,
        });
        if (!res.ok) throw new Error('Error al actualizar producto con imagen');
        return res.json();
    },

    // Actualizar solo stock usando PATCH
    async updateStock(id: number, stock: number): Promise<Producto> {
        const url = `${API_URL}/productos/${id}/stock`;
        console.log('📡 [updateStock] PATCH to:', url, { stock });

        const res = await fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stock }),
        });
        if (!res.ok) throw new Error('Error al actualizar stock');
        return res.json();
    },

    // Eliminar producto
    async delete(id: number): Promise<void> {
        const url = `${API_URL}/productos/${id}`;
        console.log('📡 [delete] DELETE to:', url);

        const res = await fetch(url, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Error al eliminar producto');
    },

    // Obtener URL de imagen
    getImageUrl(id: number): string {
        return `${API_URL}/productos/${id}/imagen`;
    },
};