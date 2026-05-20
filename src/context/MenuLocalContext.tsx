"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  desc: string;
  category: "PLATO" | "BEBIDA" | "POSTRE";
  img: string;
  inStock: number;
};

export const initialMenu: MenuItem[] = [
  { id: 1, name: "Filet Mignon", price: 45, desc: "Pure de papas con trufa, esparragos", category: "PLATO", img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800", inStock: 12 },
  { id: 2, name: "Ravioli de Langosta", price: 38, desc: "Pasta casera, crema de azafran, caviar", category: "PLATO", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800", inStock: 5 },
  { id: 3, name: "Magret de Pato", price: 42, desc: "Salsa de frutos rojos", category: "PLATO", img: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?auto=format&fit=crop&q=80&w=800", inStock: 8 },
  { id: 4, name: "Chablis Grand Cru", price: 120, desc: "Vino blanco premium, 2019", category: "BEBIDA", img: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800", inStock: 3 },
  { id: 5, name: "Pisco Sour", price: 25, desc: "Pisco, lemon, clara de huevo", category: "BEBIDA", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800", inStock: 10 },
  { id: 6, name: "Caviar Beluga", price: 150, desc: "Con blinis y crema", category: "PLATO", img: "https://images.unsplash.com/photo-1728335026927-8ee0382ada94?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", inStock: 2 },
  { id: 7, name: "Mousse de Chocolate", price: 18, desc: "Lampara de oro, coulis de frambuesa", category: "POSTRE", img: "https://images.unsplash.com/photo-1673551494277-92204546b504?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", inStock: 8 },
  { id: 8, name: "Creme Brulee", price: 22, desc: "Vainilla de Madagascar, caramelizado", category: "POSTRE", img: "https://images.unsplash.com/photo-1676300184943-09b2a08319a3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", inStock: 6 },
];

type MenuLocalContextType = {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (id: number, item: MenuItem) => void;
  deleteMenuItem: (id: number) => void;
};

const MenuLocalContext = createContext<MenuLocalContextType | undefined>(undefined);

export function MenuLocalProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenu);

  const addMenuItem = (item: MenuItem) => {
    setMenuItems((prev) => [...prev, item]);
  };

  const updateMenuItem = (id: number, item: MenuItem) => {
    setMenuItems((prev) => prev.map((m) => (m.id === id ? item : m)));
  };

  const deleteMenuItem = (id: number) => {
    setMenuItems((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <MenuLocalContext.Provider
      value={{
        menuItems,
        setMenuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
      }}
    >
      {children}
    </MenuLocalContext.Provider>
  );
}

export function useMenuLocal() {
  const context = useContext(MenuLocalContext);
  if (!context) {
    throw new Error("useMenuLocal must be used within MenuLocalProvider");
  }
  return context;
}
