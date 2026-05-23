// src/services/mermaService.ts
import { apiFetch } from './apiClient';

export interface Merma {
    mermaid?: number;
    tipoMerma: "PRODUCTO" | "INSUMO";
    nombreMerma: string;
    cantidad: string;
    motivo: string;
    fecha?: string;
    referenciaId?: number;
    unidadMedida?: string;
}

export interface Producto {
    productoid: number;
    nombre: string;
    precio?: number;
    categoria?: string;
    stock?: number;
}

export interface Insumo {
    insumoid: number;
    nombre: string;
    unidadMedida: string;
    stock?: number;
    estadoInsumo?: string;
}

export const mermaService = {
    // Obtener todas las mermas
    async getAll(): Promise<Merma[]> {
        const res = await apiFetch('/mermas/all');
        if (!res.ok) throw new Error('Error al cargar mermas');
        return res.json();
    },

    // Obtener merma por ID
    async getById(id: number): Promise<Merma> {
        const res = await apiFetch(`/mermas/${id}`);
        if (!res.ok) throw new Error('Merma no encontrada');
        return res.json();
    },

    // Obtener mermas por tipo
    async getByTipo(tipo: "PRODUCTO" | "INSUMO"): Promise<Merma[]> {
        const res = await apiFetch(`/mermas/tipo/${tipo}`);
        if (!res.ok) throw new Error('Error al filtrar mermas');
        return res.json();
    },

    // Obtener todos los productos (desde microservicio-producto vía gateway)
    async getProductos(): Promise<Producto[]> {
        const res = await apiFetch('/mermas/productos');
        if (!res.ok) throw new Error('Error al cargar productos');
        return res.json();
    },

    // Obtener todos los insumos (desde microservicio-insumos vía gateway)
    async getInsumos(): Promise<Insumo[]> {
        const res = await apiFetch('/mermas/insumos');
        if (!res.ok) throw new Error('Error al cargar insumos');
        return res.json();
    },

    // Crear nueva merma
    async create(merma: Omit<Merma, 'mermaid'>): Promise<Merma> {
        const res = await apiFetch('/mermas/crear', {
            method: 'POST',
            body: JSON.stringify(merma),
        });
        if (!res.ok) throw new Error('Error al crear merma');
        return res.json();
    },

    // Actualizar merma
    async update(id: number, merma: Partial<Merma>): Promise<Merma> {
        const res = await apiFetch(`/mermas/${id}`, {
            method: 'PUT',
            body: JSON.stringify(merma),
        });
        if (!res.ok) throw new Error('Error al actualizar merma');
        return res.json();
    },

    // Eliminar merma
    async delete(id: number): Promise<void> {
        const res = await apiFetch(`/mermas/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Error al eliminar merma');
    },
};