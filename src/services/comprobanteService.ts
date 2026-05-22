// src/services/comprobanteService.ts

export interface Comprobante {
    id: number;
    tipo: string;
    serie: string;
    correlativo: number;
    numeroCompleto: string;
    ruc: string;
    razonSocial: string;
    ordenId: string;
    mesaNumero: number;
    total: number;
    pdfUrl: string;
    createdAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090/api';

class ComprobanteService {
    private getHeaders() {
        return {
            'Content-Type': 'application/json',
        };
    }

    async listarComprobantes(): Promise<Comprobante[]> {
        const response = await fetch(`${API_BASE_URL}/pagos/comprobantes`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al cargar los comprobantes');
        }

        return response.json();
    }

    async descargarPdf(id: number): Promise<void> {
        window.open(`${API_BASE_URL}/pagos/comprobantes/${id}/pdf`, '_blank');
    }
}

export const comprobanteService = new ComprobanteService();