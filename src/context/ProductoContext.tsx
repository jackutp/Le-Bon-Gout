// src/context/ProductoContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { productoService, Producto } from '@/services/productoService';

interface ProductoContextType {
    menuItems: Producto[];
    loading: boolean;
    error: string | null;
    addMenuItem: (item: Omit<Producto, 'productoid'>) => Promise<void>;
    updateMenuItem: (id: number, item: Partial<Producto>) => Promise<void>;
    updateStock: (id: number, stock: number) => Promise<void>;
    deleteMenuItem: (id: number) => Promise<void>;
    refreshProducts: () => Promise<void>;
}

const ProductoContext = createContext<ProductoContextType | undefined>(undefined);

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

    const addMenuItem = async (item: Omit<Producto, 'productoid'>) => {
        console.log('➕ [ProductoContext] Agregando producto:', item);
        await productoService.create(item);
        await refreshProducts();
    };

    const updateMenuItem = async (id: number, item: Partial<Producto>) => {
        console.log('✏️ [ProductoContext] Actualizando producto:', id, item);
        await productoService.update(id, item);
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