# Diagrama de Gantt - Le Bon Gout

Metodología: **Scrum**  
Sistema de Gestión de Pedidos para Restaurante

---

## 1. Información General del Proyecto

| Campo | Detalle |
|-------|---------|
| **Nombre del Proyecto** | Le Bon Gout - Sistema de Gestión de Pedidos |
| **Duración Total** | 12 semanas (3 meses) |
| **Fecha de Inicio** | Semana 1 - Abril 2026 |
| **Fecha de Fin** | Semana 12 - Junio 2026 |
| **Sprints Totales** | 6 sprints de 2 semanas cada uno |
| **Metodología** | Scrum |

---

## 2. Cronograma General - Fases del Proyecto

### Vista General del Proyecto

```
ABRIL 2026                          MAYO 2026                           JUNIO 2026
Semana  Semana  Semana  Semana      Semana  Semana  Semana  Semana      Semana  Semana  Semana  Semana
  1      2      3      4            5      6      7      8            9      10     11     12
─────── ─────── ─────── ─────── ─────── ─────── ─────── ─────── ─────── ─────── ─────── ───────
│PLANEACIÓN│                          │                           │                          │
│  Sem 1   │                           │                           │                          │
───────────                            │                           │                           │
                                      │                           │                           │
│  DISEÑO   │                          │                           │                           │
│  Sem 2-3  │                           │                           │                           │
───────────                            │                           │                           │
                                      │                           │                           │
│  DESARROLLO│                          │                           │                           │
│  SPRINT 1  │                          │                           │                           │
│  Sem 4-5   │                          │                           │                           │
│  ───────────────────────────────    │                           │                           │
│           │  SPRINT 2                 │                           │                           │
│           │  Sem 6-7                  │                           │                           │
│           │  ─────────────────────────│─────────────────────────│                           │
│           │                          │  SPRINT 3                  │                           │
│           │                          │  Sem 8-9                   │                           │
│           │                          │  ─────────────────────────│─────────────────────────│
│           │                          │                          │  SPRINT 4                 │
│           │                          │                          │  Sem 10-11                │
│           │                          │                          │  ─────────────────────────│────
│           │                          │                          │                          │SPRINT│
│           │                          │                          │                          │  5   │
│           │                          │                          │                          │Sem12 │
│           │                          │                          │                          │      │
│  PRUEBAS │                          │                          │                          │      │
│  Sem 10-11│                          │                          │                          │      │
───────────                            │                          │                          │      │
                                      │                          │                          │      │
│  DEPLOY  │                          │                          │                          │      │
│  Sem 12  │                          │                          │                          │      │
───────────                            │                          │                          │      │
```

---

## 3. Sprint Breakdown Detallado

### SPRINT 1: Configuración y Fundamentos
**Duración:** Semanas 4-5 (2 semanas)  
**Objetivo:** Establecer la base del proyecto y crear la estructura inicial

| Tarea | Descripción | Semana | S1 | S2 | Dependencias | Responsabl |
|-------|-------------|--------|----|----|--------------|-------------|
| T1.1 | Configurar proyecto Next.js con TypeScript | 4 | ████ |    | - | Dev Team |
| T1.2 | Configurar Tailwind CSS y dependencias | 4 | ████ |    | T1.1 | Dev Team |
| T1.3 | Crear estructura de carpetas del proyecto | 4 | ████ |    | T1.2 | Dev Team |
| T1.4 | Implementar OrderContext para estado global | 4 | ████ |    | T1.3 | Dev Team |
| T1.5 | Crear componentes base (Navbar, Layout) | 4 | ████ |    | T1.3 | Dev Team |
| T1.6 | Implementar página de Login/Selección de rol | 5 |    | ████ | T1.5 | Dev Team |
| T1.7 | Configurar Google Fonts y sistema de diseño | 5 |    | ████ | T1.5 | Dev Team |
| T1.8 | Crear mockups iniciales de las vistas | 5 |    | ████ | T1.6 | UI/UX |
| T1.9 | Revisión y backlog refinement Sprint 2 | 5 |    | ████ | T1.1-T1.8 | Scrum Team |

**Definition of Done Sprint 1:**
- [ ] Proyecto Next.js configurado y ejecutándose
- [ ] Estructura de carpetas definida
- [ ] Contexto de estado global implementado
- [ ] Login funcional
- [ ] Code review aprobado

---

### SPRINT 2: Módulo Mesero - Funcionalidad Core
**Duración:** Semanas 6-7 (2 semanas)  
**Objetivo:** Completar todas las funcionalidades del módulo mesero

| Tarea | Descripción | Semana | S1 | S2 | Dependencias | Responsabl |
|-------|-------------|--------|----|----|--------------|-------------|
| T2.1 | Implementar catálogo de productos con grid responsivo | 6 | ████ |    | Sprint 1 | Dev Team |
| T2.2 | Crear lógica de carrito de pedidos | 6 | ████ |    | T2.1 | Dev Team |
| T2.3 | Implementar selector de mesa | 6 | ████ |    | T2.1 | Dev Team |
| T2.4 | Crear modal de confirmación de pedido | 6 | ████ |    | T2.2 | Dev Team |
| T2.5 | Implementar envío de pedido a contexto | 6 | ████ |    | T2.4 | Dev Team |
| T2.6 | Crear panel "Enviados" con lista de pedidos | 7 |    | ████ | T2.5 | Dev Team |
| T2.7 | Implementar edición de cantidades en enviado | 7 |    | ████ | T2.6 | Dev Team |
| T2.8 | Sincronizar stock al modificar cantidades | 7 |    | ████ | T2.7 | Dev Team |
| T2.9 | Agregar indicadores de stock en productos | 7 |    | ████ | T2.1 | Dev Team |
| T2.10 | Pruebas y ajustes de UI/UX | 7 |    | ████ | T2.1-T2.9 | Dev Team |

**Definition of Done Sprint 2:**
- [ ] Catálogo de productos visible y funcional
- [ ] Pedidos se pueden crear y enviar a cocina
- [ ] Panel "Enviados" muestra pedidos activos
- [ ] Stock se reduce al enviar pedido
- [ ] Stock se sincroniza al editar cantidades

---

### SPRINT 3: Módulo Cocina (KDS)
**Duración:** Semanas 8-9 (2 semanas)  
**Objetivo:** Implementar el sistema de visualización de comandas para cocina

| Tarea | Descripción | Semana | S1 | S2 | Dependencias | Responsabl |
|-------|-------------|--------|----|----|--------------|-------------|
| T3.1 | Crear vista de comandas pendientes | 8 | ████ |    | Sprint 2 | Dev Team |
| T3.2 | Implementar display de items por orden | 8 | ████ |    | T3.1 | Dev Team |
| T3.3 | Crear sistema de toggle para items | 8 | ████ |    | T3.2 | Dev Team |
| T3.4 | Implementar botón "Servir Mesa" | 8 | ████ |    | T3.3 | Dev Team |
| T3.5 | Agregar indicador de tiempo de espera | 8 | ████ |    | T3.1 | Dev Team |
| T3.6 | Implementar animaciones de transición | 9 |    | ████ | T3.4 | Dev Team |
| T3.7 | Crear estados visuales por estado de orden | 9 |    | ████ | T3.1-T3.5 | Dev Team |
| T3.8 | Sincronización en tiempo real (polling) | 9 |    | ████ | T3.1 | Dev Team |
| T3.9 | Pruebas de integración Mesero-Cocina | 9 |    | ████ | T3.1-T3.8 | Dev Team |
| T3.10 | Ajustes finales de UX para cocina | 9 |    | ████ | T3.9 | Dev Team |

**Definition of Done Sprint 3:**
- [ ] Cocina recibe pedidos en tiempo real
- [ ] Items se pueden marcar como completados
- [ ] Orden se puede marcar como servida
- [ ] Tiempo de espera visible
- [ ] Flujo Mesero → Cocina funciona end-to-end

---

### SPRINT 4: Módulo Admin
**Duración:** Semanas 10-11 (2 semanas)  
**Objetivo:** Implementar panel de administración completo

| Tarea | Descripción | Semana | S1 | S2 | Dependencias | Responsabl |
|-------|-------------|--------|----|----|--------------|-------------|
| T4.1 | Crear estructura de navegación admin | 10 | ████ |    | Sprint 3 | Dev Team |
| T4.2 | Implementar vista de Inventario | 10 | ████ |    | T4.1 | Dev Team |
| T4.3 | Crear vista de Editor de Carta | 10 | ████ |    | T4.1 | Dev Team |
| T4.4 | Implementar CRUD de platillos (Add/Edit/Delete) | 10 | ████ |    | T4.3 | Dev Team |
| T4.5 | Sincronizar menú con contexto global | 10 | ████ |    | T4.4 | Dev Team |
| T4.6 | Crear vista de Gestión de Personal | 11 |    | ████ | T4.1 | Dev Team |
| T4.7 | Implementar Dashboard con métricas | 11 |    | ████ | T4.1 | Dev Team |
| T4.8 | Crear vista de Reservas | 11 |    | ████ | T4.1 | Dev Team |
| T4.9 | Implementar registro de Mermas | 11 |    | ████ | T4.1 | Dev Team |
| T4.10 | Crear vista de Proveedores | 11 |    | ████ | T4.1 | Dev Team |

**Definition of Done Sprint 4:**
- [ ] Navegación admin completa y responsiva
- [ ] Inventario muestra stock en tiempo real
- [ ] Editor de carta permite CRUD de platillos
- [ ] Cambios en admin se reflejan en Mesero y Home
- [ ] Todas las vistas administrativas funcionales

---

### SPRINT 5: Página Principal y Refinamiento
**Duración:** Semana 12 (1 semana)  
**Objetivo:** Completar página home y polish general

| Tarea | Descripción | Semana | S1 | Dependencias | Responsabl |
|-------|-------------|--------|----|--------------|-------------|
| T5.1 | Implementar menú desde contexto | 12 | ████ | Sprint 4 | Dev Team |
| T5.2 | Agregar secciones de información | 12 | ████ | T5.1 | Dev Team |
| T5.3 | Implementar modal de reclutamiento | 12 | ████ | T5.1 | Dev Team |
| T5.4 | Agregar modal libro de reclamaciones | 12 | ████ | T5.1 | Dev Team |
| T5.5 | Responsive design general | 12 | ████ | T5.1-T5.4 | Dev Team |
| T5.6 | Testing E2E del flujo completo | 12 | ████ | Sprints 1-4 | QA Team |
| T5.7 | Corrección de bugs encontrados | 12 | ████ | T5.6 | Dev Team |
| T5.8 | Optimización de performance | 12 | ████ | T5.7 | Dev Team |
| T5.9 | Documentación final | 12 | ████ | All | Dev Team |

**Definition of Done Sprint 5:**
- [ ] Página home completa
- [ ] Menú sincronizado con contexto
- [ ] Responsive en todos los módulos
- [ ] No hay bugs críticos
- [ ] Documentación actualizada

---

## 4. Diagrama de Gantt Visual Detallado

```
LEYENDA: ████ = Activo    ─── = Duración    │ = Hito

╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
║                              PROYECTO: LE BON GOUT                                               ║
║                              Duración: 12 Semanas                                               ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════╝

 FASES           TAREA                    SEMANA 1  2  3  4  5  6  7  8  9  10 11 12
─────────────────────────────────────────────────────────────────────────────────────────────────────
                 
  FASE 1         Configurar Next.js       ████
  PLANIFICACIÓN  Estructura carpetas      ████
                 Definir backlog           ████
─────────────────────────────────────────────────────────────────────────────────────────────────────
                 
  FASE 2         Wireframes UI             ───────████
  DISEÑO         Sistema de diseño         ───────████
                 Mockups alta fidelidad     ───────────████
─────────────────────────────────────────────────────────────────────────────────────────────────────
                 
  FASE 3         Sprint 1: Fundamentos    ───────────────██████
  DESARROLLO     Sprint 2: Mesero          ─────────────────────────██████
                 Sprint 3: Cocina          ─────────────────────────────────────██████
                 Sprint 4: Admin           ───────────────────────────────────────────────████████
                 Sprint 5: Home + Polish   ─────────────────────────────────────────────────────████████
─────────────────────────────────────────────────────────────────────────────────────────────────────
                 
  FASE 4         Testing Unitario          ────────────────────────────────████
  PRUEBAS        Testing Integración        ───────────────────────────────────────████
                 Testing E2E                 ─────────────────────────────────────────────────────████
─────────────────────────────────────────────────────────────────────────────────────────────────────
                 
  FASE 5         Deploy Producción          ─────────────────────────────────────────────────────────────────████
  DEPLOY         Documentación Final        ─────────────────────────────────────────────────────────────────████
─────────────────────────────────────────────────────────────────────────────────────────────────────
```

---

## 5. Tabla de Hitos (Milestones)

| Hito | Fecha | Descripción | Criterio de Éxito |
|------|-------|-------------|-------------------|
| M1 | Fin Semana 3 | **Fin Fase Planeación** | Backlog completo, wireframes aprobados |
| M2 | Fin Semana 5 | **Sprint 1 Done** | Base del proyecto funcionando |
| M3 | Fin Semana 7 | **Sprint 2 Done** | Mesero puede tomar y enviar pedidos |
| M4 | Fin Semana 9 | **Sprint 3 Done** | Cocina recibe y procesa pedidos |
| M5 | Fin Semana 11 | **Sprint 4 Done** | Admin completo con CRUD |
| M6 | Fin Semana 12 | **Release v1.0** | Sistema completo deployed |

---

## 6. Diagrama de Dependencias

```
                    ┌─────────────────┐
                    │  Configurar     │
                    │  Proyecto       │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  Estructura     │
                    │  Carpetas       │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
     ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
     │  Navbar     │ │  Order      │ │  Layout     │
     │  Component  │ │  Context    │ │  Base       │
     └──────┬──────┘ └──────┬──────┘ └─────────────┘
            │               │
            │               ▼
            │      ┌─────────────────┐
            │      │  Módulo Mesero  │
            │      │  (Catálogo +    │
            │      │   Carrito)      │
            │      └────────┬────────┘
            │               │
            │               ▼
            │      ┌─────────────────┐
            │      │  Módulo Cocina   │
            │      │  (KDS)          │
            │      └────────┬────────┘
            │               │
            ▼               ▼
     ┌─────────────────────────────────┐
     │       Módulo Admin              │
     │  (Inventario + Menú + Dashboard)│
     └─────────────────┬───────────────┘
                       │
                       ▼
              ┌─────────────────┐
              │  Página Home    │
              │  (Público)       │
              └─────────────────┘
```

---

## 7. Recursos por Sprint

| Sprint | Dev Team | QA | Diseño | Total Horas |
|-------|----------|-----|--------|-------------|
| Sprint 1 | 2 | 0 | 1 | 120 hrs |
| Sprint 2 | 2 | 1 | 0 | 100 hrs |
| Sprint 3 | 2 | 1 | 0 | 100 hrs |
| Sprint 4 | 2 | 1 | 0 | 100 hrs |
| Sprint 5 | 2 | 1 | 1 | 80 hrs |
| **Total** | - | - | - | **500 hrs** |

---

## 8. Matriz de Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Retraso en configuración inicial | Media | Alto | Seguir guía de setup |
| Cambios en requisitos | Alta | Alto | Backlog refinement frecuente |
| Bugs en sincronización de estado | Media | Alto | Testing exhaustivo |
| Problemas de performance | Baja | Medio | Optimización continua |
| Dependencias no resueltas | Baja | Alto | Revisión de código frecuente |

---

## 9. Tabla de Avance Semanal

| Semana | Sprint | Entregable | % Completado | Estado |
|--------|--------|------------|--------------|--------|
| 1 | - | Plan de proyecto, backlog inicial | 8% | ✅ |
| 2 | - | Wireframes, sistema de diseño | 17% | ✅ |
| 3 | - | Mockups, arquitectura | 25% | ✅ |
| 4 | Sprint 1 | Config, estructura base | 33% | ✅ |
| 5 | Sprint 1 | Login, contexto | 42% | ✅ |
| 6 | Sprint 2 | Catálogo, carrito | 50% | ✅ |
| 7 | Sprint 2 | Panel enviado, stock sync | 58% | ✅ |
| 8 | Sprint 3 | KDS básico | 67% | ✅ |
| 9 | Sprint 3 | KDS completo, animaciones | 75% | ✅ |
| 10 | Sprint 4 | Admin inventario, menú | 83% | ✅ |
| 11 | Sprint 4 | Admin completo | 92% | ✅ |
| 12 | Sprint 5 | Home, polish, deploy | 100% | ✅ |

---

## 10. Comandos de Seguimiento

```bash
# Ver estado del sprint actual
npm run sprint:status

# Ver métricas del proyecto
npm run project:metrics

# Generar reporte de progreso
npm run report:progress

# Iniciar desarrollo
npm run dev

# Build para producción
npm run build

# Deploy
npm run deploy
```

---

## Versión del Documento

| Versión | Fecha | Autor | Cambios |
|---------|-------|-------|---------|
| 1.0 | 22/04/2026 | Development Team | Versión inicial |

---

*Este documento representa el cronograma completo del proyecto Le Bon Gout, siguiendo la metodología Scrum con sprints de 2 semanas cada uno.*