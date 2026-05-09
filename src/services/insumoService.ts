// src/services/insumoService.ts

export interface Insumo {
    insumoid?: number;
    nombre: string;
    unidadMedida: "KG" | "LATAS" | "G" | "L" | "ML";
    stock: number;
    estadoInsumo: "DISPONIBLE" | "BAJO" | "VACIO";
}


// src/services/insumoService.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090/api';

export const insumoService = {
    // Obtener todos los insumos
    async getAll(): Promise<Insumo[]> {
        const res = await fetch(`${API_URL}/insumos`);
        if (!res.ok) throw new Error('Error al cargar insumos');
        const data = await res.json();
        return data.map((i: any) => ({ ...i, stock: i.stock ?? 0 }));
    },

    // Obtener insumo por ID
    async getById(id: number): Promise<Insumo> {
        const res = await fetch(`${API_URL}/insumos/${id}`);
        if (!res.ok) throw new Error('Insumo no encontrado');
        const data = await res.json();
        return { ...data, stock: data.stock ?? 0 };
    },

    // Obtener insumos por estado
    async getByEstado(estado: string): Promise<Insumo[]> {
        const res = await fetch(`${API_URL}/insumos/estado/${estado}`);
        if (!res.ok) throw new Error('Error al filtrar insumos');
        return res.json();
    },

    // Obtener insumos con stock bajo (menor a 10)
    async getLowStock(): Promise<Insumo[]> {
        const res = await fetch(`${API_URL}/insumos/low-stock`);
        if (!res.ok) throw new Error('Error al obtener insumos con stock bajo');
        return res.json();
    },

    // Obtener insumos agotados (stock = 0)
    async getOutOfStock(): Promise<Insumo[]> {
        const res = await fetch(`${API_URL}/insumos/out-of-stock`);
        if (!res.ok) throw new Error('Error al obtener insumos agotados');
        return res.json();
    },

    // Crear nuevo insumo
    async create(insumo: Omit<Insumo, 'insumoid'>): Promise<Insumo> {
        const res = await fetch(`${API_URL}/insumos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(insumo),
        });
        if (!res.ok) throw new Error('Error al crear insumo');
        return res.json();
    },

    // Actualizar insumo
    async update(id: number, insumo: Partial<Insumo>): Promise<Insumo> {
        const res = await fetch(`${API_URL}/insumos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(insumo),
        });
        if (!res.ok) throw new Error('Error al actualizar insumo');
        return res.json();
    },

    // Actualizar solo stock
    async updateStock(id: number, stock: number): Promise<Insumo> {
        const res = await fetch(`${API_URL}/insumos/${id}/stock`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stock }),
        });
        if (!res.ok) throw new Error('Error al actualizar stock');
        return res.json();
    },

    // Eliminar insumo
    async delete(id: number): Promise<void> {
        const res = await fetch(`${API_URL}/insumos/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Error al eliminar insumo');
    },
};