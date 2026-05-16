// src/app/admin/components/EventsView.tsx
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { X, MessageSquare, Trash2, Check, AlertCircle, RefreshCw } from "lucide-react";
import { useEvents } from "@/context/EventContext";
import { EventStatus } from "@/services/eventService";

// Utilidades
const getStatusStyles = (status: EventStatus) => {
  const styles = {
    PENDIENTE: "border-amber-500/50 text-amber-500 bg-amber-500/5",
    RECIBIDO: "border-green-500/50 text-green-500 bg-green-500/5",
    CANCELADO: "border-red-500/50 text-red-500 bg-red-500/5"
  };
  return styles[status];
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

// Componente de Fila de Evento
const EventRow = ({
  event,
  onUpdateStatus,
  onDelete,
  onViewComments,
  isUpdating
}: {
  event: any;
  onUpdateStatus: (id: number, status: EventStatus) => void;
  onDelete: (id: number) => void;
  onViewComments: (comments: string) => void;
  isUpdating: boolean;
}) => {
  const statusStyles = getStatusStyles(event.status);

  return (
    <tr className="border-b border-stone-800/50 hover:bg-stone-900/30 transition-colors group">
      <td className="px-4 py-3 text-stone-200 font-medium">
        {event.name} {event.lastName}
      </td>
      <td className="px-4 py-3">
        <p className="text-stone-300">{event.phone}</p>
        <p className="text-xs text-stone-500">{event.email}</p>
      </td>
      <td className="px-4 py-3 text-stone-400">
        {event.company || "—"}
      </td>
      <td className="px-4 py-3 text-stone-200">
        {formatDate(event.date)}
      </td>
      <td className="px-4 py-3 text-center">
        <span className="inline-flex items-center justify-center bg-stone-800/50 px-2 py-1 rounded text-sm">
          {event.attendees}
        </span>
      </td>
      <td className="px-4 py-3">
        <select
          value={event.status}
          onChange={(e) => onUpdateStatus(event.id, e.target.value as EventStatus)}
          disabled={isUpdating}
          className={`bg-stone-900 border text-xs rounded px-2 py-1.5 outline-none transition-all cursor-pointer hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed ${statusStyles}`}
          aria-label={`Estado del evento de ${event.name}`}
        >
          <option value="PENDIENTE" className="text-amber-500 bg-stone-900">PENDIENTE</option>
          <option value="RECIBIDO" className="text-green-500 bg-stone-900">RECIBIDO</option>
          <option value="CANCELADO" className="text-red-500 bg-stone-900">CANCELADO</option>
        </select>
      </td>
      <td className="px-4 py-3 text-center">
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onViewComments(event.comments)}
            className="text-stone-400 hover:text-[#C6A96B] transition-all inline-flex items-center gap-1.5 text-xs border border-stone-700 hover:border-[#C6A96B] px-3 py-1.5 rounded hover:scale-105 active:scale-95"
            aria-label="Ver comentarios"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Comentarios</span>
          </button>
          <button
            onClick={() => onDelete(event.id)}
            disabled={isUpdating}
            className="text-stone-400 hover:text-red-500 transition-all inline-flex items-center gap-1 text-xs border border-stone-700 hover:border-red-500 px-2 py-1.5 rounded hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Eliminar evento"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

// Componente Modal de Comentarios
const CommentsModal = ({ comments, onClose }: { comments: string | null; onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (modalRef.current) {
      const focusable = modalRef.current.querySelectorAll('button, [href], input, select, textarea');
      if (focusable.length) (focusable[0] as HTMLElement).focus();
    }
  }, []);

  if (!comments) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Comentarios del evento"
    >
      <div
        ref={modalRef}
        className="bg-[#121214] border border-stone-800 rounded-xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-500 hover:text-white transition-colors p-1 rounded hover:bg-stone-800"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-xl font-serif text-[#C6A96B] mb-2">Detalles del Evento</h3>
        <p className="text-xs text-stone-500 mb-6">Comentarios adicionales</p>
        <div className="bg-stone-900/50 rounded-lg p-4 border border-stone-800">
          <p className="text-stone-300 leading-relaxed whitespace-pre-wrap">{comments}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded border border-stone-700 text-stone-300 hover:text-black hover:bg-stone-300 transition-colors text-sm uppercase tracking-widest font-medium"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

// Componente Principal
export function EventsView() {
  const { events, loading, stats, updateEventStatus, deleteEvent, refreshData } = useEvents();
  const [selectedComments, setSelectedComments] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const showToast = useCallback((type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const handleUpdateStatus = useCallback(async (id: number, newStatus: EventStatus) => {
    setUpdatingId(id);
    try {
      await updateEventStatus(id, newStatus);
      showToast('success', `Estado actualizado a ${newStatus}`);
    } catch (error: any) {
      showToast('error', error.message || 'Error al actualizar estado');
    } finally {
      setUpdatingId(null);
    }
  }, [updateEventStatus, showToast]);

  const handleDeleteEvent = useCallback(async (id: number) => {
    try {
      await deleteEvent(id);
      setDeleteConfirmId(null);
      showToast('success', 'Evento eliminado correctamente');
    } catch (error: any) {
      showToast('error', error.message || 'Error al eliminar evento');
    }
  }, [deleteEvent, showToast]);

  const confirmDelete = useCallback((id: number) => {
    setDeleteConfirmId(id);
    setTimeout(() => {
      setDeleteConfirmId(prev => prev === id ? null : prev);
    }, 5000);
  }, []);

  const handleRefresh = useCallback(() => {
    refreshData();
    showToast('success', 'Datos actualizados');
  }, [refreshData, showToast]);

  if (loading && events.length === 0) {
    return (
      <div className="bg-[#121214] border border-stone-800 rounded-lg p-12">
        <div className="flex flex-col items-center justify-center gap-4">
          <RefreshCw className="w-8 h-8 text-[#C6A96B] animate-spin" />
          <p className="text-stone-400">Cargando solicitudes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-right-5 duration-300">
          <div className={`px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 ${toastMessage.type === 'success' ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'
            }`}>
            {toastMessage.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {toastMessage.text}
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[#121214] border border-stone-800 rounded p-4">
          <p className="text-xs uppercase tracking-wider text-stone-500">Total</p>
          <p className="text-2xl font-serif text-[#C6A96B]">{events.length}</p>
        </div>
        <div className="bg-[#121214] border border-amber-500/20 rounded p-4">
          <p className="text-xs uppercase tracking-wider text-amber-500">Pendientes</p>
          <p className="text-2xl font-serif text-amber-500">{stats.PENDIENTE || 0}</p>
        </div>
        <div className="bg-[#121214] border border-green-500/20 rounded p-4">
          <p className="text-xs uppercase tracking-wider text-green-500">Recibidos</p>
          <p className="text-2xl font-serif text-green-500">{stats.RECIBIDO || 0}</p>
        </div>
        <div className="bg-[#121214] border border-red-500/20 rounded p-4">
          <p className="text-xs uppercase tracking-wider text-red-500">Cancelados</p>
          <p className="text-2xl font-serif text-red-500">{stats.CANCELADO || 0}</p>
        </div>
      </div>

      {/* Tabla de Eventos */}
      <div className="bg-[#121214] border border-stone-800 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-stone-800 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-serif text-[#C6A96B]">Solicitudes de Eventos</h2>
            <p className="text-xs text-stone-500 mt-1">
              {events.length} solicitud{events.length !== 1 ? 'es' : ''} encontrada{events.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="text-stone-400 hover:text-[#C6A96B] transition-colors p-2 rounded border border-stone-700 hover:border-[#C6A96B] disabled:opacity-50"
            aria-label="Refrescar datos"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="overflow-x-auto">
          {events.length > 0 ? (
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase bg-stone-900 text-stone-300 border-b border-stone-800 sticky top-0">
                <tr>
                  <th className="px-4 py-3 font-medium">Cliente</th>
                  <th className="px-4 py-3 font-medium">Contacto</th>
                  <th className="px-4 py-3 font-medium">Empresa</th>
                  <th className="px-4 py-3 font-medium">Fecha</th>
                  <th className="px-4 py-3 font-medium text-center">Asistentes</th>
                  <th className="px-4 py-3 font-medium">Estado</th>
                  <th className="px-4 py-3 font-medium text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {events.map((ev) => (
                  deleteConfirmId === ev.id ? (
                    <tr key={ev.id} className="border-b border-stone-800/50 bg-red-500/5">
                      <td colSpan={7} className="px-4 py-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-red-400">¿Eliminar "{ev.name} {ev.lastName}"?</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleDeleteEvent(ev.id)}
                              className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition"
                            >
                              Confirmar
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="px-3 py-1 bg-stone-700 text-stone-300 rounded text-xs hover:bg-stone-600 transition"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <EventRow
                      key={ev.id}
                      event={ev}
                      onUpdateStatus={handleUpdateStatus}
                      onDelete={confirmDelete}
                      onViewComments={setSelectedComments}
                      isUpdating={updatingId === ev.id}
                    />
                  )
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <p className="text-stone-500">No hay solicitudes de eventos registradas.</p>
              <p className="text-xs text-stone-600 mt-2">Las nuevas solicitudes aparecerán aquí automáticamente.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Comentarios */}
      <CommentsModal comments={selectedComments} onClose={() => setSelectedComments(null)} />
    </div>
  );
}