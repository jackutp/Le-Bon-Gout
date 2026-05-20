// src/app/mesero/components/mesas/EstadosMesa.tsx

"use client";

import { useEffect } from "react";
import { useMesa } from "@/context/MesaContext";
import { InvoiceData } from "../../types";
import { TarjetaMesa } from "./TarjetaMesa";

interface Props {
  setInvoiceModal: (data: InvoiceData) => void;
}

export function EstadosMesa({ setInvoiceModal }: Props) {
  const { mesas, isLoading, refreshMesas } = useMesa();

  // 🔄 Polling: actualizar mesas cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      refreshMesas();
    }, 3000); // ← Cada 3 segundos

    return () => clearInterval(interval);
  }, [refreshMesas]);

  const tables = mesas.map(mesa => ({
    id: mesa.id,
    number: mesa.numero,
    status: mesa.estado,
    total: mesa.totalActual,
    capacity: mesa.capacidad,
  }));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C6A96B]"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
      {tables.map((table) => (
        <TarjetaMesa key={table.id} table={table} setInvoiceModal={setInvoiceModal} />
      ))}
    </div>
  );
}