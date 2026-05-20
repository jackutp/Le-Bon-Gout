"use client";

import React, { useState } from 'react';
import { Plus, Edit, Trash2, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useMesa, Mesa } from '@/context/MesaContext';

export function MesasView() {
  const { mesas, isLoading, error, successMessage, createMesa, updateMesa, deleteMesa, clearMessages } = useMesa();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [selectedMesa, setSelectedMesa] = useState<Mesa | null>(null);
  const [formData, setFormData] = useState({ numero: '', capacidad: '' });

  const handleOpenModal = (mesa?: Mesa) => {
    if (mesa) {
      setSelectedMesa(mesa);
      setFormData({ numero: mesa.numero.toString(), capacidad: mesa.capacidad.toString() });
    } else {
      setSelectedMesa(null);
      setFormData({ numero: '', capacidad: '' });
    }
    setIsModalOpen(true);
    clearMessages();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      numero: Number(formData.numero),
      capacidad: Number(formData.capacidad),
    };

    let success = false;
    if (selectedMesa) {
      const result = await updateMesa(selectedMesa.id, payload);
      success = result !== null;
    } else {
      const result = await createMesa(payload);
      success = result !== null;
    }

    if (success) {
      setIsModalOpen(false);
      setFormData({ numero: '', capacidad: '' });
      setSelectedMesa(null);
    }
  };

  const confirmDelete = (mesa: Mesa) => {
    setSelectedMesa(mesa);
    setIsDeleteModalOpen(true);
    clearMessages();
  };

  const handleDelete = async () => {
    if (!selectedMesa) return;
    const success = await deleteMesa(selectedMesa.id);
    if (success) {
      setIsDeleteModalOpen(false);
      setSelectedMesa(null);
    }
  };

  return (
    <div className="bg-[#121214] border border-stone-800 rounded p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-serif text-white">Gestión de Mesas</h1>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-[#C6A96B] text-black px-4 py-2 rounded text-sm uppercase tracking-widest hover:bg-white transition-colors"
        >
          <Plus className="w-4 h-4" />
          Registrar Mesa
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-900/20 border-l-4 border-red-500 text-red-500 p-4 rounded text-sm flex items-center gap-2">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 bg-green-900/20 border-l-4 border-green-500 text-green-500 p-4 rounded text-sm flex items-center gap-2">
          <CheckCircle2 size={20} />
          <p>{successMessage}</p>
        </div>
      )}

      <table className="w-full text-left">
        <thead className="bg-black/40 border-b border-stone-800 text-xs uppercase tracking-widest text-stone-400">
          <tr>
            <th className="p-4">Número</th>
            <th className="p-4">Capacidad</th>
            <th className="p-4">Estado</th>
            <th className="p-4">Total Actual</th>
            <th className="p-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-800 text-sm">
          {isLoading ? (
            <tr>
              <td colSpan={5} className="p-12 text-center text-stone-400">
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                </div>
              </td>
            </tr>
          ) : mesas.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-8 text-center text-stone-500">
                No hay mesas registradas
              </td>
            </tr>
          ) : (
            mesas.map((mesa) => (
              <tr key={mesa.id}>
                <td className="p-4 font-medium text-white">
                  Mesa {mesa.numero}
                </td>
                <td className="p-4 text-stone-400">
                  {mesa.capacidad} personas
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs ${mesa.estado === 'DISPONIBLE' ? 'bg-green-500/20 text-green-500' :
                    mesa.estado === 'OCUPADO' ? 'bg-red-500/20 text-red-500' :
                      'bg-yellow-500/20 text-yellow-500'
                    }`}>
                    {mesa.estado}
                  </span>
                </td>
                <td className="p-4 text-stone-400">
                  S/ {mesa.totalActual?.toFixed(2) || '0.00'}
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleOpenModal(mesa)}
                      disabled={mesa.estado !== 'DISPONIBLE'}
                      className={`p-2 border rounded transition-colors ${mesa.estado === 'DISPONIBLE'
                        ? 'border-stone-700 hover:border-[#C6A96B] text-stone-400 hover:text-[#C6A96B]'
                        : 'border-stone-800 text-stone-600 cursor-not-allowed'
                        }`}
                      title="Editar"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => confirmDelete(mesa)}
                      disabled={mesa.estado !== 'DISPONIBLE'}
                      className={`p-2 border rounded transition-colors ${mesa.estado === 'DISPONIBLE'
                        ? 'border-stone-700 hover:border-red-500 text-stone-400 hover:text-red-500'
                        : 'border-stone-800 text-stone-600 cursor-not-allowed'
                        }`}
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-[#121214] border border-stone-800 shadow-2xl p-8 max-w-md w-full rounded">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-stone-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-serif text-[#C6A96B] mb-6">
              {selectedMesa ? 'Editar Mesa' : 'Registrar Nueva Mesa'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="numero" className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Número de Mesa</label>
                <input
                  type="number"
                  id="numero"
                  required
                  min="1"
                  className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded focus:outline-none focus:border-[#C6A96B]"
                  value={formData.numero}
                  onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="capacidad" className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Capacidad (Personas)</label>
                <input
                  type="number"
                  id="capacidad"
                  required
                  min="1"
                  className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded focus:outline-none focus:border-[#C6A96B]"
                  value={formData.capacidad}
                  onChange={(e) => setFormData({ ...formData, capacidad: e.target.value })}
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 border border-stone-800 text-stone-400 py-3 hover:text-white rounded transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#C6A96B] text-black py-3 hover:bg-white rounded transition-colors font-medium"
                >
                  {selectedMesa ? 'Guardar Cambios' : 'Registrar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedMesa && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)}></div>
          <div className="relative bg-[#121214] border border-stone-800 shadow-2xl p-8 max-w-md w-full rounded">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-900/30 border border-red-500/50">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-white">Eliminar Mesa</h3>
              </div>
            </div>
            <div className="mb-6">
              <p className="text-sm text-stone-400">
                ¿Estás seguro de que deseas eliminar la Mesa {selectedMesa.numero}? Esta acción no se puede deshacer.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 border border-stone-800 text-stone-400 py-3 hover:text-white rounded transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 bg-red-500 text-white py-3 hover:bg-red-600 rounded transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}