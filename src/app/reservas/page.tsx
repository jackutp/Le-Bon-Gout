// src/app/reservas/page.tsx

"use client";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useReserva } from "./hooks/useReserva";
import { reservaService } from "@/services/reservaService";  // ← Agregar
import { ProgressBar } from "./components/ProgressBar";
import { StepGuests } from "./components/steps/StepGuests";
import { StepDate } from "./components/steps/StepDate";
import { StepTime } from "./components/steps/StepTime";
import { StepExperience } from "./components/steps/StepExperience";
import { StepCustomizations } from "./components/steps/StepCustomizations";
import { StepConfirmation } from "./components/steps/StepConfirmation";
import { StepSuccess } from "./components/steps/StepSuccess";
import { useState } from "react";

export default function ReservasPage() {
  const {
    reservation,
    currentStep,
    updateReservation,
    updateNestedField,
    nextStep,
    prevStep,
    canProceed,
    resetReservation,
  } = useReserva();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationCode, setReservationCode] = useState<string | undefined>();

  const handleSubmitReservation = async () => {
    setIsSubmitting(true);

    try {
      // Formatear la fecha para el backend (YYYY-MM-DD)
      const fechaStr = reservation.date ? reservation.date.toISOString().split('T')[0] : '';

      const reserva = await reservaService.crearReserva({
        nombre: reservation.personalData.name,
        apellido: reservation.personalData.lastName,
        email: reservation.personalData.email,
        telefono: reservation.personalData.phone,
        fecha: fechaStr,
        hora: reservation.time,
        personas: reservation.guests,
        experiencia: reservation.experience,
        alergias: reservation.customizations.allergies,
        requerimientos: reservation.customizations.requests,
        necesidades: reservation.customizations.needs,
      });

      setReservationCode(reserva.codigo);
      nextStep(); // Ir al paso de éxito
    } catch (error) {
      console.error("Error al crear reserva:", error);
      alert("Error al crear la reserva. Intente nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-700 selection:text-white pb-20">
      <header className="px-6 py-8 border-b border-white/10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </Link>
        <div className="text-xl font-serif tracking-widest uppercase text-amber-500">
          Le Bon Goût
        </div>
        <div className="w-24"></div>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-16">
        {currentStep < 7 && <ProgressBar currentStep={currentStep} />}

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <StepGuests
              guests={reservation.guests}
              onUpdate={(guests) => updateReservation("guests", guests)}
              onNext={nextStep}
            />
          )}

          {currentStep === 2 && (
            <StepDate
              selectedDate={reservation.date}
              onUpdate={(date) => updateReservation("date", date)}
              onNext={nextStep}
              onPrev={prevStep}
              canProceed={canProceed(2)}
            />
          )}

          {currentStep === 3 && (
            <StepTime
              selectedTime={reservation.time}
              onUpdate={(time) => updateReservation("time", time)}
              onNext={nextStep}
              onPrev={prevStep}
              canProceed={canProceed(3)}
            />
          )}

          {currentStep === 4 && (
            <StepExperience
              selectedExperience={reservation.experience}
              onUpdate={(experience) => updateReservation("experience", experience)}
              onNext={nextStep}
              onPrev={prevStep}
              canProceed={canProceed(4)}
            />
          )}

          {currentStep === 5 && (
            <StepCustomizations
              customizations={reservation.customizations}
              onUpdate={(field, value) => updateNestedField("customizations", field, value)}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}

          {currentStep === 6 && (
            <StepConfirmation
              personalData={reservation.personalData}
              billing={reservation.billing}
              legal={reservation.legal}
              onUpdatePersonal={(field, value) => updateNestedField("personalData", field, value)}
              onUpdateBilling={(field, value) => updateNestedField("billing", field, value)}
              onUpdateLegal={(field, value) => updateNestedField("legal", field, value)}
              onNext={handleSubmitReservation}
              onPrev={prevStep}
              canProceed={canProceed(6)}
            />
          )}

          {currentStep === 7 && (
            <StepSuccess
              guests={reservation.guests}
              date={reservation.date}
              time={reservation.time}
              experience={reservation.experience}
              reservationCode={reservationCode}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}