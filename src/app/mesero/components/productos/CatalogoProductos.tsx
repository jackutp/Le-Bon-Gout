// src/app/mesero/components/productos/CatalogoProductos.tsx

"use client";

import { useState } from "react";
import { useProductos } from "@/context/ProductoContext";
import { FiltroCategorias } from "./FiltroCategorias";
import { TarjetaProducto } from "./TarjetaProducto";

interface Props {
  addToOrder: (id: number) => void;
}

export function CatalogoProductos({ addToOrder }: Props) {
  const { menuItems, loading } = useProductos();
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C6A96B]"></div>
      </div>
    );
  }

  // Mapear para el mesero - solo los campos que necesita TarjetaProducto
  const productosMapeados = menuItems.map(item => ({
    id: item.productoid!,
    name: item.nombre,
    price: item.precio,
    desc: item.descripcion,
    category: item.categoria,
    inStock: item.stock,
  }));

  const filteredItems = categoryFilter === "all"
    ? productosMapeados
    : productosMapeados.filter(item => item.category === categoryFilter);

  return (
    <>
      <FiltroCategorias categoryFilter={categoryFilter} setCategoryFilter={setCategoryFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredItems.map((product) => (
          <TarjetaProducto key={product.id} product={product} addToOrder={addToOrder} />
        ))}
      </div>
    </>
  );
}