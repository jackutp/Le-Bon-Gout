// components/eventos/CotizacionForm.jsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function CotizacionForm() {
    const [formData, setFormData] = useState({
        name: "", lastName: "", phone: "", company: "", email: "", date: "", attendees: "", comments: ""
    });
    const [legal, setLegal] = useState({ age: false, privacy: false, marketing: false });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage({ type: "", text: "" });

        const payload = {
            name: formData.name,
            lastName: formData.lastName,
            phone: formData.phone,
            company: formData.company,
            email: formData.email,
            date: formData.date,
            attendees: parseInt(formData.attendees),
            comments: formData.comments,
            age: legal.age,
            privacy: legal.privacy,
            marketing: legal.marketing
        };

        try {
            const response = await fetch("http://localhost:8080/api/eventos/solicitud", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setSubmitMessage({ type: "success", text: "Solicitud enviada con éxito. Nos contactaremos pronto." });
                // Reset form
                setFormData({ name: "", lastName: "", phone: "", company: "", email: "", date: "", attendees: "", comments: "" });
                setLegal({ age: false, privacy: false, marketing: false });
            } else {
                const error = await response.json();
                setSubmitMessage({ type: "error", text: error.message || "Error al enviar. Intente nuevamente." });
            }
        } catch (error) {
            setSubmitMessage({ type: "error", text: "Error de conexión. Verifique su internet." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="bg-white py-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16">

                    {/* Columna Izquierda - Información */}
                    <div>
                        <h3 className="text-3xl font-serif text-stone-800 mb-6">Solo reservas de eventos</h3>
                        <p className="text-stone-500 leading-relaxed text-sm font-light">
                            Para consultas acerca de los salones privados, el jardín, la casona y el servicio de chef en casa,
                            escríbenos para ayudarte o llámanos al{" "}
                            <strong className="text-amber-700 font-medium">(+51) 959 844 946</strong>.
                        </p>
                    </div>

                    {/* Columna Derecha - Formulario minimalista */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Fila 1: Nombre + Apellido */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="group">
                                    <input
                                        type="text"
                                        placeholder="Nombre"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full border-b border-stone-300 pb-2 text-stone-800 placeholder:text-stone-400 focus:border-amber-500 outline-none transition-colors bg-transparent"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Apellido"
                                        required
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full border-b border-stone-300 pb-2 text-stone-800 placeholder:text-stone-400 focus:border-amber-500 outline-none transition-colors bg-transparent"
                                    />
                                </div>
                            </div>

                            {/* Fila 2: Celular + Empresa */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <input
                                        type="tel"
                                        placeholder="Celular"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full border-b border-stone-300 pb-2 text-stone-800 placeholder:text-stone-400 focus:border-amber-500 outline-none transition-colors bg-transparent"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Nombre de la empresa"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full border-b border-stone-300 pb-2 text-stone-800 placeholder:text-stone-400 focus:border-amber-500 outline-none transition-colors bg-transparent"
                                    />
                                </div>
                            </div>

                            {/* Fila 3: Correo + Fecha */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Correo electrónico"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full border-b border-stone-300 pb-2 text-stone-800 placeholder:text-stone-400 focus:border-amber-500 outline-none transition-colors bg-transparent"
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        type="date"
                                        placeholder="Fecha"
                                        required
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full border-b border-stone-300 pb-2 text-stone-800 placeholder:text-stone-400 focus:border-amber-500 outline-none transition-colors bg-transparent [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert-[0.3]"
                                    />
                                </div>
                            </div>

                            {/* Fila 4: Asistentes */}
                            <div>
                                <input
                                    type="number"
                                    placeholder="Número de asistentes"
                                    required
                                    min="1"
                                    value={formData.attendees}
                                    onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                                    className="w-full border-b border-stone-300 pb-2 text-stone-800 placeholder:text-stone-400 focus:border-amber-500 outline-none transition-colors bg-transparent"
                                />
                            </div>

                            {/* Fila 5: Comentarios */}
                            <div>
                                <textarea
                                    placeholder="Comentarios o requisitos especiales"
                                    required
                                    rows={4}
                                    value={formData.comments}
                                    onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                                    className="w-full border-b border-stone-300 pb-2 text-stone-800 placeholder:text-stone-400 focus:border-amber-500 outline-none transition-colors bg-transparent resize-none"
                                />
                            </div>

                            {/* Campos obligatorios */}
                            <p className="text-xs text-stone-400">*Campos obligatorios</p>

                            {/* Checkboxes */}
                            <div className="space-y-3">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        required
                                        checked={legal.age}
                                        onChange={(e) => setLegal({ ...legal, age: e.target.checked })}
                                        className="mt-0.5 w-4 h-4 accent-amber-600"
                                    />
                                    <span className="text-sm text-stone-600 group-hover:text-stone-800">Declaro que soy mayor de 18 años *</span>
                                </label>
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        required
                                        checked={legal.privacy}
                                        onChange={(e) => setLegal({ ...legal, privacy: e.target.checked })}
                                        className="mt-0.5 w-4 h-4 accent-amber-600"
                                    />
                                    <span className="text-sm text-stone-600 group-hover:text-stone-800">He leído y acepto las políticas de privacidad de datos *</span>
                                </label>
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={legal.marketing}
                                        onChange={(e) => setLegal({ ...legal, marketing: e.target.checked })}
                                        className="mt-0.5 w-4 h-4 accent-amber-600"
                                    />
                                    <span className="text-sm text-stone-600 group-hover:text-stone-800">Acepto el tratamiento de mis datos para fines publicitarios (Opcional)</span>
                                </label>
                            </div>

                            {/* Mensaje de estado */}
                            {submitMessage.text && (
                                <div className={`text-sm text-center p-3 rounded ${submitMessage.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                                    {submitMessage.text}
                                </div>
                            )}

                            {/* Botón píldora */}
                            <div className="flex justify-center pt-4">
                                <button
                                    type="submit"
                                    disabled={!legal.age || !legal.privacy || isSubmitting}
                                    className="px-12 py-3 rounded-full border border-stone-400 text-stone-700 uppercase text-xs tracking-widest font-serif hover:bg-stone-800 hover:text-white hover:border-stone-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "ENVIANDO..." : "SOLICITAR INFORMACIÓN"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}