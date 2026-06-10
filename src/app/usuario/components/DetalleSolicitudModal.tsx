// src/app/usuario/components/DetalleSolicitudModal.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Calendar, Tag, User, Hash, Clock, CheckCircle, XCircle, PlayCircle } from "lucide-react";
import { Solicitud, EstadoSolicitud } from "@/types/solicitud";
import { useSolicitudes } from "@/context/SolicitudContext";

interface DetalleSolicitudModalProps {
    isOpen: boolean;
    solicitud: Solicitud | null;
    onClose: () => void;
    onEstadoActualizado: () => void;
    canEdit: boolean;
}

const estadoColors: Record<EstadoSolicitud, string> = {
    PENDIENTE: "bg-yellow-500/15 text-yellow-400",
    EN_PROCESO: "bg-blue-500/15 text-blue-400",
    COMPLETADA: "bg-emerald-500/15 text-emerald-400",
    RECHAZADA: "bg-red-500/15 text-red-400",
};

const estadoLabels: Record<EstadoSolicitud, string> = {
    PENDIENTE: "Pendiente",
    EN_PROCESO: "En Proceso",
    COMPLETADA: "Completada",
    RECHAZADA: "Rechazada",
};

const tipoLabels: Record<string, string> = {
    SERVICIO: "Servicio",
    INFORMACION: "Información",
    ACCESO: "Acceso",
};

const prioridadLabels: Record<string, string> = {
    ALTA: "Alta",
    MEDIA: "Media",
    BAJA: "Baja",
};

export default function DetalleSolicitudModal({ isOpen, solicitud, onClose, onEstadoActualizado, canEdit }: DetalleSolicitudModalProps) {
    const { actualizarEstado, isLoading } = useSolicitudes();

    const handleCambiarEstado = async (nuevoEstado: EstadoSolicitud) => {
        if (solicitud && canEdit) {
            const result = await actualizarEstado(solicitud.id, nuevoEstado);
            if (result) {
                onEstadoActualizado();
            }
        }
    };

    if (!isOpen || !solicitud) return null;

    const getAccionesDisponibles = () => {
        const acciones = [];
        switch (solicitud.estado) {
            case "PENDIENTE":
                acciones.push({ estado: "EN_PROCESO", label: "Iniciar Proceso", icon: PlayCircle, color: "blue" });
                acciones.push({ estado: "RECHAZADA", label: "Rechazar", icon: XCircle, color: "red" });
                break;
            case "EN_PROCESO":
                acciones.push({ estado: "COMPLETADA", label: "Completar", icon: CheckCircle, color: "green" });
                acciones.push({ estado: "RECHAZADA", label: "Rechazar", icon: XCircle, color: "red" });
                break;
            case "RECHAZADA":
                acciones.push({ estado: "PENDIENTE", label: "Reabrir", icon: PlayCircle, color: "yellow" });
                break;
            default:
                break;
        }
        return acciones;
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-[#121214] border border-stone-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                >
                    {/* Header */}
                    <div className="sticky top-0 bg-[#121214] border-b border-stone-800 px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <h2 className="font-serif text-xl text-white">Detalle de Solicitud</h2>
                            <span className={`px-2 py-0.5 rounded text-xs uppercase tracking-widest ${estadoColors[solicitud.estado]}`}>
                                {estadoLabels[solicitud.estado]}
                            </span>
                        </div>
                        <button onClick={onClose} className="p-1 rounded hover:bg-stone-800 transition-colors">
                            <X className="w-5 h-5 text-stone-500" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Código y tipo */}
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="flex items-center gap-2 text-stone-500 text-xs uppercase tracking-widest mb-1">
                                    <Hash className="w-3 h-3" />
                                    Código de Ticket
                                </div>
                                <p className="text-white font-mono text-sm">{solicitud.codigoTicket}</p>
                            </div>
                            <div className="text-right">
                                <div className="text-stone-500 text-xs uppercase tracking-widest mb-1">Tipo</div>
                                <p className="text-white text-sm">{tipoLabels[solicitud.tipoSolicitud]}</p>
                            </div>
                        </div>

                        {/* Título */}
                        <div>
                            <h3 className="text-white font-serif text-xl">{solicitud.titulo}</h3>
                        </div>

                        {/* Descripción */}
                        <div>
                            <div className="text-stone-500 text-xs uppercase tracking-widest mb-2">Descripción</div>
                            <p className="text-stone-300 text-sm whitespace-pre-wrap">{solicitud.descripcion}</p>
                        </div>

                        {/* Metadatos */}
                        <div className="grid grid-cols-2 gap-4 p-4 bg-stone-900/30 rounded-lg">
                            <div>
                                <div className="flex items-center gap-1 text-stone-500 text-xs uppercase tracking-widest mb-1">
                                    <Clock className="w-3 h-3" />
                                    Fecha de Creación
                                </div>
                                <p className="text-white text-sm">{new Date(solicitud.fechaCreacion).toLocaleString("es-PE")}</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-1 text-stone-500 text-xs uppercase tracking-widest mb-1">
                                    <Tag className="w-3 h-3" />
                                    Prioridad
                                </div>
                                <p className="text-white text-sm">{prioridadLabels[solicitud.prioridad] || solicitud.prioridad}</p>
                            </div>
                            {solicitud.fechaVencimiento && (
                                <div>
                                    <div className="flex items-center gap-1 text-stone-500 text-xs uppercase tracking-widest mb-1">
                                        <Calendar className="w-3 h-3" />
                                        Fecha de Vencimiento
                                    </div>
                                    <p className="text-white text-sm">{new Date(solicitud.fechaVencimiento).toLocaleDateString("es-PE")}</p>
                                </div>
                            )}
                            {solicitud.slaFechaLimite && (
                                <div>
                                    <div className="flex items-center gap-1 text-stone-500 text-xs uppercase tracking-widest mb-1">
                                        <Clock className="w-3 h-3" />
                                        SLA Límite
                                    </div>
                                    <p className="text-white text-sm">{new Date(solicitud.slaFechaLimite).toLocaleString("es-PE")}</p>
                                </div>
                            )}
                            {solicitud.responsableAsignado && (
                                <div className="col-span-2">
                                    <div className="flex items-center gap-1 text-stone-500 text-xs uppercase tracking-widest mb-1">
                                        <User className="w-3 h-3" />
                                        Responsable Asignado
                                    </div>
                                    <p className="text-white text-sm">{solicitud.responsableAsignado}</p>
                                </div>
                            )}
                        </div>

                        {/* Labels */}
                        {solicitud.labels && solicitud.labels.length > 0 && (
                            <div>
                                <div className="text-stone-500 text-xs uppercase tracking-widest mb-2">Etiquetas</div>
                                <div className="flex flex-wrap gap-2">
                                    {solicitud.labels.map((label, idx) => (
                                        <span key={idx} className="bg-stone-800/50 px-2 py-1 rounded text-stone-400 text-xs">
                                            {label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Subtareas */}
                        {solicitud.subtareas && solicitud.subtareas.length > 0 && (
                            <div>
                                <div className="text-stone-500 text-xs uppercase tracking-widest mb-2">Subtareas</div>
                                <div className="space-y-2">
                                    {solicitud.subtareas.map((sub, idx) => (
                                        <div key={idx} className="p-3 bg-stone-900/30 rounded-lg">
                                            <p className="text-white text-sm font-medium">{sub.titulo}</p>
                                            <p className="text-stone-400 text-xs mt-1">{sub.descripcion}</p>
                                            {sub.prioridad && (
                                                <span className="inline-block mt-1 text-xs text-stone-500">Prioridad: {sub.prioridad}</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Ticket Jira */}
                        {solicitud.jiraTicketId && (
                            <div>
                                <div className="text-stone-500 text-xs uppercase tracking-widest mb-2">Ticket en Jira</div>
                                <a
                                    href={solicitud.jiraUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-[#C6A96B] hover:underline"
                                >
                                    {solicitud.jiraTicketId}
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        )}

                        {/* Acciones */}
                        {canEdit && getAccionesDisponibles().length > 0 && (
                            <div className="pt-4 border-t border-stone-800">
                                <div className="text-stone-500 text-xs uppercase tracking-widest mb-3">Acciones</div>
                                <div className="flex gap-3">
                                    {getAccionesDisponibles().map((accion) => (
                                        <button
                                            key={accion.estado}
                                            onClick={() => handleCambiarEstado(accion.estado as EstadoSolicitud)}
                                            disabled={isLoading}
                                            className={`flex items-center gap-2 px-4 py-2 rounded text-sm transition-colors ${accion.color === "blue" ? "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30" :
                                                accion.color === "green" ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" :
                                                    accion.color === "red" ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" :
                                                        "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                                                }`}
                                        >
                                            <accion.icon className="w-4 h-4" />
                                            {accion.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}