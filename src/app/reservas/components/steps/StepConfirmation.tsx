// src/app/reservas/components/steps/StepConfirmation.tsx
"use client";
import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";
import { PersonalData, Billing, Legal } from "../../hooks/useReserva";

interface Props {
    personalData: PersonalData;
    billing: Billing;
    legal: Legal;
    onUpdatePersonal: (field: keyof PersonalData, value: string) => void;
    onUpdateBilling: <K extends keyof Billing>(field: K, value: Billing[K]) => void;
    onUpdateLegal: (field: keyof Legal, value: boolean) => void;
    onNext: () => void;
    onPrev: () => void;
    canProceed: boolean;
}

export function StepConfirmation({
    personalData,
    billing,
    legal,
    onUpdatePersonal,
    onUpdateBilling,
    onUpdateLegal,
    onNext,
    onPrev,
    canProceed,
}: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-10"
        >
            <div className="text-center">
                <CreditCard className="w-12 h-12 text-amber-500 mx-auto mb-6" />
                <h2 className="text-4xl font-serif mb-4">Confirmación</h2>
                <p className="text-stone-400">Complete sus datos para finalizar la reserva.</p>
            </div>

            {/* Datos Personales */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm text-stone-400 mb-2">Nombres</label>
                    <input
                        type="text"
                        value={personalData.name}
                        onChange={(e) => onUpdatePersonal("name", e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm text-stone-400 mb-2">Apellidos</label>
                    <input
                        type="text"
                        value={personalData.lastName}
                        onChange={(e) => onUpdatePersonal("lastName", e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm text-stone-400 mb-2">Email</label>
                    <input
                        type="email"
                        value={personalData.email}
                        onChange={(e) => onUpdatePersonal("email", e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm text-stone-400 mb-2">Teléfono</label>
                    <input
                        type="tel"
                        value={personalData.phone}
                        onChange={(e) => onUpdatePersonal("phone", e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none"
                    />
                </div>
            </div>

            {/* Garantía */}
            <div className="p-6 bg-stone-900 border border-stone-800 rounded-xl">
                <h4 className="font-serif text-lg mb-2 text-amber-500">Garantía de Reserva</h4>
                <p className="text-sm text-stone-400 leading-relaxed">
                    Para asegurar su mesa, realizaremos una pre-aprobación de S/ 1.00 en su tarjeta, la cual será liberada tras su visita.
                    Puede cancelar sin costo con hasta 24 horas de anticipación.
                </p>
            </div>

            {/* Facturación */}
            <div className="border-t border-stone-800 pt-8">
                <h4 className="font-serif text-lg mb-4">Facturación</h4>
                <div className="flex gap-4 mb-6">
                    <button
                        onClick={() => onUpdateBilling("type", "DNI")}
                        className={`px-6 py-2 rounded-full border text-sm transition-colors ${billing.type === "DNI"
                            ? "bg-white text-black border-white"
                            : "border-stone-800 text-stone-400"
                            }`}
                    >
                        Boleta (DNI)
                    </button>
                    <button
                        onClick={() => onUpdateBilling("type", "Factura")}
                        className={`px-6 py-2 rounded-full border text-sm transition-colors ${billing.type === "Factura"
                            ? "bg-white text-black border-white"
                            : "border-stone-800 text-stone-400"
                            }`}
                    >
                        Factura (RUC)
                    </button>
                </div>

                {billing.type === "DNI" && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="grid md:grid-cols-2 gap-4"
                    >
                        <input
                            type="text"
                            placeholder="DNI"
                            value={billing.ruc}
                            onChange={(e) => onUpdateBilling("ruc", e.target.value)}
                            className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none"
                        />
                    </motion.div>
                )}

                {billing.type === "Factura" && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="grid md:grid-cols-2 gap-4"
                    >
                        <input
                            type="text"
                            placeholder="RUC"
                            value={billing.ruc}
                            onChange={(e) => onUpdateBilling("ruc", e.target.value)}
                            className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Razón Social"
                            value={billing.razonSocial}
                            onChange={(e) => onUpdateBilling("razonSocial", e.target.value)}
                            className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Dirección Fiscal"
                            value={billing.address}
                            onChange={(e) => onUpdateBilling("address", e.target.value)}
                            className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none"
                        />
                        <input
                            type="email"
                            placeholder="Email para Factura"
                            value={billing.email}
                            onChange={(e) => onUpdateBilling("email", e.target.value)}
                            className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none"
                        />
                    </motion.div>
                )}
            </div>

            {/* Legales */}
            <div className="space-y-3 pt-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={legal.mesa247}
                        onChange={(e) => onUpdateLegal("mesa247", e.target.checked)}
                        className="mt-1 accent-amber-500 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm text-stone-400 group-hover:text-stone-300 transition-colors">
                        Acepto los términos y condiciones y políticas de privacidad de MESA 24/7.
                    </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={legal.promo}
                        onChange={(e) => onUpdateLegal("promo", e.target.checked)}
                        className="mt-1 accent-amber-500 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm text-stone-400 group-hover:text-stone-300 transition-colors">
                        Doy mi consentimiento para recibir comunicaciones comerciales.
                    </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={legal.age}
                        onChange={(e) => onUpdateLegal("age", e.target.checked)}
                        className="mt-1 accent-amber-500 w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm text-stone-400 group-hover:text-stone-300 transition-colors">
                        Declaro ser mayor de 14 años.
                    </span>
                </label>
            </div>

            <div className="flex justify-between pt-8 border-t border-stone-800">
                <button
                    onClick={onPrev}
                    className="text-stone-400 hover:text-white uppercase tracking-widest text-sm transition-colors"
                >
                    Atrás
                </button>
                <button
                    onClick={onNext}
                    disabled={!canProceed}
                    className="bg-amber-500 text-black px-8 py-3 uppercase tracking-widest text-sm hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Confirmar Reserva
                </button>
            </div>
        </motion.div>
    );
}