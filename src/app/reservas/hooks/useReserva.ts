// src/app/reservas/hooks/useReserva.ts

"use client";

import { useState } from "react";

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

const initialState: ReservationData = {
    guests: 2,
    date: null,
    time: "",
    experience: "",
    customizations: { allergies: "", requests: "", needs: "" },
    personalData: { name: "", lastName: "", email: "", phone: "" },
    billing: { type: "DNI", ruc: "", razonSocial: "", address: "", email: "" },
    legal: { mesa247: false, promo: false, age: false },
};

export function useReserva() {
    const [reservation, setReservation] = useState<ReservationData>(initialState);
    const [currentStep, setCurrentStep] = useState(1);

    const updateReservation = <K extends keyof ReservationData>(
        field: K,
        value: ReservationData[K]
    ) => {
        setReservation((prev) => ({ ...prev, [field]: value }));
    };

    const updateNestedField = <T extends keyof ReservationData>(
        parent: T,
        field: string,
        value: any
    ) => {
        setReservation((prev) => ({
            ...prev,
            [parent]: { ...(prev[parent] as any), [field]: value },
        }));
    };

    const nextStep = () => setCurrentStep((s) => Math.min(7, s + 1));
    const prevStep = () => setCurrentStep((s) => Math.max(1, s - 1));
    const goToStep = (step: number) => setCurrentStep(step);

    const canProceed = (step: number): boolean => {
        switch (step) {
            case 1:
                return reservation.guests <= 9;
            case 2:
                return reservation.date !== null;
            case 3:
                return reservation.time !== "";
            case 4:
                return reservation.experience !== "";
            case 6:
                return (
                    reservation.legal.mesa247 &&
                    reservation.legal.age &&
                    !!reservation.personalData.name &&
                    !!reservation.personalData.email
                );
            default:
                return true;
        }
    };

    const resetReservation = () => {
        setReservation(initialState);
        setCurrentStep(1);
    };

    return {
        reservation,
        currentStep,
        updateReservation,
        updateNestedField,
        nextStep,
        prevStep,
        goToStep,
        canProceed,
        resetReservation,
    };
}