import { X, FileText, Receipt } from "lucide-react";
import { ModalWrapper } from "./ModalWrapper";
import { InvoiceData } from "../../types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  invoiceModal: InvoiceData | null;
}

export function ModalInvoice({ isOpen, onClose, invoiceModal }: Props) {
  if (!invoiceModal) return null;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <button onClick={onClose} className="absolute top-3 right-3 text-stone-500 hover:text-white">
        <X className="w-4 h-4" />
      </button>
      <h2 className="text-xl font-serif text-[#C6A96B] mb-1">Emitir Comprobante</h2>
      <p className="text-stone-400 text-xs mb-4 uppercase tracking-widest">
        Mesa {invoiceModal.table} - Total: S/ {invoiceModal.total.toFixed(2)}
      </p>

      <div className="space-y-2 mb-4">
        <button
          onClick={() => {
            setTimeout(() => {
              alert("Boleta emitida correctamente");
              onClose();
            }, 300);
          }}
          className="w-full p-3 border border-stone-800 hover:border-[#C6A96B] rounded flex items-center gap-3 transition-colors"
        >
          <FileText className="w-6 h-6 text-[#C6A96B]" />
          <div className="text-left">
            <p className="text-white text-sm font-medium">Boleta electronica</p>
            <p className="text-xs text-stone-500">Comprobante persona natural</p>
          </div>
        </button>
        <button
          onClick={() => {
            setTimeout(() => {
              alert("Factura emitida correctamente");
              onClose();
            }, 300);
          }}
          className="w-full p-3 border border-stone-800 hover:border-[#C6A96B] rounded flex items-center gap-3 transition-colors"
        >
          <Receipt className="w-6 h-6 text-[#C6A96B]" />
          <div className="text-left">
            <p className="text-white text-sm font-medium">Factura electronica</p>
            <p className="text-xs text-stone-500">Comprobante con RUC</p>
          </div>
        </button>
      </div>

      <button
        onClick={onClose}
        className="w-full border border-stone-800 text-stone-400 uppercase tracking-widest text-xs py-2 hover:text-white transition-colors"
      >
        Cancelar
      </button>
    </ModalWrapper>
  );
}