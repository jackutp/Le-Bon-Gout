Necesito añadir un componente React con TypeScript llamado EventsView.tsx para administrar eventos.

## Estructura de archivos:
admin/
├── components/
│ ├── EventsView.tsx ← componente principal
└── page.tsx ← página que importa EventsView


Guiate de los demas componentes de admin, y dentro de eventos se vea una tabla de los eventos solicitados por un post que se hizo de otra parte, solamente se puede editar el estado "PENDIENTE", "RECIBIDO", "CANCELADO" y asu costado un botón en donde muestre los comentarios en un modal:
            <div>
              <label htmlFor="comments" className="block text-xs uppercase tracking-wider text-stone-500 mb-1">Comentarios *</label>
              <textarea id="comments" required rows={4} placeholder="Cuéntenos los detalles de su evento..." value={formData.comments} onChange={e => setFormData({ ...formData, comments: e.target.value })} className="bg-transparent border-b border-stone-700 pb-2 pt-4 text-white placeholder:text-stone-500 focus:border-amber-500 outline-none transition-colors w-full resize-none" />
            </div>

Debe mostrar los datos de CotizacionForm.tsx
src/
└── app/
    ├── admin/
    ├── cocina/
    └── eventos/
        ├── components/
        │   ├── CotizacionForm.tsx
        │   ├── EspaciosSection.tsx
        │   └── Footer.tsx
        └── page.tsx

