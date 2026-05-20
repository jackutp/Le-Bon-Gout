//src/app/mesero/components/productos/CatalogoProductos.tsx
import { useState } from "react";
import { useMenuLocal } from "@/context/MenuLocalContext";
import { FiltroCategorias } from "./FiltroCategorias";
import { TarjetaProducto } from "./TarjetaProducto";

interface Props {
  addToOrder: (id: number) => void;
}

export function CatalogoProductos({ addToOrder }: Props) {
  const { menuItems } = useMenuLocal();
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredItems = categoryFilter === "all"
    ? menuItems
    : menuItems.filter(item => item.category === categoryFilter);

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