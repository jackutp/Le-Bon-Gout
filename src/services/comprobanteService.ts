// src/services/comprobanteService.ts
import { apiFetch, API_BASE_URL } from './apiClient';

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

class ComprobanteService {
    async listarComprobantes(): Promise<Comprobante[]> {
        const response = await apiFetch('/pagos/comprobantes');

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