// src/services/pagoService.ts

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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090/api';

class PagoService {
    private getHeaders() {
        return {
            'Content-Type': 'application/json',
        };
    }

    async procesarPago(data: ProcesarPagoRequest): Promise<ProcesarPagoResponse> {
        const response = await fetch(`${API_BASE_URL}/pagos/procesar`, {
            method: 'POST',
            headers: this.getHeaders(),
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