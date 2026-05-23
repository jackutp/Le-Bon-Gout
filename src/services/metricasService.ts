// src/services/metricasService.ts
import { apiFetch } from './apiClient';

export interface ProductoTop {
    nombre: string;
    cantidad: number;
    total: number;
}

export interface VentaPorHora {
    hora: number;
    total: number;
}

export interface MetricasPedidos {
    ordenesCompletadas: number;
    ordenesPorEstado: {
        PENDIENTE: number;
        EN_PREPARACION: number;
        SERVIDO: number;
        COMPLETADO: number;
    };
    productosTop: ProductoTop[];
}

export interface MetricasPagos {
    ventasDelDia: number;
    ventasUltimos7Dias: number[];
    diasSemana: string[];
    ventasPorHora: VentaPorHora[];
    mesasOcupadas: number;
    totalMesas: number;
    ocupacionPorcentaje: number;
}

class MetricasService {
    async getMetricasPedidos(): Promise<MetricasPedidos> {
        const response = await apiFetch('/pedidos/metricas');
        if (!response.ok) throw new Error('Error al cargar métricas de pedidos');
        return response.json();
    }

    async getMetricasPagos(): Promise<MetricasPagos> {
        const response = await apiFetch('/pagos/metricas');
        if (!response.ok) throw new Error('Error al cargar métricas de pagos');
        return response.json();
    }
}

export const metricasService = new MetricasService();