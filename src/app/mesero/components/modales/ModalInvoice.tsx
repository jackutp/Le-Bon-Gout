// src/app/mesero/components/modales/ModalInvoice.tsx

"use client";

import { X, FileText, Receipt, Loader2 } from "lucide-react";
import { ModalWrapper } from "./ModalWrapper";
import { InvoiceData } from "../../types";
import { useState } from "react";
import { usePago } from "@/context/PagoContext";
import { useMesa } from "@/context/MesaContext";
import { apiFetch } from "@/services/apiClient";  // ✅ Importar apiFetch

interface Props {
  isOpen: boolean;
  onClose: () => void;
  invoiceModal: InvoiceData | null;
  onPaymentSuccess?: () => void;
}

export function ModalInvoice({ isOpen, onClose, invoiceModal, onPaymentSuccess }: Props) {
  const { procesarPago, isLoading: pagando } = usePago();
  const { refreshMesas } = useMesa();

  const [tipoComprobante, setTipoComprobante] = useState<string | null>(null);
  const [ruc, setRuc] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [metodoPago, setMetodoPago] = useState<string | null>(null);
  const [showFacturaForm, setShowFacturaForm] = useState(false);
  const [buscandoPedido, setBuscandoPedido] = useState(false);

  if (!invoiceModal) return null;

  // ✅ CORREGIDO: Usar apiFetch que envía el token automáticamente
  const obtenerPedidoActivo = async (mesaNumero: number) => {
    try {
      // Buscar en PENDIENTE primero
      const pendientesRes = await apiFetch('/pedidos/estado/PENDIENTE');
      if (pendientesRes.ok) {
        const pendientes = await pendientesRes.json();
        const pedido = pendientes.find((p: any) => p.mesaNumero === mesaNumero);
        if (pedido) return pedido;
      }

      // Si no hay pendiente, buscar SERVIDO
      const servidosRes = await apiFetch('/pedidos/estado/SERVIDO');
      if (servidosRes.ok) {
        const servidos = await servidosRes.json();
        const pedido = servidos.find((p: any) => p.mesaNumero === mesaNumero);
        if (pedido) return pedido;
      }

      return null;
    } catch (error) {
      console.error("Error obteniendo pedido activo:", error);
      return null;
    }
  };

  const handleProcesarPago = async () => {
    if (!metodoPago) {
      alert("Seleccione un método de pago");
      return;
    }
    if (!tipoComprobante) {
      alert("Seleccione un tipo de comprobante");
      return;
    }
    if (tipoComprobante === "FACTURA" && !ruc) {
      alert("Ingrese el RUC para la factura");
      return;
    }

    setBuscandoPedido(true);

    try {
      const pedidoActivo = await obtenerPedidoActivo(invoiceModal.table);

      if (!pedidoActivo) {
        alert("No se encontró un pedido activo para esta mesa");
        return;
      }

      const request = {
        ordenId: pedidoActivo.ordenId,
        mesaNumero: invoiceModal.table,
        total: invoiceModal.total,
        metodo: metodoPago as "EFECTIVO" | "TARJETA" | "QR",
        tipoComprobante: tipoComprobante as "BOLETA" | "FACTURA",
        ruc: tipoComprobante === "FACTURA" ? ruc : undefined,
        razonSocial: tipoComprobante === "FACTURA" ? razonSocial : undefined,
      };

      const result = await procesarPago(request);

      if (result) {
        alert(`Pago procesado correctamente. ${tipoComprobante}: ${result.comprobante?.numeroCompleto}`);
        await refreshMesas();

        if (onPaymentSuccess) {
          onPaymentSuccess();
        }

        onClose();
        setTipoComprobante(null);
        setMetodoPago(null);
        setRuc("");
        setRazonSocial("");
        setShowFacturaForm(false);
      } else {
        alert("Error al procesar el pago");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al procesar el pago");
    } finally {
      setBuscandoPedido(false);
    }
  };

  const isLoading = pagando || buscandoPedido;

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <button onClick={onClose} className="absolute top-3 right-3 text-stone-500 hover:text-white">
        <X className="w-4 h-4" />
      </button>
      <h2 className="text-xl font-serif text-[#C6A96B] mb-1">Emitir Comprobante</h2>
      <p className="text-stone-400 text-xs mb-4 uppercase tracking-widest">
        Mesa {invoiceModal.table} - Total: S/ {invoiceModal.total.toFixed(2)}
      </p>

      {/* Selección de comprobante */}
      <div className="mb-4">
        <label className="text-xs text-stone-400 uppercase tracking-wider block mb-2">
          Tipo de Comprobante
        </label>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setTipoComprobante("BOLETA");
              setShowFacturaForm(false);
            }}
            className={`flex-1 p-3 border rounded flex items-center gap-3 transition-colors ${tipoComprobante === "BOLETA"
              ? "border-[#C6A96B] bg-[#C6A96B]/10"
              : "border-stone-800 hover:border-stone-600"
              }`}
          >
            <FileText className="w-6 h-6 text-[#C6A96B]" />
            <div className="text-left">
              <p className="text-white text-sm font-medium">Boleta electronica</p>
              <p className="text-xs text-stone-500">Persona natural</p>
            </div>
          </button>
          <button
            onClick={() => {
              setTipoComprobante("FACTURA");
              setShowFacturaForm(true);
            }}
            className={`flex-1 p-3 border rounded flex items-center gap-3 transition-colors ${tipoComprobante === "FACTURA"
              ? "border-[#C6A96B] bg-[#C6A96B]/10"
              : "border-stone-800 hover:border-stone-600"
              }`}
          >
            <Receipt className="w-6 h-6 text-[#C6A96B]" />
            <div className="text-left">
              <p className="text-white text-sm font-medium">Factura electronica</p>
              <p className="text-xs text-stone-500">Con RUC</p>
            </div>
          </button>
        </div>
      </div>

      {/* Formulario de factura */}
      {showFacturaForm && (
        <div className="mb-4 space-y-3 p-3 bg-stone-900/50 rounded">
          <div>
            <label className="text-xs text-stone-400 block mb-1">RUC</label>
            <input
              type="text"
              value={ruc}
              onChange={(e) => setRuc(e.target.value)}
              className="w-full bg-stone-800 border border-stone-700 rounded px-3 py-2 text-white text-sm"
              placeholder="20XXXXXXXXX"
              maxLength={11}
            />
          </div>
          <div>
            <label className="text-xs text-stone-400 block mb-1">Razón Social</label>
            <input
              type="text"
              value={razonSocial}
              onChange={(e) => setRazonSocial(e.target.value)}
              className="w-full bg-stone-800 border border-stone-700 rounded px-3 py-2 text-white text-sm"
              placeholder="Empresa SAC"
            />
          </div>
        </div>
      )}

      {/* Selección de método de pago */}
      <div className="mb-4">
        <label className="text-xs text-stone-400 uppercase tracking-wider block mb-2">
          Método de Pago
        </label>
        <div className="grid grid-cols-3 gap-2">
          {["EFECTIVO", "TARJETA", "QR"].map((metodo) => (
            <button
              key={metodo}
              onClick={() => setMetodoPago(metodo)}
              className={`px-3 py-2 rounded text-sm uppercase tracking-widest transition-colors ${metodoPago === metodo
                ? "bg-[#C6A96B] text-black"
                : "border border-stone-800 text-stone-400 hover:text-white hover:border-stone-600"
                }`}
            >
              {metodo}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleProcesarPago}
        disabled={isLoading}
        className="w-full bg-[#C6A96B] text-black py-2 rounded text-sm uppercase tracking-widest font-semibold hover:bg-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {isLoading ? "Procesando..." : `Pagar S/ ${invoiceModal.total.toFixed(2)}`}
      </button>

      <button
        onClick={onClose}
        className="w-full border border-stone-800 text-stone-400 uppercase tracking-widest text-xs py-2 mt-2 hover:text-white transition-colors"
      >
        Cancelar
      </button>
    </ModalWrapper>
  );
}