"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, User, Calendar as CalendarIcon, Clock, Utensils, CreditCard, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ReservasPage() {
  const [step, setStep] = useState(1);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [experience, setExperience] = useState("");
  const [customizations, setCustomizations] = useState({ allergies: "", requests: "", needs: "" });
  const [personalData, setPersonalData] = useState({ name: "", lastName: "", email: "", phone: "" });
  const [billing, setBilling] = useState({ type: "DNI", ruc: "", razonSocial: "", address: "", email: "" });
  const [legal, setLegal] = useState({ mesa247: false, promo: false, age: false });

  // Calendar logic
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date();
  maxDate.setMonth(today.getMonth() + 4);

  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
  const firstDay = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());

  const prevMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    if (newMonth >= new Date(today.getFullYear(), today.getMonth(), 1)) {
      setCurrentMonth(newMonth);
    }
  };

  const nextMonth = () => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    if (newMonth <= maxDate) {
      setCurrentMonth(newMonth);
    }
  };

  // Time generator
  const generateTimes = () => {
    const times = [];
    for (let h = 7; h <= 23; h++) {
      for (let m = 0; m < 60; m += 15) {
        times.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
      }
    }
    return times;
  };

  const nextStep = () => setStep((s) => Math.min(7, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-700 selection:text-white pb-20">
      {/* Header */}
      <header className="px-6 py-8 border-b border-white/10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver al Inicio
        </Link>
        <div className="text-xl font-serif tracking-widest uppercase text-amber-500">
          Le Bon Goût
        </div>
        <div className="w-24"></div> {/* Spacer for centering */}
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-16">
        {step < 7 && (
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <span className="text-amber-500 tracking-widest uppercase text-sm">Paso {step} de 6</span>
              <span className="text-stone-500 text-sm">Reserva Exclusiva</span>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <motion.div
                className="bg-amber-500 h-full"
                initial={{ width: 0 }}
                animate={{ width: `${(step / 6) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-10">
              <div className="text-center">
                <User className="w-12 h-12 text-amber-500 mx-auto mb-6" />
                <h2 className="text-4xl font-serif mb-4">¿Cuántos comensales?</h2>
                <p className="text-stone-400">Seleccione la cantidad de personas para su experiencia.</p>
              </div>

              <div className="flex items-center justify-center gap-8">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-16 h-16 rounded-full border border-stone-800 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-colors text-2xl"
                >
                  -
                </button>
                <span className="text-6xl font-serif w-24 text-center">{guests}</span>
                <button
                  onClick={() => setGuests(guests + 1)}
                  className="w-16 h-16 rounded-full border border-stone-800 flex items-center justify-center hover:border-amber-500 hover:text-amber-500 transition-colors text-2xl"
                >
                  +
                </button>
              </div>

              {guests > 9 && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center">
                  <p className="text-amber-500 text-sm">
                    Para reservas de 9 o más comensales por favor comuníquese con nosotros a <strong>lebon@gmail.com</strong> o al <strong>+51 1 4422777</strong>.
                  </p>
                </motion.div>
              )}

              <div className="flex justify-end pt-8">
                <button
                  onClick={nextStep}
                  disabled={guests > 9}
                  className="bg-amber-500 text-black px-8 py-3 uppercase tracking-widest text-sm hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-10">
              <div className="text-center">
                <CalendarIcon className="w-12 h-12 text-amber-500 mx-auto mb-6" />
                <h2 className="text-4xl font-serif mb-4">Fecha de la Reserva</h2>
                <p className="text-stone-400">Seleccione el día de su preferencia.</p>
              </div>

              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <button onClick={prevMonth} className="p-2 hover:text-amber-500 transition-colors"><ChevronLeft /></button>
                  <span className="text-xl font-serif capitalize">
                    {currentMonth.toLocaleString("es-ES", { month: "long", year: "numeric" })}
                  </span>
                  <button onClick={nextMonth} className="p-2 hover:text-amber-500 transition-colors"><ChevronRight /></button>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                    <div key={day} className="text-center text-stone-500 text-xs tracking-widest uppercase py-2">{day}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const thisDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                    const isPast = thisDate < today;
                    const isSelected = date?.getTime() === thisDate.getTime();

                    return (
                      <button
                        key={day}
                        disabled={isPast}
                        onClick={() => setDate(thisDate)}
                        className={`aspect-square rounded-full flex items-center justify-center text-sm transition-all
                          ${isPast ? "opacity-20 cursor-not-allowed" : "hover:bg-stone-800"}
                          ${isSelected ? "bg-amber-500 text-black font-medium hover:bg-amber-400" : ""}
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between pt-8">
                <button onClick={prevStep} className="text-stone-400 hover:text-white uppercase tracking-widest text-sm transition-colors">Atrás</button>
                <button
                  onClick={nextStep}
                  disabled={!date}
                  className="bg-amber-500 text-black px-8 py-3 uppercase tracking-widest text-sm hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-10">
              <div className="text-center">
                <Clock className="w-12 h-12 text-amber-500 mx-auto mb-6" />
                <h2 className="text-4xl font-serif mb-4">Hora de la Reserva</h2>
                <p className="text-stone-400">Seleccione la hora de llegada.</p>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 h-80 overflow-y-auto pr-2 custom-scrollbar">
                {generateTimes().map(t => (
                  <button
                    key={t}
                    onClick={() => setTime(t)}
                    className={`py-3 rounded-lg border text-sm transition-colors
                      ${time === t ? "border-amber-500 bg-amber-500/10 text-amber-500" : "border-stone-800 hover:border-stone-600 text-stone-300"}
                    `}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-8 border-t border-stone-800">
                <button onClick={prevStep} className="text-stone-400 hover:text-white uppercase tracking-widest text-sm transition-colors">Atrás</button>
                <button
                  onClick={nextStep}
                  disabled={!time}
                  className="bg-amber-500 text-black px-8 py-3 uppercase tracking-widest text-sm hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-10">
              <div className="text-center">
                <Utensils className="w-12 h-12 text-amber-500 mx-auto mb-6" />
                <h2 className="text-4xl font-serif mb-4">Experiencia</h2>
                <p className="text-stone-400">Seleccione el tipo de experiencia culinaria.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <button
                  onClick={() => setExperience("A la carta")}
                  className={`text-left p-8 rounded-2xl border transition-all ${experience === "A la carta" ? "border-amber-500 bg-amber-500/5" : "border-stone-800 hover:border-stone-600"}`}
                >
                  <h3 className="text-2xl font-serif mb-3">A la carta</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">Disfrute de la libertad de elegir entre nuestras creaciones exclusivas de temporada.</p>
                </button>

                <button
                  onClick={() => setExperience("Degustación")}
                  className={`text-left p-8 rounded-2xl border transition-all ${experience === "Degustación" ? "border-amber-500 bg-amber-500/5" : "border-stone-800 hover:border-stone-600"}`}
                >
                  <h3 className="text-2xl font-serif mb-3">Menú Degustación</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">Una inmersión guiada por nuestro chef a través de 8 tiempos de alta gastronomía.</p>
                </button>
              </div>

              <div className="flex justify-between pt-8">
                <button onClick={prevStep} className="text-stone-400 hover:text-white uppercase tracking-widest text-sm transition-colors">Atrás</button>
                <button
                  onClick={nextStep}
                  disabled={!experience}
                  className="bg-amber-500 text-black px-8 py-3 uppercase tracking-widest text-sm hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continuar
                </button>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="step5" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-8">
              <div className="text-center mb-10">
                <h2 className="text-4xl font-serif mb-4">Personalización</h2>
                <p className="text-stone-400">Ayúdenos a preparar todo para su visita.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm uppercase tracking-widest text-stone-400 mb-2">1. Alergias / Restricciones</label>
                  <textarea
                    value={customizations.allergies}
                    onChange={(e) => setCustomizations({ ...customizations, allergies: e.target.value })}
                    placeholder="Ej. Alergia al maní, celíaco, vegetariano..."
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg p-4 text-white focus:outline-none focus:border-amber-500 transition-colors resize-none h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-widest text-stone-400 mb-2">2. Requerimientos Especiales</label>
                  <textarea
                    value={customizations.requests}
                    onChange={(e) => setCustomizations({ ...customizations, requests: e.target.value })}
                    placeholder="Ej. Aniversario, cumpleaños, mesa cerca a la ventana..."
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg p-4 text-white focus:outline-none focus:border-amber-500 transition-colors resize-none h-24"
                  />
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-widest text-stone-400 mb-2">3. Necesidades Adicionales</label>
                  <textarea
                    value={customizations.needs}
                    onChange={(e) => setCustomizations({ ...customizations, needs: e.target.value })}
                    placeholder="Silla de ruedas, cochecito de bebé..."
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg p-4 text-white focus:outline-none focus:border-amber-500 transition-colors resize-none h-24"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-8">
                <button onClick={prevStep} className="text-stone-400 hover:text-white uppercase tracking-widest text-sm transition-colors">Atrás</button>
                <button
                  onClick={nextStep}
                  className="bg-amber-500 text-black px-8 py-3 uppercase tracking-widest text-sm hover:bg-amber-400 transition-colors"
                >
                  Continuar
                </button>
              </div>
            </motion.div>
          )}

          {step === 6 && (
            <motion.div key="step6" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-10">
              <div className="text-center">
                <CreditCard className="w-12 h-12 text-amber-500 mx-auto mb-6" />
                <h2 className="text-4xl font-serif mb-4">Confirmación</h2>
                <p className="text-stone-400">Complete sus datos para finalizar la reserva.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-stone-400 mb-2">Nombres</label>
                  <input type="text" value={personalData.name} onChange={e => setPersonalData({ ...personalData, name: e.target.value })} className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-stone-400 mb-2">Apellidos</label>
                  <input type="text" value={personalData.lastName} onChange={e => setPersonalData({ ...personalData, lastName: e.target.value })} className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-stone-400 mb-2">Email</label>
                  <input type="email" value={personalData.email} onChange={e => setPersonalData({ ...personalData, email: e.target.value })} className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm text-stone-400 mb-2">Teléfono</label>
                  <input type="tel" value={personalData.phone} onChange={e => setPersonalData({ ...personalData, phone: e.target.value })} className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none" />
                </div>
              </div>

              {/* Garantía */}
              <div className="p-6 bg-stone-900 border border-stone-800 rounded-xl">
                <h4 className="font-serif text-lg mb-2 text-amber-500">Garantía de Reserva</h4>
                <p className="text-sm text-stone-400 leading-relaxed">
                  Para asegurar su mesa, realizaremos una pre-aprobación de S/ 1.00 en su tarjeta, la cual será liberada tras su visita. Puede cancelar sin costo con hasta 24 horas de anticipación.
                </p>
              </div>

              {/* Facturación */}
              <div className="border-t border-stone-800 pt-8">
                <h4 className="font-serif text-lg mb-4">Facturación</h4>
                <div className="flex gap-4 mb-6">
                  <button onClick={() => setBilling({ ...billing, type: "DNI" })} className={`px-6 py-2 rounded-full border text-sm transition-colors ${billing.type === "DNI" ? "bg-white text-black border-white" : "border-stone-800 text-stone-400"}`}>Boleta (DNI)</button>
                  <button onClick={() => setBilling({ ...billing, type: "Factura" })} className={`px-6 py-2 rounded-full border text-sm transition-colors ${billing.type === "Factura" ? "bg-white text-black border-white" : "border-stone-800 text-stone-400"}`}>Factura (RUC)</button>
                </div>

                {billing.type === "DNI" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="grid md:grid-cols-2 gap-4">
                    <input type="text" placeholder="DNI" value={billing.ruc} onChange={e => setBilling({ ...billing, ruc: e.target.value })} className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none" />
                  </motion.div>
                )}
                {billing.type === "Factura" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="grid md:grid-cols-2 gap-4">
                    <input type="text" placeholder="RUC" value={billing.ruc} onChange={e => setBilling({ ...billing, ruc: e.target.value })} className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none" />
                    <input type="text" placeholder="Razón Social" value={billing.razonSocial} onChange={e => setBilling({ ...billing, razonSocial: e.target.value })} className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none" />
                    <input type="text" placeholder="Dirección Fiscal" value={billing.address} onChange={e => setBilling({ ...billing, address: e.target.value })} className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none" />
                    <input type="email" placeholder="Email para Factura" value={billing.email} onChange={e => setBilling({ ...billing, email: e.target.value })} className="w-full bg-stone-900 border border-stone-800 rounded-lg p-3 text-white focus:border-amber-500 outline-none" />
                  </motion.div>
                )}
              </div>

              {/* Legales */}
              <div className="space-y-3 pt-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" checked={legal.mesa247} onChange={e => setLegal({ ...legal, mesa247: e.target.checked })} className="mt-1 accent-amber-500 w-4 h-4 cursor-pointer" />
                  <span className="text-sm text-stone-400 group-hover:text-stone-300 transition-colors">Acepto los términos y condiciones y políticas de privacidad de MESA 24/7.</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" checked={legal.promo} onChange={e => setLegal({ ...legal, promo: e.target.checked })} className="mt-1 accent-amber-500 w-4 h-4 cursor-pointer" />
                  <span className="text-sm text-stone-400 group-hover:text-stone-300 transition-colors">Doy mi consentimiento para recibir comunicaciones comerciales.</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" checked={legal.age} onChange={e => setLegal({ ...legal, age: e.target.checked })} className="mt-1 accent-amber-500 w-4 h-4 cursor-pointer" />
                  <span className="text-sm text-stone-400 group-hover:text-stone-300 transition-colors">Declaro ser mayor de 14 años.</span>
                </label>
              </div>

              <div className="flex justify-between pt-8 border-t border-stone-800">
                <button onClick={prevStep} className="text-stone-400 hover:text-white uppercase tracking-widest text-sm transition-colors">Atrás</button>
                <button
                  onClick={nextStep}
                  disabled={!legal.mesa247 || !legal.age || !personalData.name || !personalData.email}
                  className="bg-amber-500 text-black px-8 py-3 uppercase tracking-widest text-sm hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirmar Reserva
                </button>
              </div>
            </motion.div>
          )}

          {step === 7 && (
            <motion.div key="step7" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
              >
                <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-8" />
              </motion.div>
              <h2 className="text-5xl font-serif mb-6 text-white">Reserva Concluida</h2>
              <p className="text-stone-400 text-lg mb-10 max-w-md mx-auto">
                Le hemos enviado un correo con la confirmación. Lo esperamos en Le Bon Goût para una experiencia inolvidable.
              </p>

              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8 inline-block text-left min-w-[300px]">
                <div className="mb-4">
                  <span className="text-stone-500 text-xs uppercase tracking-widest block mb-1">Fecha y Hora</span>
                  <p className="text-white font-medium">{date?.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} a las {time}</p>
                </div>
                <div className="mb-4">
                  <span className="text-stone-500 text-xs uppercase tracking-widest block mb-1">Invitados</span>
                  <p className="text-white font-medium">{guests} Comensales</p>
                </div>
                <div>
                  <span className="text-stone-500 text-xs uppercase tracking-widest block mb-1">Experiencia</span>
                  <p className="text-white font-medium">{experience}</p>
                </div>
              </div>

              <div className="mt-12">
                <Link href="/" className="border border-white/20 text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors">
                  Volver al Inicio
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1c1917; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #44403c; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #78716c; 
        }
      `}</style>
    </div>
  );
}
