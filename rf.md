# Requerimientos Funcionales y No Funcionales por Áreas de Negocio

Basado en la arquitectura frontend en Next.js (App Router) y React para el sistema "Le Bon Goût", a continuación se detallan los Requerimientos Funcionales (RF) y Requerimientos No Funcionales (RNF) estructurados por área de negocio.

### 1. Marketing y Ventas
* **Requerimientos Funcionales (RF):**
  - **RF-01 (Mapa de Salón Interactivo):** El sistema debe mostrar un mapa visual del salón donde el mesero/host pueda ver el estado de las mesas (libre, ocupada, reservada) y gestionar asignaciones o reservas en tiempo real.
  - **RF-02 (Toma de Pedidos en POS/Tablet):** El mesero debe poder agregar productos a un pedido activo en una mesa específica mediante una interfaz táctil ágil, categorizando por menús (bebidas, entradas, platos principales).
  - **RF-03 (Gestión de Eventos y Reservas):** El personal de servicio debe poder visualizar, aprobar, rechazar o cancelar solicitudes de eventos y reservas (Ej: `EventsView.tsx`).

* **Requerimientos No Funcionales (RNF):**
  - **RNF-01 (Tiempo Real):** La actualización del estado de las mesas y los pedidos debe reflejarse en tiempo real (< 500ms) en todos los dispositivos conectados mediante WebSockets o Server-Sent Events (SSE).
  - **RNF-02 (Responsive & Touch-first):** La interfaz de toma de pedidos y mapa de salón debe estar optimizada para uso en tablets (iPad, Android) mediante gestos táctiles.
  - **RNF-03 (Offline-first / Resiliencia):** La toma de pedidos debe soportar breves caídas de red, encolando localmente las peticiones y sincronizando cuando vuelva la conexión.

* **Arquitectura Frontend Sugerida:**
  - **Vistas/Rutas (Next.js):** `/mesero/mesas`, `/mesero/pedidos`, `/admin/eventos`.
  - **Componentes React:** `MapaSalon`, `TarjetaMesa`, `TarjetaProducto`, `TicketPedido`, `EventsView`.
  - **Estrategia de estado:** Context API para el estado del carrito de pedido actual por mesa. Zustand para el estado global en tiempo real de la disponibilidad de las mesas.

### 2. Logística y Almacén
* **Requerimientos Funcionales (RF):**
  - **RF-04 (Gestión de Inventario):** El personal de almacén debe poder listar, agregar, editar y eliminar insumos, visualizando alertas de stock bajo.
  - **RF-05 (Escandallos y Recetas):** El sistema debe permitir definir las proporciones de insumos utilizados por cada plato (receta digital) para descontar del inventario automáticamente con cada venta.
  - **RF-06 (Gestión de Mermas/Waste):** El usuario debe poder registrar pérdidas de insumos por caducidad o errores a través de un panel específico (`WasteView.tsx`).

* **Requerimientos No Funcionales (RNF):**
  - **RNF-04 (Manejo de Formularios Grandes):** La interfaz de creación de escandallos debe manejar múltiples campos dinámicos sin degradación de rendimiento.
  - **RNF-05 (Paginación y Filtrado):** Los listados de inventario deben implementar paginación y filtrado/búsqueda del lado del servidor (SSR/Server Actions) para manejar grandes volúmenes de datos rápidamente.

* **Arquitectura Frontend Sugerida:**
  - **Vistas/Rutas (Next.js):** `/admin/inventario`, `/admin/recetas`, `/admin/mermas`.
  - **Componentes React:** `InventarioTable`, `FormularioReceta`, `WasteTracker`.
  - **Estrategia de estado:** React Query (o SWR) para fetching de datos, cacheo local y revalidación al modificar inventario, reduciendo peticiones innecesarias.

### 3. Producción y Operaciones
* **Requerimientos Funcionales (RF):**
  - **RF-07 (Kitchen Display System - KDS):** El equipo de cocina debe visualizar los pedidos entrantes en formato de tarjetas ("tickets"), ordenados por antigüedad o prioridad.
  - **RF-08 (Cambio de Estado de Comandas):** Los cocineros deben poder cambiar el estado de los platillos o comandas completas (Ej: Pendiente -> En preparación -> Listo) con un solo toque o clic.
  - **RF-09 (Notificación a Meseros):** Al marcar un pedido como "Listo", el sistema debe alertar en la vista del mesero correspondiente.

* **Requerimientos No Funcionales (RNF):**
  - **RNF-06 (Sincronización Crítica):** El flujo mesa-cocina es crítico; los pedidos no deben perderse bajo ninguna circunstancia (Garantía de entrega de mensaje vía polling robusto o WebSockets).
  - **RNF-07 (UX Operativa de Alto Contraste):** Los tickets en el KDS deben tener colores semánticos claros (Rojo para urgente, amarillo en preparación) y alta legibilidad para lectura a distancia en entornos de cocina.
  - **RNF-08 (Audio Alerts):** Debe emitirse un sonido suave en el dispositivo de cocina al ingresar un nuevo pedido.

* **Arquitectura Frontend Sugerida:**
  - **Vistas/Rutas (Next.js):** `/cocina/tablero`.
  - **Componentes React:** `KdsBoard`, `TicketCocina`, `FilaPlatillo`.
  - **Estrategia de estado:** Zustand para el estado local del tablero de cocina en memoria y suscripción directa a eventos de WebSocket para mutaciones en tiempo real.

### 4. Dirección o Gerencia General
* **Requerimientos Funcionales (RF):**
  - **RF-10 (Dashboard Ejecutivo):** El gerente debe visualizar KPIs clave como ventas del día, ticket promedio, mesas atendidas y rotación.
  - **RF-11 (Reportes de Ventas e Inventario):** Generación y visualización de gráficos (barras, líneas, pastel) sobre los productos más vendidos, horas pico y rentabilidad.
  - **RF-12 (Exportación):** Posibilidad de exportar reportes a PDF o Excel desde la vista del navegador.

* **Requerimientos No Funcionales (RNF):**
  - **RNF-09 (Optimización de Bundles):** Las librerías de gráficos (ej. Recharts, Chart.js) son pesadas; deben cargarse de forma perezosa (Lazy Loading / `next/dynamic`) solo en la ruta del Dashboard.
  - **RNF-10 (Caché de Datos Históricos):** Los reportes históricos no cambian frecuentemente; se debe aplicar ISR (Incremental Static Regeneration) o cacheo agresivo con React Query para la carga inicial.

* **Arquitectura Frontend Sugerida:**
  - **Vistas/Rutas (Next.js):** `/admin/dashboard`, `/admin/reportes`.
  - **Componentes React:** `KpiCard`, `VentasChart`, `ProductosTopList`.
  - **Estrategia de estado:** Datos inmutables leídos mediante Server Components (RSC) o React Query; estado local efímero para los selectores de fechas.

### 5. Configuración Global y Autenticación
* **Requerimientos Funcionales (RF):**
  - **RF-13 (Autenticación Dual):** Pantallas de Login y Registro (`Login.tsx`, `Registro.tsx`) para acceso del personal, con recuperación de contraseña.
  - **RF-14 (Control de Acceso por Roles - RBAC):** El menú y las rutas permitidas deben renderizarse condicionalmente según el rol (Administrador, Mesero, Cocinero).
  - **RF-15 (Gestión de Empleados/Usuarios):** Administrar altas y bajas del personal del restaurante.

* **Requerimientos No Funcionales (RNF):**
  - **RNF-11 (Seguridad Frontend):** Las rutas protegidas deben usar Next.js Middleware para verificar la validez del JWT antes de renderizar la página.
  - **RNF-12 (Persistencia de Sesión):** Almacenamiento seguro del token de sesión (idealmente `httpOnly` cookies o almacenamiento de estado en cliente con encriptación leve).
  - **RNF-13 (Validación de Formularios):** Uso estricto de validación en el cliente (Zod + React Hook Form) para evitar peticiones inútiles al servidor.

* **Arquitectura Frontend Sugerida:**
  - **Vistas/Rutas (Next.js):** `/login`, `/registro`, `/admin/usuarios`.
  - **Componentes React:** `LoginForm`, `RoleGuard`, `SidebarNavigation`.
  - **Estrategia de estado:** Context API global para el perfil del usuario autenticado o NextAuth.js.
