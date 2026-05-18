// src/app/admin/components/SuppliersView.tsx
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, FileText, Upload, X, CheckCircle, Download, Trash, Plus, Edit } from "lucide-react";
import { useProveedores } from "@/context/ProveedorContext";
export function SuppliersView() {
    const {
        proveedores,
        ordenes,
        loading,
        addOrden,
        updateEstadoOrden,
        subirFactura,
        descargarFactura,
        eliminarFactura,
        getOrdenesByProveedor,
        addProveedor,
        updateProveedor,
        deleteProveedor,
        deleteOrden,
        refreshOrdenes,
    } = useProveedores();
    // Estados para modales
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [showPOsModal, setShowPOsModal] = useState(false);
    const [showProveedorModal, setShowProveedorModal] = useState(false);
    const [showSentFeedback, setShowSentFeedback] = useState(false);
    // Estados para datos
    const [selectedSupplierId, setSelectedSupplierId] = useState<number | null>(null);
    const [viewingSupplier, setViewingSupplier] = useState<any | null>(null);
    const [viewingOrdenes, setViewingOrdenes] = useState<any[]>([]);
    const [editingProveedor, setEditingProveedor] = useState<any | null>(null);
    const [uploadingForOrden, setUploadingForOrden] = useState<number | null>(null);
    //use efect
    useEffect(() => {
        if (viewingSupplier && showPOsModal) {
            const ordenesProveedor = getOrdenesByProveedor(viewingSupplier.proveedorid);
            setViewingOrdenes([...ordenesProveedor]);
        }
    }, [ordenes, viewingSupplier, showPOsModal]);
    // Formulario proveedor
    const [proveedorForm, setProveedorForm] = useState({
        nombre: "",
        descripcion: "",
        ruc: "",
        razonSocial: "",
        direccionFiscal: "",
    });
    // ============ PROVEEDORES  ============
    const openCreateProveedor = () => {
        setEditingProveedor(null);
        setProveedorForm({
            nombre: "",
            descripcion: "",
            ruc: "",
            razonSocial: "",
            direccionFiscal: "",
        });
        setShowProveedorModal(true);
    };
    const openEditProveedor = (proveedor: any) => {
        setEditingProveedor(proveedor);
        setProveedorForm({
            nombre: proveedor.nombre,
            descripcion: proveedor.descripcion || "",
            ruc: proveedor.ruc || "",
            razonSocial: proveedor.razonSocial || "",
            direccionFiscal: proveedor.direccionFiscal || "",
        });
        setShowProveedorModal(true);
    };
    const handleSaveProveedor = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingProveedor) {
                await updateProveedor(editingProveedor.proveedorid, proveedorForm);
                alert("Proveedor actualizado correctamente");
            } else {
                await addProveedor(proveedorForm);
                alert("Proveedor creado correctamente");
            }
            setShowProveedorModal(false);
        } catch (error) {
            console.error('Error guardando proveedor:', error);
            alert('Error al guardar el proveedor');
        }
    };
    const handleDeleteProveedor = async (id: number, nombre: string) => {
        const ordenesDelProveedor = getOrdenesByProveedor(id);

        if (ordenesDelProveedor.length > 0) {
            const confirmMessage = `⚠️ ELIMINACIÓN BLOQUEADA ⚠️\n\n` +
                `El proveedor "${nombre}" tiene ${ordenesDelProveedor.length} órden(es) de compra asociadas.\n\n` +
                `Para eliminar este proveedor, primero debe:\n` +
                `1. Ir a "VER POS" de este proveedor\n` +
                `2. Eliminar o completar todas las órdenes asociadas\n\n` +
                `¿Desea ir a las órdenes de este proveedor ahora?`;
            if (confirm(confirmMessage)) {
                openPOs({ proveedorid: id, nombre });
            }
            return;
        }
        if (confirm(`¿Está seguro de eliminar "${nombre}"?`)) {
            const result = await deleteProveedor(id);

            if (result && !result.success) {
                if (result.hasOrdenes) {
                    alert(`No se puede eliminar el proveedor "${nombre}"\n\n` +
                        `Motivo: Tiene ${result.ordenesCount || ''} órden(es) de compra asociadas.\n\n` +
                        `Solución: Elimine primero todas las órdenes desde "VER POS".`);
                } else {
                    alert(`Error al eliminar: ${result.message || 'Error desconocido'}`);
                }
            } else if (result?.success !== false) {
                alert(`Proveedor "${nombre}" eliminado correctamente`);
            }
        }
    };

    // ============ ÓRDENES ============

    const handleSendRequest = async () => {
        if (!selectedSupplierId) return;
        try {
            await addOrden(selectedSupplierId);
            setShowSentFeedback(true);
            setTimeout(() => {
                setShowSentFeedback(false);
                setShowRequestModal(false);
                setSelectedSupplierId(null);
            }, 2000);
        } catch (error) {
            console.error('Error al crear orden:', error);
            alert('Error al crear la orden');
        }
    };

    const openPOs = async (supplier: any) => {
        setViewingSupplier(supplier);
        const ordenesProveedor = getOrdenesByProveedor(supplier.proveedorid);
        setViewingOrdenes(ordenesProveedor);
        setShowPOsModal(true);
    };

    const handleFileUpload = async (ordenId: number, file: File) => {
        setUploadingForOrden(ordenId);
        try {
            await subirFactura(ordenId, file);
            alert("Factura cargada correctamente");
            await refreshOrdenes();

        } catch (error) {
            console.error('Error al subir factura:', error);
            alert('Error al subir la factura');
        } finally {
            setUploadingForOrden(null);
        }
    };
    const handleEliminarFactura = async (ordenId: number) => {
        const confirmDelete = confirm(
            `⚠️ ¿Está seguro de eliminar la factura de la orden #${ordenId}?\n\n` +
            `Esta acción eliminará permanentemente la factura y no se puede deshacer.`
        );

        if (!confirmDelete) return;

        try {
            await eliminarFactura(ordenId);
            alert("Factura eliminada correctamente");
            await refreshOrdenes();

        } catch (error) {
            console.error('Error al eliminar factura:', error);
            alert('Error al eliminar la factura');
        }
    };
    const handleDownloadFactura = async (ordenId: number, nombre: string) => {
        try {
            const blob = await descargarFactura(ordenId);
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = nombre;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error al descargar factura:', error);
            alert('Error al descargar la factura');
        }
    };

    const handleEstadoChange = async (ordenId: number, nuevoEstado: string) => {
        try {
            await updateEstadoOrden(ordenId, nuevoEstado);
            await refreshOrdenes();
            const ordenesProveedor = getOrdenesByProveedor(viewingSupplier?.proveedorid);
            setViewingOrdenes(ordenesProveedor);
        } catch (error) {
            console.error('Error al cambiar estado:', error);
            alert('Error al cambiar el estado');
        }
    };
    const handleDeleteOrden = async (ordenId: number, ordenNumero: string) => {
        const confirmDelete = confirm(
            `⚠️ ¿Está seguro de eliminar la orden #${ordenNumero}?\n\n` +
            `Esta acción eliminará permanentemente la orden y no se puede deshacer.`
        );

        if (!confirmDelete) return;

        try {
            await deleteOrden(ordenId);
            alert(`Orden #${ordenNumero} eliminada correctamente`);
            await refreshOrdenes();
            const ordenesActualizadas = getOrdenesByProveedor(viewingSupplier?.proveedorid);
            setViewingOrdenes(ordenesActualizadas);
            if (ordenesActualizadas.length === 0) {
                alert(`El proveedor "${viewingSupplier?.nombre}" ya no tiene órdenes asociadas.`);
                setTimeout(() => setShowPOsModal(false), 2000);
            }
        } catch (error) {
            console.error('Error al eliminar orden:', error);
            alert('Error al eliminar la orden. Intente nuevamente.');
        }
    };

    const getEstadoColor = (estado: string) => {
        switch (estado) {
            case 'RECIBIDO': return 'border-green-500/50 text-green-500 bg-green-500/10';
            case 'PENDIENTE': return 'border-yellow-500/50 text-yellow-500 bg-yellow-500/10';
            case 'DEVUELTO': return 'border-red-500/50 text-red-500 bg-red-500/10';
            case 'CANCELADO': return 'border-stone-500/50 text-stone-500 bg-stone-500/10';
            default: return 'border-stone-500/50 text-stone-500 bg-stone-500/10';
        }
    };

    if (loading) {
        return <div className="text-center py-12 text-stone-400">Cargando proveedores...</div>;
    }

    return (
        <div className="space-y-6">
            {/* Botones de acción */}
            <div className="flex justify-end gap-4">
                <button
                    onClick={openCreateProveedor}
                    className="flex items-center gap-2 bg-green-600/20 text-green-500 border border-green-500/50 px-4 py-2 rounded text-sm uppercase tracking-widest hover:bg-green-600/30 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Nuevo Proveedor
                </button>
                <button
                    onClick={() => setShowRequestModal(true)}
                    className="flex items-center gap-2 bg-[#C6A96B] text-black px-4 py-2 rounded text-sm uppercase tracking-widest hover:bg-white transition-colors"
                >
                    <Send className="w-4 h-4" />
                    Solicitar Pedido
                </button>
            </div>

            <div className="bg-[#121214] border border-stone-800 rounded p-6">
                <h2 className="text-xl font-serif text-white mb-6">Directorio de Proveedores</h2>
                <div className="space-y-4">
                    {proveedores.map((proveedor) => (
                        <div
                            key={proveedor.proveedorid}
                            className="p-4 border border-stone-800 rounded flex justify-between items-center bg-black/20 hover:bg-black/40 transition-colors"
                        >
                            <div className="flex-1">
                                <p className="text-sm font-medium">{proveedor.nombre}</p>
                                <div className="flex flex-wrap gap-3 mt-1">
                                    {proveedor.ruc && (
                                        <p className="text-xs text-stone-500">RUC: {proveedor.ruc}</p>
                                    )}
                                    {proveedor.razonSocial && (
                                        <p className="text-xs text-stone-500">Razón Social: {proveedor.razonSocial}</p>
                                    )}
                                </div>
                                {proveedor.descripcion && (
                                    <p className="text-xs text-stone-400 mt-1">{proveedor.descripcion}</p>
                                )}
                                {proveedor.direccionFiscal && (
                                    <p className="text-xs text-stone-500 mt-1">{proveedor.direccionFiscal}</p>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEditProveedor(proveedor)}
                                    className="p-2 border border-stone-700 hover:border-yellow-500 text-stone-400 hover:text-yellow-500 rounded transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => {
                                        if (proveedor.proveedorid) {
                                            handleDeleteProveedor(proveedor.proveedorid, proveedor.nombre);
                                        }
                                    }}
                                    className="p-2 border border-stone-700 hover:border-red-500 text-stone-400 hover:text-red-500 rounded transition-colors"
                                >
                                    <Trash className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => openPOs(proveedor)}
                                    className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C6A96B] border border-[#C6A96B]/30 px-3 py-1.5 rounded hover:bg-[#C6A96B] hover:text-black transition-all"
                                >
                                    <FileText className="w-3.5 h-3.5" />
                                    Ver POs
                                </button>
                            </div>
                        </div>
                    ))}
                    {proveedores.length === 0 && (
                        <p className="text-center py-4 text-stone-500">No hay proveedores registrados</p>
                    )}
                </div>
            </div>

            {/* MODAL PROVEEDOR (Crear/Editar) */}
            <AnimatePresence>
                {showProveedorModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setShowProveedorModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative bg-[#121214] border border-stone-800 shadow-2xl p-8 max-w-lg w-full"
                        >
                            <button
                                onClick={() => setShowProveedorModal(false)}
                                className="absolute top-4 right-4 text-stone-500 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-2xl font-serif text-[#C6A96B] mb-6">
                                {editingProveedor ? "Editar Proveedor" : "Nuevo Proveedor"}
                            </h2>

                            <form onSubmit={handleSaveProveedor} className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Nombre *
                                    </label>
                                    <input
                                        type="text"
                                        value={proveedorForm.nombre}
                                        onChange={(e) => setProveedorForm({ ...proveedorForm, nombre: e.target.value })}
                                        className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Descripción
                                    </label>
                                    <textarea
                                        value={proveedorForm.descripcion}
                                        onChange={(e) => setProveedorForm({ ...proveedorForm, descripcion: e.target.value })}
                                        className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded h-24 resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        RUC (11 dígitos)
                                    </label>
                                    <input
                                        type="text"
                                        maxLength={11}
                                        value={proveedorForm.ruc}
                                        onChange={(e) => setProveedorForm({ ...proveedorForm, ruc: e.target.value })}
                                        className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Razón Social
                                    </label>
                                    <input
                                        type="text"
                                        value={proveedorForm.razonSocial}
                                        onChange={(e) => setProveedorForm({ ...proveedorForm, razonSocial: e.target.value })}
                                        className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Dirección Fiscal
                                    </label>
                                    <input
                                        type="text"
                                        value={proveedorForm.direccionFiscal}
                                        onChange={(e) => setProveedorForm({ ...proveedorForm, direccionFiscal: e.target.value })}
                                        className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded"
                                    />
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowProveedorModal(false)}
                                        className="flex-1 border border-stone-800 text-stone-400 py-3 hover:text-white rounded"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 bg-[#C6A96B] text-black py-3 hover:bg-white rounded"
                                    >
                                        {editingProveedor ? "Actualizar" : "Crear"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* MODAL VER POs */}
            <AnimatePresence>
                {showPOsModal && viewingSupplier && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setShowPOsModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="relative bg-[#121214] border border-stone-800 shadow-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setShowPOsModal(false)}
                                className="absolute top-4 right-4 text-stone-500 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="mb-6">
                                <h2 className="text-2xl font-serif text-[#C6A96B]">Órdenes de Compra</h2>
                                <p className="text-stone-400 text-sm">
                                    Historial para: {viewingSupplier.nombre}
                                </p>
                            </div>

                            <div className="space-y-6">
                                {viewingOrdenes.length > 0 ? (
                                    viewingOrdenes.map((orden) => (
                                        <div key={orden.ordenId} className="border border-stone-800 rounded overflow-hidden">
                                            <div className="bg-black/40 p-4 border-b border-stone-800 flex justify-between items-center flex-wrap gap-2">
                                                <div>
                                                    <span className="text-[#C6A96B] font-mono text-sm mr-4">
                                                        #{orden.ordenId}
                                                    </span>
                                                    <span className="text-xs text-stone-500 uppercase tracking-widest">
                                                        {new Date(orden.fecha).toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <select
                                                        value={orden.estado}
                                                        onChange={(e) => handleEstadoChange(orden.ordenId, e.target.value)}
                                                        className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${getEstadoColor(orden.estado)}`}
                                                    >
                                                        <option value="PENDIENTE">PENDIENTE</option>
                                                        <option value="RECIBIDO">RECIBIDO</option>
                                                        <option value="DEVUELTO">DEVUELTO</option>
                                                        <option value="CANCELADO">CANCELADO</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="p-4">
                                                <div className="flex items-center justify-between flex-wrap gap-4">
                                                    <div className="flex items-center gap-4">
                                                        <label className="cursor-pointer">
                                                            <input
                                                                type="file"
                                                                accept=".xml,.pdf"
                                                                className="hidden"
                                                                onChange={(e) => {
                                                                    if (e.target.files?.[0]) {
                                                                        handleFileUpload(orden.ordenId, e.target.files[0]);
                                                                    }
                                                                }}
                                                            />
                                                            <span className="text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 px-3 py-1.5 rounded flex items-center gap-2 cursor-pointer transition-colors">
                                                                <Upload className="w-3.5 h-3.5" />
                                                                Subir Factura
                                                            </span>
                                                        </label>

                                                        {orden.tieneFactura && (
                                                            <>
                                                                <button
                                                                    onClick={() => handleDownloadFactura(orden.ordenId, `factura_${orden.ordenId}.pdf`)}
                                                                    className="text-xs bg-green-800/30 hover:bg-green-800/50 text-green-500 px-3 py-1.5 rounded flex items-center gap-2 transition-colors"
                                                                >
                                                                    <Download className="w-3.5 h-3.5" />
                                                                    Descargar
                                                                </button>
                                                                <button
                                                                    onClick={() => handleEliminarFactura(orden.ordenId)}
                                                                    className="text-xs bg-red-800/30 hover:bg-red-800/50 text-red-500 px-3 py-1.5 rounded flex items-center gap-2 transition-colors"
                                                                >
                                                                    <Trash className="w-3.5 h-3.5" />
                                                                    Eliminar Factura
                                                                </button>
                                                            </>
                                                        )}
                                                        <button
                                                            onClick={() => handleDeleteOrden(orden.ordenId, orden.ordenId.toString())}
                                                            className="text-xs bg-red-800/30 hover:bg-red-800/50 text-red-500 px-3 py-1.5 rounded flex items-center gap-2 transition-colors"
                                                        >
                                                            <Trash className="w-3.5 h-3.5" />
                                                            Eliminar Orden
                                                        </button>
                                                    </div>

                                                    {uploadingForOrden === orden.ordenId && (
                                                        <div className="flex items-center gap-2 text-xs text-[#C6A96B]">
                                                            <div className="w-4 h-4 border-2 border-[#C6A96B] border-t-transparent rounded-full animate-spin" />
                                                            Subiendo...
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center py-12 text-stone-600 italic">
                                        No hay órdenes registradas para este proveedor.
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* MODAL SOLICITAR PEDIDO */}
            <AnimatePresence>
                {showRequestModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setShowRequestModal(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="relative bg-[#121214] border border-stone-800 shadow-2xl p-8 max-w-lg w-full"
                        >
                            <button
                                onClick={() => setShowRequestModal(false)}
                                className="absolute top-4 right-4 text-stone-500 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-2xl font-serif text-[#C6A96B] mb-6">
                                Solicitar Pedido a Proveedor
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">
                                        Seleccionar Proveedor
                                    </label>
                                    <select
                                        value={selectedSupplierId || ""}
                                        onChange={(e) => setSelectedSupplierId(Number(e.target.value))}
                                        className="w-full bg-[#0B0B0C] border border-stone-800 text-white px-4 py-2 rounded"
                                    >
                                        <option value="">Seleccionar...</option>
                                        {proveedores.map((s) => (
                                            <option key={s.proveedorid} value={s.proveedorid}>
                                                {s.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowRequestModal(false)}
                                        className="flex-1 border border-stone-800 text-stone-400 py-3 hover:text-white rounded"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSendRequest}
                                        disabled={!selectedSupplierId}
                                        className="flex-1 bg-[#C6A96B] text-black py-3 hover:bg-white disabled:opacity-50 disabled:hover:bg-[#C6A96B] flex items-center justify-center gap-2 rounded"
                                    >
                                        <Send className="w-4 h-4" />
                                        Enviar
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* FEEDBACK VISUAL */}
            <AnimatePresence>
                {showSentFeedback && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="bg-green-600/20 border border-green-500 text-green-500 px-8 py-4 rounded-lg flex items-center gap-3"
                        >
                            <CheckCircle className="w-6 h-6" />
                            <span className="text-lg">Pedido enviado correctamente</span>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}