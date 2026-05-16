// src/services/eventService.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090/api';

export type EventStatus = "PENDIENTE" | "RECIBIDO" | "CANCELADO";

export interface EventRequest {
    id: number;
    name: string;
    lastName: string;
    phone: string;
    company: string | null;
    email: string;
    date: string;
    attendees: number;
    comments: string;
    status: EventStatus;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateEventDTO {
    name: string;
    lastName: string;
    phone: string;
    company?: string | null;
    email: string;
    date: string;
    attendees: number;
    comments: string;
    ageConfirmed: boolean;
    privacyAccepted: boolean;
    marketingAccepted?: boolean;
}

class EventService {
    private async fetchWithError(url: string, options?: RequestInit) {
        try {
            console.log(`📤 Enviando ${options?.method || 'GET'} a:`, url);
            if (options?.body) {
                console.log('📦 Datos enviados:', JSON.parse(options.body as string));
            }

            const response = await fetch(url, options);

            console.log(`📥 Respuesta:`, response.status, response.statusText);

            if (!response.ok) {
                let errorMessage = `Error ${response.status}: ${response.statusText}`;
                let errorDetails = null;

                try {
                    const errorData = await response.json();
                    console.error('❌ Error detallado del backend:', errorData);

                    // Capturar errores de validación de Spring Boot
                    if (errorData.errors) {
                        const validationErrors = Object.values(errorData.errors).join(', ');
                        errorMessage = `Errores de validación: ${validationErrors}`;
                    } else if (errorData.message) {
                        errorMessage = errorData.message;
                    }
                    errorDetails = errorData;
                } catch (e) {
                    console.error('No se pudo parsear error response');
                }

                throw new Error(errorMessage);
            }

            if (options?.method === 'DELETE') {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return await response.json();
                }
                return null;
            }

            const data = await response.json();
            console.log('✅ Respuesta exitosa:', data);
            return data;
        } catch (error) {
            console.error('❌ API Error:', error);
            throw error;
        }
    }

    async createEvent(eventData: CreateEventDTO): Promise<EventRequest> {
        // Limpiar y formatear datos correctamente
        const cleanedData = {
            name: eventData.name.trim(),
            lastName: eventData.lastName.trim(),
            email: eventData.email.trim().toLowerCase(),
            phone: eventData.phone.trim(),
            company: eventData.company && eventData.company.trim() !== '' ? eventData.company.trim() : null,
            date: eventData.date, // Ya viene en formato YYYY-MM-DD
            attendees: Number(eventData.attendees),
            comments: eventData.comments.trim(),
            ageConfirmed: Boolean(eventData.ageConfirmed),
            privacyAccepted: Boolean(eventData.privacyAccepted),
            marketingAccepted: Boolean(eventData.marketingAccepted || false)
        };

        console.log('📝 Enviando al backend:', cleanedData);

        return this.fetchWithError(`${API_URL}/eventos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(cleanedData),
        });
    }

    async getAllEvents(page: number = 0, size: number = 10) {
        return this.fetchWithError(`${API_URL}/eventos?page=${page}&size=${size}`);
    }

    async getEventById(id: number): Promise<EventRequest> {
        return this.fetchWithError(`${API_URL}/eventos/${id}`);
    }

    async updateEventStatus(id: number, statusData: { status: EventStatus; reason?: string }): Promise<EventRequest> {
        return this.fetchWithError(`${API_URL}/eventos/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(statusData),
        });
    }

    async deleteEvent(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/eventos/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    }

    async getEventsByStatus(status: EventStatus, page: number = 0, size: number = 10) {
        return this.fetchWithError(`${API_URL}/eventos/status/${status}?page=${page}&size=${size}`);
    }

    async getStats(): Promise<{ PENDIENTE: number; RECIBIDO: number; CANCELADO: number }> {
        return this.fetchWithError(`${API_URL}/eventos/stats`);
    }

    async searchByEmail(email: string): Promise<EventRequest[]> {
        return this.fetchWithError(`${API_URL}/eventos/search?email=${encodeURIComponent(email)}`);
    }

    async checkAvailability(date: string): Promise<{ available: boolean; date: string }> {
        return this.fetchWithError(`${API_URL}/eventos/check-availability?date=${date}`);
    }
}

export const eventService = new EventService();