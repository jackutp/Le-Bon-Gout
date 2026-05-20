Necesito crear un componente en Next.js (App Router) en la ruta src/app/admin/components/mesas.tsx

Requisitos:

1. CRUD completo para gestionar mesas conectándose a una API REST con estos endpoints:
   - GET /api/mesas → listar todas
   - POST /api/mesas → crear { numero, capacidad }
   - PUT /api/mesas/{id} → editar { numero, capacidad } (solo si está DISPONIBLE)
   - DELETE /api/mesas/{id} → eliminar (solo si está DISPONIBLE)

2. La entidad Mesa tiene:
   - id: number
   - numero: number
   - capacidad: number
   - estado: "DISPONIBLE" | "OCUPADO" | "RESERVADO"
   - totalActual: number

3. Interfaz visual:
   - Tabla con columnas: Número | Capacidad | Estado | Total Actual | Acciones
   - Botón "+ Registrar Mesa" arriba a la derecha
   - Cada fila tiene botones "Editar" y "Eliminar"
   - Si estado NO es "DISPONIBLE", los botones deben estar deshabilitados o en gris

4. Modales/Formularios:
   - Registrar: campos número (number, requerido) y capacidad (number, requerido, mínimo 1)
   - Editar: mismos campos, precargados con datos actuales

5. Funcionalidad:
   - Al crear/editar/eliminar, refrescar la tabla automáticamente
   - Mostrar mensajes de éxito o error (toast o alert)
   - Loading spinner mientras carga la tabla
   - Confirmación antes de eliminar

6. Estilos: Tailwind CSS, diseño limpio tipo admin panel

7. Tipado TypeScript estricto

Genera solo el código del componente, con todos los imports necesarios.