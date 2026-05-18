// src/context/ProveedorContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { proveedorService, Proveedor, OrdenCompra } from '@/services/proveedorService';

interface ProveedorContextType {
    proveedores: Proveedor[];
    ordenes: OrdenCompra[];
    loading: boolean;
    error: string | null;
    // Proveedores
    addProveedor: (proveedor: Omit<Proveedor, 'proveedorid'>) => Promise<void>;
    updateProveedor: (id: number, proveedor: Partial<Proveedor>) => Promise<void>;
    deleteProveedor: (id: number) => Promise<{ success: boolean; message?: string; hasOrdenes?: boolean; ordenesCount?: number }>;
    refreshProveedores: () => Promise<void>;
    // Órdenes
    addOrden: (proveedorId: number) => Promise<void>;
    updateEstadoOrden: (ordenId: number, estado: string) => Promise<void>;
    subirFactura: (ordenId: number, file: File) => Promise<void>;
    descargarFactura: (ordenId: number) => Promise<Blob>;
    eliminarFactura: (ordenId: number) => Promise<void>;
    deleteOrden: (ordenId: number) => Promise<void>;
    refreshOrdenes: () => Promise<void>;
    getOrdenesByProveedor: (proveedorId: number) => OrdenCompra[];
}

const ProveedorContext = createContext<ProveedorContextType | undefined>(undefined);

export function ProveedorProvider({ children }: { children: React.ReactNode }) {
    const [proveedores, setProveedores] = useState<Proveedor[]>([]);
    const [ordenes, setOrdenes] = useState<OrdenCompra[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refreshProveedores = async () => {
        try {
            const data = await proveedorService.getAllProveedores();
            setProveedores(data);
        } catch (error: any) {
            console.error('Error cargando proveedores:', error);
            setError(error.message);
        }
    };

    const refreshOrdenes = async () => {
        try {
            const data = await proveedorService.getAllOrdenes();
            setOrdenes(data);
        } catch (error: any) {
            console.error('Error cargando órdenes:', error);
            setError(error.message);
        }
    };

    const refreshAll = async () => {
        try {
            setLoading(true);
            setError(null);
            await Promise.all([refreshProveedores(), refreshOrdenes()]);
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshAll();
    }, []);

    // Proveedores
    const addProveedor = async (proveedor: Omit<Proveedor, 'proveedorid'>) => {
        await proveedorService.createProveedor(proveedor);
        await refreshProveedores();
    };

    const updateProveedor = async (id: number, proveedor: Partial<Proveedor>) => {
        await proveedorService.updateProveedor(id, proveedor);
        await refreshProveedores();
    };

    const deleteProveedor = async (id: number) => {
        try {
            const result = await proveedorService.deleteProveedor(id);
            await refreshProveedores();
            return {
                success: true,
                message: result.message
            };
        } catch (error: any) {
            console.error('Error en deleteProveedor:', error);
            return {
                success: false,
                message: error.message,
                hasOrdenes: error.hasOrdenes,
                ordenesCount: error.ordenesCount
            };
        }
    };

    // Órdenes
    const addOrden = async (proveedorId: number) => {
        await proveedorService.createOrden(proveedorId);
        await refreshOrdenes();
    };

    const updateEstadoOrden = async (ordenId: number, estado: string) => {
        await proveedorService.updateEstadoOrden(ordenId, estado);
        await refreshOrdenes();
    };

    const subirFactura = async (ordenId: number, file: File) => {
        await proveedorService.subirFactura(ordenId, file);
        await refreshOrdenes();
    };

    const descargarFactura = async (ordenId: number): Promise<Blob> => {
        return await proveedorService.descargarFactura(ordenId);
    };

    const eliminarFactura = async (ordenId: number) => {
        await proveedorService.eliminarFactura(ordenId);
        await refreshOrdenes();
    };

    const deleteOrden = async (ordenId: number) => {
        await proveedorService.deleteOrden(ordenId);
        await refreshOrdenes();  // ✅ Esto actualiza la lista global
    };

    const getOrdenesByProveedor = (proveedorId: number) => {
        return ordenes.filter(o => o.proveedorId === proveedorId);
    };

    return (
        <ProveedorContext.Provider
            value={{
                proveedores,
                ordenes,
                loading,
                error,
                addProveedor,
                updateProveedor,
                deleteProveedor,
                refreshProveedores,
                addOrden,
                updateEstadoOrden,
                subirFactura,
                descargarFactura,
                eliminarFactura,
                deleteOrden,
                refreshOrdenes,
                getOrdenesByProveedor,
            }}
        >
            {children}
        </ProveedorContext.Provider>
    );
}

export function useProveedores() {
    const context = useContext(ProveedorContext);
    if (!context) throw new Error('useProveedores must be used within ProveedorProvider');
    return context;
}