// src/services/solicitudService.ts

import { Solicitud, CrearSolicitudDTO, ApiResponse, EstadisticasSolicitudes } from '@/types/solicitud';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090/api';

class SolicitudService {
    private getHeaders(): HeadersInit {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
        };
    }

    // Crear una nueva solicitud
    async crearSolicitud(data: CrearSolicitudDTO): Promise<Solicitud> {
        const response = await fetch(`${API_BASE_URL}/solicitudes`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Error al crear la solicitud');
        }

        const result: ApiResponse<Solicitud> = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }
        return result.data;
    }

    // Obtener todas las solicitudes
    async listarSolicitudes(): Promise<Solicitud[]> {
        const response = await fetch(`${API_BASE_URL}/solicitudes`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al cargar las solicitudes');
        }

        const result: ApiResponse<Solicitud[]> = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }
        return result.data;
    }

    // Obtener solicitud por ID
    async obtenerSolicitud(id: number): Promise<Solicitud> {
        const response = await fetch(`${API_BASE_URL}/solicitudes/${id}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al cargar la solicitud');
        }

        const result: ApiResponse<Solicitud> = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }
        return result.data;
    }

    // Actualizar estado de una solicitud
    async actualizarEstado(id: number, estado: string): Promise<Solicitud> {
        const response = await fetch(`${API_BASE_URL}/solicitudes/${id}/estado?estado=${estado}`, {
            method: 'PUT',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el estado');
        }

        const result: ApiResponse<Solicitud> = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }
        return result.data;
    }

    // Obtener solicitudes por estado
    async listarPorEstado(estado: string): Promise<Solicitud[]> {
        const response = await fetch(`${API_BASE_URL}/solicitudes/estado/${estado}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al cargar las solicitudes');
        }

        const result: ApiResponse<Solicitud[]> = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }
        return result.data;
    }

    // Obtener solicitudes por tipo
    async listarPorTipo(tipo: string): Promise<Solicitud[]> {
        const response = await fetch(`${API_BASE_URL}/solicitudes/tipo/${tipo}`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al cargar las solicitudes');
        }

        const result: ApiResponse<Solicitud[]> = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }
        return result.data;
    }

    // Obtener estadísticas
    async obtenerEstadisticas(): Promise<EstadisticasSolicitudes> {
        const response = await fetch(`${API_BASE_URL}/solicitudes/estadisticas`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al cargar las estadísticas');
        }

        const result: ApiResponse<EstadisticasSolicitudes> = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }
        return result.data;
    }

    // Obtener configuración (tipos, estados, etc.)
    async obtenerConfiguracion(): Promise<any> {
        const response = await fetch(`${API_BASE_URL}/solicitudes/configuracion`, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Error al cargar la configuración');
        }

        const result: ApiResponse<any> = await response.json();
        if (!result.success) {
            throw new Error(result.message);
        }
        return result.data;
    }
}

export const solicitudService = new SolicitudService();