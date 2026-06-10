// src/types/solicitud.ts

export type TipoSolicitud = 'SERVICIO' | 'INFORMACION' | 'ACCESO';
export type EstadoSolicitud = 'PENDIENTE' | 'EN_PROCESO' | 'COMPLETADA' | 'RECHAZADA';
export type PrioridadJira = 'Highest' | 'High' | 'Medium' | 'Low' | 'Lowest';
export type PrioridadLocal = 'ALTA' | 'MEDIA' | 'BAJA';

export interface Subtarea {
    titulo: string;
    descripcion: string;
    prioridad?: PrioridadJira;
}

export interface Solicitud {
    id: number;
    codigoTicket: string;
    titulo: string;
    descripcion: string;
    tipoSolicitud: TipoSolicitud;
    estado: EstadoSolicitud;
    prioridad: PrioridadLocal;
    fechaVencimiento?: string;
    slaFechaLimite?: string;
    usuarioSolicitante?: string;
    areaSolicitante?: string;
    responsableAsignado?: string;
    fechaAsignacion?: string;
    fechaResolucion?: string;
    resolucion?: string;
    jiraTicketId?: string;
    jiraUrl?: string;
    labels?: string[];
    subtareas?: Subtarea[];
    fechaCreacion: string;
    fechaActualizacion: string;
}

export interface CrearSolicitudDTO {
    tipoSolicitud: TipoSolicitud;
    titulo: string;
    descripcion: string;
    prioridad?: PrioridadJira;
    fechaVencimiento?: string;
    labels?: string[];
    assignee?: string;
    subtareas?: Subtarea[];
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface EstadisticasSolicitudes {
    total: number;
    pendientes: number;
    en_proceso: number;
    completadas: number;
    rechazadas: number;
    por_tipo: {
        servicio: number;
        informacion: number;
        acceso: number;
    };
}