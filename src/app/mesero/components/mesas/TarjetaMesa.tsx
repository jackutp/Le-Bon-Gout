// src/app/mesero/components/mesas/TarjetaMesa.tsx

import { motion } from "framer-motion";
import { Receipt } from "lucide-react";
import Image from "next/image";
import { InvoiceData, TableData } from "../../types";
import { getTableImage } from "../../utils/tableImages";

interface Props {
  table: TableData;
  setInvoiceModal: (data: InvoiceData) => void;
}

export function TarjetaMesa({ table, setInvoiceModal }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`bg-[#121214] border ${table.status === "OCUPADO" ? "border-stone-800" : "border-stone-800/50"
        } rounded overflow-hidden flex flex-col`}
    >
      <div className="relative h-24 w-full">
        <Image
          src={getTableImage(table.number)}
          alt={`Mesa ${table.number}`}
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-2 left-2">
          <h3 className="font-serif text-lg text-white">Mesa {table.number}</h3>
        </div>
      </div>
      <div className="p-3">
        {table.status === "OCUPADO" ? (
          <>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-stone-400">Total:</span>
              <span className="font-serif text-base text-[#C6A96B]">S/ {table.total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setInvoiceModal({ table: table.number, total: table.total })}
              className="w-full bg-[#C6A96B]/10 text-[#C6A96B] border border-[#C6A96B]/30 px-2 py-1.5 rounded text-xs uppercase tracking-widest hover:bg-[#C6A96B]/20 transition-colors flex items-center justify-center gap-1.5"
            >
              <Receipt className="w-3 h-3" />
              Comprobante
            </button>
          </>
        ) : (
          <div className="text-center text-stone-500 text-xs py-2">Disponible</div>
        )}
      </div>
    </motion.div>
  );
}