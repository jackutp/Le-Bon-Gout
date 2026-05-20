// src/context/ProductoContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { productoService, Producto } from '@/services/productoService';

interface ProductoContextType {
    menuItems: Producto[];
    loading: boolean;
    error: string | null;
    addMenuItem: (item: Omit<Producto, 'productoid'>, imagenFile?: File) => Promise<void>;
    updateMenuItem: (id: number, item: Partial<Producto>, imagenFile?: File) => Promise<void>;
    updateStock: (id: number, stock: number) => Promise<void>;
    deleteMenuItem: (id: number) => Promise<void>;
    refreshProducts: () => Promise<void>;
}

const ProductoContext = createContext<ProductoContextType | undefined>(undefined);

// Función helper para convertir objeto a FormData
const objectToFormData = (data: Record<string, any>, imagenFile?: File): FormData => {
    const formData = new FormData();

    // Agregar campos del producto
    if (data.nombre !== undefined) formData.append('nombre', data.nombre);
    if (data.descripcion !== undefined) formData.append('descripcion', data.descripcion);
    if (data.precio !== undefined) formData.append('precio', data.precio.toString());
    if (data.categoria !== undefined) formData.append('categoria', data.categoria);
    if (data.stock !== undefined) formData.append('stock', data.stock.toString());

    // Agregar imagen si existe
    if (imagenFile) {
        formData.append('imagen', imagenFile);
    }

    return formData;
};

export function ProductoProvider({ children }: { children: React.ReactNode }) {
    const [menuItems, setMenuItems] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refreshProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('🔄 [ProductoContext] Cargando productos...');
            const products = await productoService.getAll();
            console.log('✅ [ProductoContext] Productos cargados:', products.length);
            setMenuItems(products);
        } catch (error: any) {
            console.error('❌ [ProductoContext] Error cargando productos:', error);
            setError(error.message || 'Error al cargar productos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('🚀 [ProductoContext] Inicializando...');
        refreshProducts();
    }, []);

    // ✅ CORREGIDO: addMenuItem ahora acepta imagenFile
    const addMenuItem = async (item: Omit<Producto, 'productoid'>, imagenFile?: File) => {
        console.log('➕ [ProductoContext] Agregando producto:', item);
        const formData = objectToFormData(item, imagenFile);
        await productoService.createWithImage(formData);
        await refreshProducts();
    };

    // ✅ CORREGIDO: updateMenuItem ahora acepta imagenFile
    const updateMenuItem = async (id: number, item: Partial<Producto>, imagenFile?: File) => {
        console.log('✏️ [ProductoContext] Actualizando producto:', id, item);

        // Crear FormData
        const formData = new FormData();

        // Agregar campos del producto
        if (item.nombre !== undefined) formData.append('nombre', item.nombre);
        if (item.descripcion !== undefined) formData.append('descripcion', item.descripcion);
        if (item.precio !== undefined) formData.append('precio', item.precio.toString());
        if (item.categoria !== undefined) formData.append('categoria', item.categoria);
        if (item.stock !== undefined) formData.append('stock', item.stock.toString());

        // Agregar imagen si se seleccionó una nueva
        if (imagenFile) {
            formData.append('imagen', imagenFile);
        }

        await productoService.update(id, formData);
        await refreshProducts();
    };

    const updateStock = async (id: number, stock: number) => {
        console.log('📦 [ProductoContext] Actualizando stock:', id, stock);
        await productoService.updateStock(id, stock);
        await refreshProducts();
    };

    const deleteMenuItem = async (id: number) => {
        console.log('🗑️ [ProductoContext] Eliminando producto:', id);
        await productoService.delete(id);
        await refreshProducts();
    };

    return (
        <ProductoContext.Provider value={{
            menuItems,
            loading,
            error,
            addMenuItem,
            updateMenuItem,
            updateStock,
            deleteMenuItem,
            refreshProducts,
        }}>
            {children}
        </ProductoContext.Provider>
    );
}

export function useProductos() {
    const context = useContext(ProductoContext);
    if (!context) throw new Error('useProductos must be used within ProductoProvider');
    return context;
}

