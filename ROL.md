# Roles del Proyecto - Le Bon Gout

Metodología: **Scrum**  
Sistema de Gestión de Pedidos para Restaurante

---

## Descripción General del Proyecto

El proyecto "Le Bon Gout" es un sistema de gestión de pedidos para un restaurante de alta cocina. El sistema está diseñado para facilitar la comunicación entre tres áreas principales: **Mesero**, **Cocina** y **Administración**.

### Eventos Scrum del Proyecto

| Evento | Frecuencia | Duración |
|--------|------------|----------|
| Sprint Planning | Semanal | 2 horas |
| Daily Scrum | Diaria | 15 minutos |
| Sprint Review | Semanal | 1 hora |
| Sprint Retrospective | Semanal | 45 minutos |

### Artefactos Principales

- **Product Backlog**: Lista priorizada de todas las funcionalidades del sistema
- **Sprint Backlog**: Tareas seleccionadas para el sprint actual
- **Incremento**: Funcionalidad completada al final de cada sprint

---

## ROL 1: Mesero (Waiter)

### Descripción del Rol

El **Mesero** es el usuario más frecuente del sistema. Es responsable de tomar pedidos en mesa, enviarlos a cocina y hacer seguimiento de los pedidos enviados.

### Responsabilidades Principales

| # | Responsabilidad | Prioridad | Descripción |
|---|-----------------|----------|-------------|
| 1 | Tomar pedidos | Alta | Seleccionar productos del catálogo y registrarlos para una mesa específica |
| 2 | Enviar pedidos a cocina | Alta | Confirmar y enviar pedidos al módulo de cocina |
| 3 | Modificar pedidos enviados | Media | Ajustar cantidades o cancelar items de pedidos ya enviados |
| 4 | Consultar estado de pedidos | Media | Revisar qué pedidos están en preparación o completados |
| 5 | Gestionar stock local | Alta | El sistema reduce automáticamente el stock al enviar pedidos |

### Historias de Usuario

#### US-M001: Tomar pedido en mesa
```
Como: Mesero
Quiero: Seleccionar productos del catálogo y agregarlos a un pedido
Para: Registrar los pedidos de los clientes de forma digital
```

**Criterios de Aceptación:**
- [ ] Puedo seleccionar una mesa del menú desplegable
- [ ] Puedo ver todos los productos disponibles con su stock
- [ ] Puedo agregar productos al pedido con el botón (+)
- [ ] Puedo reducir la cantidad de un producto con el botón (-)
- [ ] El stock disponible se actualiza en tiempo real
- [ ] El total del pedido se calcula automáticamente

#### US-M002: Enviar pedido a cocina
```
Como: Mesero
Quiero: Confirmar y enviar el pedido a cocina
Para: Que la cocina comience a preparar los platillos
```

**Criterios de Aceptación:**
- [ ] Veo un modal de confirmación antes de enviar
- [ ] El modal muestra el desglose del pedido
- [ ] Al confirmar, el pedido aparece en el módulo de cocina
- [ ] Recibo una confirmación visual/alerta del envío exitoso
- [ ] El pedido se marca como "Enviado" en el panel de enviados
- [ ] El stock se reduce automáticamente al enviar

#### US-M003: Modificar pedido enviado
```
Como: Mesero
Quiero: Modificar las cantidades de items en pedidos ya enviados
Para: Ajustar el pedido si el cliente cambia de opinión
```

**Criterios de Aceptación:**
- [ ] Puedo acceder al panel "Enviados"
- [ ] Puedo aumentar/disminuir cantidades de items enviados
- [ ] Al reducir cantidad, el stock aumenta
- [ ] Al aumentar cantidad, el stock disminuye
- [ ] Los cambios se reflejan inmediatamente en cocina

#### US-M004: Seguimiento de pedidos
```
Como: Mesero
Quiero: Ver el estado de todos mis pedidos enviados
Para: Saber qué está en preparación y qué está completado
```

**Criterios de Aceptación:**
- [ ] Puedo ver la lista de pedidos pendientes
- [ ] Puedo ver la lista de pedidos completados
- [ ] Cada pedido muestra mesa, hora y lista de items
- [ ] El estado se actualiza en tiempo real

### Permisos en el Sistema

| Permiso | Estado |
|---------|--------|
| Ver catálogo de productos | ✅ |
| Agregar items al pedido | ✅ |
| Enviar pedido a cocina | ✅ |
| Modificar pedidos enviados | ✅ |
| Ver inventario | ❌ |
| Editar menú | ❌ |
| Gestionar personal | ❌ |
| Ver métricas/dashboard | ❌ |

### Puntos de Historia Asignados

- **Capacidad del Sprint**: 13 puntos
- **Tareas del Sprint**:
  - US-M001: Tomar pedido (5 pts)
  - US-M002: Enviar a cocina (5 pts)
  - US-M003: Modificar enviado (3 pts)

---

## ROL 2: Cocinero / Kitchen Display System (KDS)

### Descripción del Rol

El **Cocinero** es el responsable de recibir las comandas, preparar los platillos y marcar su progreso. Utiliza un sistema visual (KDS) para ver los pedidos pendientes y manage su flujo de trabajo.

### Responsabilidades Principales

| # | Responsabilidad | Prioridad | Descripción |
|---|-----------------|----------|-------------|
| 1 | Recibir comandas | Alta | Ver todos los pedidos enviados por meseros |
| 2 | Marcar items completados | Alta | Indicar qué items de cada orden están listos |
| 3 | Servir orden completa | Alta | Marcar orden como servida cuando todos los items están listos |
| 4 | Ver tiempo de espera | Media | Visualizar cuánto tiempo ha pasado desde el envío |
| 5 | Priorizar pedidos | Media | Identificar pedidos más antiguos |

### Historias de Usuario

#### US-K001: Recibir comanda
```
Como: Cocinero
Quiero: Ver automáticamente los pedidos enviados por meseros
Para: Saber qué platillos preparar sin necesidad de comunicación verbal
```

**Criterios de Aceptación:**
- [ ] Las comandas nuevas aparecen automáticamente
- [ ] Veo el número de mesa claramente
- [ ] Veo la hora de envío de la comanda
- [ ] Veo la lista completa de items con cantidades
- [ ] Las notas especiales se muestran destacadas
- [ ] Escucho una alerta sonora/nueva comanda

#### US-K002: Marcar items completados
```
Como: Cocinero
Quiero: Tocar un item para marcarlo como completado
Para: Llevar un control del progreso de cada platillo
```

**Criterios de Aceptación:**
- [ ] Puedo tocar un item para marcarlo como completado
- [ ] El item cambia visualmente (estilo tachado, opacidad)
- [ ] Puedo desmarcar un item si me equivoqué
- [ ] El progreso es visible para toda la cocina
- [ ] El estado se guarda automáticamente

#### US-K003: Servir orden
```
Como: Cocinero
Quiero: Marcar la orden completa como "Servida"
Para: Notificar al mesero que el pedido está listo
```

**Criterios de Aceptación:**
- [ ] El botón "Servir Mesa" está habilitado solo cuando todos los items están marcados
- [ ] Al servir, la orden desaparece de la vista activa
- [ ] La orden se marca como completada en el sistema
- [ ] El mesero recibe notificación de orden lista

#### US-K004: Ver tiempo de espera
```
Como: Cocinero
Quiero: Ver cuánto tiempo lleva cada pedido
Para: Priorizar pedidos más antiguos
```

**Criterios de Aceptación:**
- [ ] Cada comanda muestra la hora de creación
- [ ] Veo el tiempo transcurrido desde el envío
- [ ] Pedidos antiguos se identifican fácilmente
- [ ] Puedo ordenar comandas por tiempo si es necesario

### Permisos en el Sistema

| Permiso | Estado |
|---------|--------|
| Ver comandas pendientes | ✅ |
| Marcar items como completados | ✅ |
| Servir orden completa | ✅ |
| Modificar pedido | ❌ |
| Ver catálogo de productos | ❌ |
| Editar menú | ❌ |
| Gestionar inventario | ❌ |
| Ver métricas | ❌ |

### Puntos de Historia Asignados

- **Capacidad del Sprint**: 8 puntos
- **Tareas del Sprint**:
  - US-K001: Recibir comanda (3 pts)
  - US-K002: Marcar items (2 pts)
  - US-K003: Servir orden (2 pts)
  - US-K004: Ver tiempo (1 pt)

---

## ROL 3: Administrador (Admin)

### Descripción del Rol

El **Administrador** tiene control total sobre el sistema. Es responsable de gestionar el inventario, el menú, el personal, las reservas y supervisar las métricas del restaurante.

### Responsabilidades Principales

| # | Responsabilidad | Prioridad | Descripción |
|---|-----------------|----------|-------------|
| 1 | Gestionar inventario | Alta | Controlar stock de ingredientes e insumos |
| 2 | Editar carta/menú | Alta | Agregar, modificar o eliminar platillos |
| 3 | Gestionar personal | Media | Registrar meseros y cocineros |
| 4 | Ver métricas | Media | Supervisar ventas y rendimiento |
| 5 | Gestionar reservas | Media | Ver y asignar reservas de mesas |
| 6 | Control de mermas | Media | Registrar productos desperdiciados |
| 7 | Gestionar proveedores | Baja | Directorio de proveedores y facturas |

### Historias de Usuario

#### US-A001: Gestionar inventario
```
Como: Administrador
Quiero: Ver y gestionar el stock de todos los insumos
Para: Mantener el control de las existencias del restaurante
```

**Criterios de Aceptación:**
- [ ] Veo una tabla con todos los insumos
- [ ] Puedo ver stock actual de cada item
- [ ] Veo alertas cuando el stock está crítico (< 10)
- [ ] El inventario se sincroniza con los pedidos del mesero
- [ ] Puedo filtrar por categoría si es necesario

#### US-A002: Editar carta del restaurante
```
Como: Administrador
Quiero: Agregar, modificar y eliminar platillos del menú
Para: Mantener actualizada la carta del restaurante
```

**Criterios de Aceptación:**
- [ ] Veo todos los platillos en el editor de carta
- [ ] Puedo agregar nuevos platillos con imagen, nombre, precio, descripción
- [ ] Puedo editar platillos existentes
- [ ] Puedo eliminar platillos con confirmación
- [ ] Los cambios se reflejan inmediatamente en el catálogo del mesero
- [ ] Los cambios se reflejan en la página principal

#### US-A003: Registrar mermas
```
Como: Administrador
Quiero: Registrar productos desperdiciados o cancelados
Para: Tener control sobre las pérdidas del restaurante
```

**Criterios de Aceptación:**
- [ ] Puedo registrar un producto perdido
- [ ] Ingreso cantidad y motivo de la merma
- [ ] La fecha y hora se registran automáticamente
- [ ] Puedo ver el historial de mermas
- [ ] Las mermas afectan el inventario

#### US-A004: Ver dashboard de métricas
```
Como: Administrador
Quiero: Ver las métricas y KPIs del restaurante
Para: Tomar decisiones basadas en datos
```

**Criterios de Aceptación:**
- [ ] Veo ventas del día
- [ ] Veo número de órdenes completadas
- [ ] Veo ticket promedio
- [ ] Veo gráfico de ventas semanales
- [ ] Veo productos más vendidos

#### US-A005: Gestionar personal
```
Como: Administrador
Quiero: Registrar y gestionar el personal
Para: Mantener un control de los empleados activos
```

**Criterios de Aceptación:**
- [ ] Puedo ver lista de meseros y cocineros
- [ ] Puedo registrar nuevo personal
- [ ] Puedo ver estadísticas por empleado (pedidos del día)
- [ ] Puedo asignar roles y permisos

#### US-A006: Gestionar reservas
```
Como: Administrador
Quiero: Ver y asignar reservas de mesas
Para: Organizar la disponibilidad del restaurante
```

**Criterios de Aceptación:**
- [ ] Veo calendario con fechas de reservas
- [ ] Puedo seleccionar una fecha y ver reservas
- [ ] Puedo asignar reserva a una mesa
- [ ] Puedo crear nuevas reservas

### Permisos en el Sistema

| Permiso | Estado |
|---------|--------|
| Gestionar inventario | ✅ |
| Editar menú/carta | ✅ |
| Gestionar personal | ✅ |
| Ver métricas | ✅ |
| Gestionar reservas | ✅ |
| Registrar mermas | ✅ |
| Gestionar proveedores | ✅ |
| Tomar pedidos | ❌ |
| Preparar platillos | ❌ |

### Puntos de Historia Asignados

- **Capacidad del Sprint**: 21 puntos
- **Tareas del Sprint**:
  - US-A001: Gestionar inventario (5 pts)
  - US-A002: Editar carta (5 pts)
  - US-A003: Registrar mermas (3 pts)
  - US-A004: Ver dashboard (5 pts)
  - US-A005: Gestionar personal (3 pts)

---

## Resumen de Capacidades por Sprint

| Rol | Capacidad del Sprint | Puntos Totales |
|-----|---------------------|----------------|
| Mesero | 13 pts | 13 pts |
| Cocinero | 8 pts | 8 pts |
| Administrador | 21 pts | 21 pts |
| **Total** | **42 pts** | **42 pts** |

---

## Sprint Backlog Ejemplo - Sprint 1

### Objetivo del Sprint
> Conectar los tres módulos (Mesero, Cocina, Admin) para flujo de pedidos completo

| ID | Historia | Rol | Puntos | Estado |
|----|----------|-----|--------|--------|
| US-M001 | Tomar pedido | Mesero | 5 | To Do |
| US-M002 | Enviar a cocina | Mesero | 5 | To Do |
| US-K001 | Recibir comanda | Cocinero | 3 | To Do |
| US-K002 | Marcar items | Cocinero | 2 | To Do |
| US-A001 | Gestionar inventario | Admin | 5 | To Do |
| US-A002 | Editar carta | Admin | 5 | To Do |
| US-A004 | Ver dashboard | Admin | 5 | To Do |

### Definition of Done (DoD)

Para cada historia de usuario, se considera **Done** cuando:

- [ ] El código está completo y комmitед
- [ ] Todas las pruebas pasan
- [ ] No hay errores de TypeScript
- [ ] El diseño es responsive
- [ ] Funciona en los navegadores objetivo
- [ ] El código sigue las convenciones del proyecto
- [ ] Documentación actualizada si es necesario

---

## Diagrama de Flujo de Interacciones

```
┌─────────────┐
│    HOME      │  ← Página pública (clientes)
│  Página      │
└──────┬──────┘
       │ usa menú del contexto
       ▼
┌─────────────┐
│  MODULO      │  ← Edita carta
│   ADMIN      │
└──────┬──────┘
       │ sincroniza
       ▼
┌─────────────┐
│  MODULO      │  ← Toma pedidos
│   MESERO     │  ← Envía a cocina
└──────┬──────┘  ← Sincroniza stock
       │
       ▼
┌─────────────┐
│  MODULO      │  ← Recibe pedidos
│   COCINA     │  ← Prepara y sirve
└─────────────┘
```

---

## Tabla de Tecnologías y Herramientas

| Categoría | Herramienta | Uso |
|-----------|-------------|-----|
| Framework | Next.js 14+ | Frontend completo |
| Estilos | Tailwind CSS | Diseño responsivo |
| Animaciones | Framer Motion | Transiciones y efectos |
| Iconos | Lucide React | Sistema de iconos |
| Estado Global | React Context | Gestión de estado compartido |
| Tipografía | Google Fonts | Playfair Display, Geist |

---

## Versión del Documento

| Versión | Fecha | Autor | Cambios |
|---------|-------|-------|---------|
| 1.0 | 22/04/2026 | Development Team | Versión inicial |

---

*Este documento sigue la metodología Scrum y está diseñado para guiar el desarrollo del sistema de gestión de pedidos del restaurante Le Bon Gout.*