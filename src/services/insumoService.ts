// src/services/insumoService.ts
import { apiFetch } from './apiClient';

export interface Insumo {
    insumoid?: number;
    nombre: string;
    unidadMedida: "KG" | "LATAS" | "G" | "L" | "ML";
    stock: number;
    estadoInsumo: "DISPONIBLE" | "BAJO" | "VACIO";
}

export const insumoService = {
    // Obtener todos los insumos
    async getAll(): Promise<Insumo[]> {
        const res = await apiFetch('/insumos/all');
        if (!res.ok) throw new Error('Error al cargar insumos');
        const data = await res.json();
        return data.map((i: any) => ({ ...i, stock: i.stock ?? 0 }));
    },

    // Buscar insumos por nombre
    async searchByNombre(nombre: string): Promise<Insumo[]> {
        const res = await apiFetch(`/insumos/search?nombre=${encodeURIComponent(nombre)}`);
        if (res.status === 404) return [];
        if (!res.ok) throw new Error('Error al buscar insumos');
        return res.json();
    },

    // Obtener insumo por ID
    async getById(id: number): Promise<Insumo> {
        const res = await apiFetch(`/insumos/${id}`);
        if (!res.ok) throw new Error('Insumo no encontrado');
        const data = await res.json();
        return { ...data, stock: data.stock ?? 0 };
    },

    // Obtener insumos por estado
    async getByEstado(estado: string): Promise<Insumo[]> {
        const res = await apiFetch(`/insumos/estado/${estado}`);
        if (!res.ok) throw new Error('Error al filtrar insumos');
        return res.json();
    },

    // Obtener insumos con stock bajo
    async getLowStock(): Promise<Insumo[]> {
        const res = await apiFetch('/insumos/low-stock');
        if (!res.ok) throw new Error('Error al obtener insumos con stock bajo');
        return res.json();
    },

    // Obtener insumos agotados
    async getOutOfStock(): Promise<Insumo[]> {
        const res = await apiFetch('/insumos/out-of-stock');
        if (!res.ok) throw new Error('Error al obtener insumos agotados');
        return res.json();
    },

    // Crear nuevo insumo
    async create(insumo: Omit<Insumo, 'insumoid'>): Promise<Insumo> {
        const body: any = {
            nombre: insumo.nombre,
            unidadMedida: insumo.unidadMedida,
            stock: insumo.stock,
        };
        if (insumo.estadoInsumo) {
            body.estadoInsumo = insumo.estadoInsumo;
        }
        const res = await apiFetch('/insumos/crear', {
            method: 'POST',
            body: JSON.stringify(body),
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || 'Error al crear insumo');
        }
        return res.json();
    },

    // Actualizar insumo completo (PUT)
    async update(id: number, insumo: Partial<Insumo>): Promise<Insumo> {
        const body: any = {};
        if (insumo.nombre !== undefined) body.nombre = insumo.nombre;
        if (insumo.unidadMedida !== undefined) body.unidadMedida = insumo.unidadMedida;
        if (insumo.stock !== undefined) body.stock = insumo.stock;
        if (insumo.estadoInsumo !== undefined) body.estadoInsumo = insumo.estadoInsumo;

        const res = await apiFetch(`/insumos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
        });
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || 'Error al actualizar insumo');
        }
        return res.json();
    },

    // Actualizar solo stock (PATCH)
    async updateStock(id: number, stock: number): Promise<Insumo> {
        const res = await apiFetch(`/insumos/${id}/stock`, {
            method: 'PATCH',
            body: JSON.stringify({ stock }),
        });
        if (!res.ok) throw new Error('Error al actualizar stock');
        return res.json();
    },

    // Eliminar insumo
    async delete(id: number): Promise<void> {
        const res = await apiFetch(`/insumos/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Error al eliminar insumo');
    },
};