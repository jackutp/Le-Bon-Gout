"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type InventoryItem = {
  id: number;
  name: string;
  stock: number;
  unit: string;
  category: string;
};

const initialInventory: InventoryItem[] = [
  { id: 1, name: "Trufa Negra", stock: 2, unit: "kg", category: "premium" },
  { id: 2, name: "Caviar Beluga", stock: 5, unit: "latas", category: "premium" },
  { id: 3, name: "Filete de Res", stock: 24, unit: "kg", category: "carne" },
  { id: 4, name: "Azafran", stock: 8, unit: "g", category: "especias" },
  { id: 5, name: "Vino Chablis", stock: 15, unit: "botellas", category: "vinos" },
  { id: 6, name: "Pisco", stock: 12, unit: "botellas", category: "bebidas" },
  { id: 7, name: "Langosta", stock: 10, unit: "kg", category: "mariscos" },
  { id: 8, name: "Chocolate Oscuro", stock: 5, unit: "kg", category: "postres" },
];

export const PRODUCTS_MAP: Record<string, number> = {
  "filet mignon": 3,
  "ravioli": 7,
  "langosta": 7,
  "mousse": 8,
  "chocolate": 8,
  "chablis": 5,
  "caviar": 2,
  "magret": 3,
  "pisco": 6,
  "creme brulee": 8,
};

type InventarioLocalContextType = {
  inventory: InventoryItem[];
  setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
};

const InventarioLocalContext = createContext<InventarioLocalContextType | undefined>(undefined);

export function InventarioLocalProvider({ children }: { children: ReactNode }) {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory);

  return (
    <InventarioLocalContext.Provider value={{ inventory, setInventory }}>
      {children}
    </InventarioLocalContext.Provider>
  );
}

export function useInventarioLocal() {
  const context = useContext(InventarioLocalContext);
  if (!context) {
    throw new Error("useInventarioLocal must be used within InventarioLocalProvider");
  }
  return context;
}
