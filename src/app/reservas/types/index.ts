// src/app/reservas/types/index.ts

export interface Customizations {
    allergies: string;
    requests: string;
    needs: string;
}

export interface PersonalData {
    name: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface Billing {
    type: "DNI" | "Factura";
    ruc: string;
    razonSocial: string;
    address: string;
    email: string;
}

export interface Legal {
    mesa247: boolean;
    promo: boolean;
    age: boolean;
}

export interface ReservationData {
    guests: number;
    date: Date | null;
    time: string;
    experience: string;
    customizations: Customizations;
    personalData: PersonalData;
    billing: Billing;
    legal: Legal;
}

export interface ReservationResponse {
    id: number;
    reservationCode: string;
    status: "PENDIENTE" | "CONFIRMADA" | "CANCELADA";
    createdAt: string;
}