// src/services/pagoService.ts
import { apiFetch } from './apiClient';  // ✅ Cambiar importación

export interface ProcesarPagoRequest {
    ordenId: string;
    mesaNumero: number;
    total: number;
    metodo: "EFECTIVO" | "TARJETA" | "QR";
    tipoComprobante: "BOLETA" | "FACTURA";
    ruc?: string;
    razonSocial?: string;
    email?: string;
}

export interface ComprobanteResponse {
    id: number;
    tipo: string;
    numeroCompleto: string;
    pdfUrl: string;
    total: number;
    fecha: string;
}

export interface ProcesarPagoResponse {
    pagoId: number;
    ordenId: string;
    mesaNumero: number;
    total: number;
    metodo: string;
    estado: string;
    comprobante: ComprobanteResponse;
}

class PagoService {
    async procesarPago(data: ProcesarPagoRequest): Promise<ProcesarPagoResponse> {
        // ✅ Usar apiFetch - maneja headers y token automáticamente
        const response = await apiFetch('/pagos/procesar', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Error al procesar el pago');
        }

        return response.json();
    }
}

export const pagoService = new PagoService();