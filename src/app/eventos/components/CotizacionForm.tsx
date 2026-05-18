// src/app/eventos/components/CotizacionForm.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { eventService } from "@/services/eventService";

export default function CotizacionForm() {
  const [formData, setFormData] = useState({
    name: "", lastName: "", phone: "", company: "", email: "", date: "", attendees: "", comments: ""
  });
  const [legal, setLegal] = useState({ age: false, privacy: false, marketing: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const validateDate = (date: string) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);

    if (selectedDate < today) {
      return "La fecha no puede ser anterior a hoy";
    }
    if (selectedDate > maxDate) {
      return "La fecha no puede superar los 3 meses desde hoy";
    }
    return null;
  };

  // ✅ NUEVA FUNCIÓN: Validar teléfono (9 dígitos)
  const validatePhone = (phone: string): string | null => {
    const cleanPhone = phone.replace(/\D/g, ''); // Eliminar todo excepto números
    if (cleanPhone.length === 0) {
      return "El número de celular es obligatorio";
    }
    if (cleanPhone.length !== 9) {
      return "El número de celular debe tener exactamente 9 dígitos";
    }
    return null;
  };

  // ✅ FUNCIÓN: Manejar cambio de teléfono (solo números, máximo 9)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permitir solo números
    const numericValue = value.replace(/\D/g, '');
    // Limitar a 9 dígitos
    const limitedValue = numericValue.slice(0, 9);
    setFormData({ ...formData, phone: limitedValue });
  };

  // ✅ NUEVA FUNCIÓN: Validar comentarios
  const validateComments = (comments: string): string | null => {
    const trimmedComments = comments.trim();
    if (trimmedComments.length === 0) {
      return "Los comentarios son obligatorios";
    }
    if (trimmedComments.length < 10) {
      return `Los comentarios deben tener al menos 10 caracteres (actual: ${trimmedComments.length}). Por favor, brinda más detalles sobre tu evento.`;
    }
    if (trimmedComments.length > 1000) {
      return `Los comentarios no pueden exceder los 1000 caracteres (actual: ${trimmedComments.length})`;
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar fecha
    const dateError = validateDate(formData.date);
    if (dateError) {
      setSubmitStatus({ type: 'error', message: dateError });
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    // ✅ AGREGAR: Validar teléfono antes de enviar
    const phoneError = validatePhone(formData.phone);
    if (phoneError) {
      setSubmitStatus({ type: 'error', message: phoneError });
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    // ✅ AGREGAR: Validar comentarios antes de enviar
    const commentsError = validateComments(formData.comments);
    if (commentsError) {
      setSubmitStatus({ type: 'error', message: commentsError });
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Verificar disponibilidad
      const availability = await eventService.checkAvailability(formData.date);
      if (!availability.available) {
        setSubmitStatus({ type: 'error', message: 'Lo sentimos, ya no hay disponibilidad para esta fecha' });
        setIsSubmitting(false);
        return;
      }

      // Enviar solicitud
      await eventService.createEvent({
        name: formData.name,
        lastName: formData.lastName,
        phone: formData.phone,
        company: formData.company || undefined,
        email: formData.email,
        date: formData.date,
        attendees: parseInt(formData.attendees),
        comments: formData.comments.trim(),
        ageConfirmed: legal.age,
        privacyAccepted: legal.privacy,
        marketingAccepted: legal.marketing
      });

      setSubmitStatus({ type: 'success', message: '¡Solicitud enviada con éxito! Te contactaremos pronto.' });

      // Resetear formulario
      setFormData({
        name: "", lastName: "", phone: "", company: "", email: "", date: "", attendees: "", comments: ""
      });
      setLegal({ age: false, privacy: false, marketing: false });

    } catch (error: any) {
      console.error("Error detallado:", error);

      // ✅ MEJORADO: Mostrar mensaje amigable según el error
      let userMessage = "Error al enviar la solicitud. Intenta nuevamente.";

      if (error.message?.includes("comentarios deben tener entre 10")) {
        userMessage = "Por favor, completa los comentarios con más detalles (mínimo 10 caracteres). Cuéntanos más sobre tu evento.";
      } else if (error.message?.includes("nombre debe tener entre")) {
        userMessage = "El nombre debe tener entre 2 y 100 caracteres.";
      } else if (error.message?.includes("apellido debe tener entre")) {
        userMessage = "El apellido debe tener entre 2 y 100 caracteres.";
      } else if (error.message?.includes("teléfono")) {
        userMessage = "El número de teléfono debe tener exactamente 9 dígitos.";
      } else if (error.message?.includes("email")) {
        userMessage = "El correo electrónico no es válido.";
      } else if (error.message?.includes("asistentes")) {
        userMessage = "El número de asistentes debe ser entre 1 y 500.";
      } else if (error.message) {
        userMessage = error.message;
      }

      setSubmitStatus({ type: 'error', message: userMessage });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  // Mostrar contador de caracteres para comentarios
  const commentLength = formData.comments.trim().length;
  const isCommentValid = commentLength >= 10 && commentLength <= 1000;
  const showCommentWarning = formData.comments.length > 0 && !isCommentValid;

  // ✅ Validar teléfono para el botón
  const isPhoneValid = formData.phone.length === 9;

  // Obtener fecha mínima (hoy) y máxima (3 meses)
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <section className="px-6 lg:px-12 py-24">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
        {/* Columna Izquierda - Información */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-stone-900/50 border border-stone-800 rounded-2xl p-8 lg:p-10 h-fit"
        >
          <h2 className="font-serif text-3xl lg:text-4xl text-amber-500 mb-4">Solo reservas de eventos</h2>
          <p className="text-stone-400 leading-relaxed text-base lg:text-lg space-y-4">
            Para consultas acerca de los salones privados, el jardín, la casona y el servicio de chef en casa, escríbenos para ayudarte o llámanos al:
          </p>
          <span className="text-amber-500 font-medium text-xl mt-2 block">(+51) 959 844 946</span>
          <p className="text-stone-500 text-sm mt-4 pt-4 border-t border-stone-800">
            Lunes a Domingo | 11:00 AM - 11:00 PM
          </p>

          {/* Info de fechas */}
          <div className="mt-6 p-4 bg-amber-500/5 border border-amber-500/20 rounded-lg">
            <p className="text-xs text-amber-500 mb-1">📅 Política de reservas</p>
            <p className="text-xs text-stone-400">
              Las reservas solo pueden realizarse con un máximo de 3 meses de anticipación.
            </p>
          </div>

          {/* ✅ NUEVO: Info sobre comentarios */}
          <div className="mt-4 p-3 bg-stone-800/30 rounded-lg">
            <p className="text-xs text-stone-400">
              💡 Los comentarios deben tener al menos 10 caracteres.
              Cuéntanos más sobre tu evento (tipo de evento, requisitos especiales, etc.)
            </p>
          </div>

          {/* ✅ NUEVO: Info sobre teléfono */}
          <div className="mt-4 p-3 bg-stone-800/30 rounded-lg">
            <p className="text-xs text-stone-400">
              📱 El número de celular debe tener exactamente 9 dígitos (ejemplo: 987654321)
            </p>
          </div>
        </motion.div>

        {/* Columna Derecha - Formulario Minimalista */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Toast de estado */}
          {submitStatus && (
            <div className={`mb-6 p-4 rounded-lg ${submitStatus.type === 'success'
              ? 'bg-green-500/20 border border-green-500/50 text-green-400'
              : 'bg-red-500/20 border border-red-500/50 text-red-400'
              }`}>
              {submitStatus.message}
            </div>
          )}

          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Fila 1 */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <input
                  id="name"
                  required
                  type="text"
                  placeholder="Nombre *"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="bg-black text-white border-b border-stone-700 pb-2 pt-4 placeholder:text-stone-500 focus:border-amber-500 outline-none transition-colors w-full"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <input
                  id="lastName"
                  required
                  type="text"
                  placeholder="Apellido *"
                  value={formData.lastName}
                  onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  className="bg-black text-white border-b border-stone-700 pb-2 pt-4 placeholder:text-stone-500 focus:border-amber-500 outline-none transition-colors w-full"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Fila 2 */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <input
                  id="phone"
                  required
                  type="tel"
                  inputMode="numeric"
                  pattern="\d{9}"
                  placeholder="Celular *"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className={`bg-black text-white border-b pb-2 pt-4 placeholder:text-stone-500 focus:border-amber-500 outline-none transition-colors w-full ${formData.phone.length > 0 && formData.phone.length !== 9 ? 'border-red-500/50' : 'border-stone-700'
                    }`}
                  disabled={isSubmitting}
                />
                {/* Indicador visual de validación del teléfono */}
                {formData.phone.length > 0 && (
                  <p className={`text-xs mt-1 ${formData.phone.length === 9 ? 'text-green-400' : 'text-red-400'}`}>
                    {formData.phone.length === 9 ? '✅ Válido' : `❌ Debe tener 9 dígitos (actual: ${formData.phone.length})`}
                  </p>
                )}
              </div>
              <div>
                <input
                  id="company"
                  required
                  type="text"
                  placeholder="Empresa *"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  className="bg-black text-white border-b border-stone-700 pb-2 pt-4 placeholder:text-stone-500 focus:border-amber-500 outline-none transition-colors w-full"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Fila 3 */}
            <div className="grid grid-cols-2 gap-6">
              <div className="relative">
                <input
                  id="email"
                  required
                  type="email"
                  placeholder="Correo *"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="bg-black text-white border-b border-stone-700 pb-2 pt-4 placeholder:text-stone-500 focus:border-amber-500 outline-none transition-colors w-full"
                  disabled={isSubmitting}
                />
              </div>
              <div className="relative">
                <input
                  id="date"
                  required
                  type="date"
                  min={today}
                  max={maxDateStr}
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="bg-black text-white border-b border-stone-700 pb-2 pt-4 placeholder:text-stone-500 focus:border-amber-500 outline-none transition-colors w-full [color-scheme:dark]"
                  disabled={isSubmitting}
                />
                <p className="text-xs text-stone-500 mt-1">
                  Máximo 3 meses de anticipación
                </p>
              </div>
            </div>

            {/* Fila 4 */}
            <div>
              <input
                id="attendees"
                required
                type="number"
                min="1"
                max="500"
                placeholder="Número de asistentes *"
                value={formData.attendees}
                onChange={e => setFormData({ ...formData, attendees: e.target.value })}
                className="bg-black text-white border-b border-stone-700 pb-2 pt-4 placeholder:text-stone-500 focus:border-amber-500 outline-none transition-colors w-full"
                disabled={isSubmitting}
              />
            </div>

            {/* Fila 5 - Comentarios con contador y validación visual */}
            <div>
              <textarea
                id="comments"
                required
                rows={4}
                placeholder="Comentarios *"
                value={formData.comments}
                onChange={e => setFormData({ ...formData, comments: e.target.value })}
                className={`bg-black text-white border-b pb-2 pt-4 placeholder:text-stone-500 focus:border-amber-500 outline-none transition-colors w-full resize-none ${showCommentWarning ? 'border-red-500/50' : 'border-stone-700'
                  }`}
                disabled={isSubmitting}
              />
              {/* Contador de caracteres */}
              <div className="flex justify-between mt-1">
                <p className={`text-xs ${showCommentWarning ? 'text-red-400' : 'text-stone-500'}`}>
                  {commentLength} / 1000 caracteres
                </p>
                {commentLength > 0 && commentLength < 10 && (
                  <p className="text-xs text-red-400">
                    ❌ Faltan {10 - commentLength} caracteres
                  </p>
                )}
                {commentLength >= 10 && commentLength <= 1000 && (
                  <p className="text-xs text-green-400">
                    ✅ Válido
                  </p>
                )}
              </div>
            </div>

            <p className="mt-6 text-right text-xs text-stone-500">*Campos obligatorios</p>

            <div className="space-y-3 mt-6">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  checked={legal.age}
                  onChange={e => setLegal({ ...legal, age: e.target.checked })}
                  className="accent-amber-500 w-4 h-4 cursor-pointer"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-stone-400 group-hover:text-stone-300 transition-colors">Declaro que soy mayor de 18 años *</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  checked={legal.privacy}
                  onChange={e => setLegal({ ...legal, privacy: e.target.checked })}
                  className="accent-amber-500 w-4 h-4 cursor-pointer"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-stone-400 group-hover:text-stone-300 transition-colors">He leído y acepto las políticas de privacidad de datos *</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={legal.marketing}
                  onChange={e => setLegal({ ...legal, marketing: e.target.checked })}
                  className="accent-amber-500 w-4 h-4 cursor-pointer"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-stone-400 group-hover:text-stone-300 transition-colors">Acepto el tratamiento de mis datos para fines publicitarios (Opcional)</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={!legal.age || !legal.privacy || isSubmitting || !isCommentValid || !isPhoneValid}
              className="mx-auto block mt-8 rounded-full bg-transparent border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black px-8 py-3 uppercase font-serif tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Solicitar Información'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}