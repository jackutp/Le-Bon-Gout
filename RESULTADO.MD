# RESULTADO: INFORME DE PROYECTO FINAL - LE BON GOÛT ERP

## 1. RESUMEN
El presente proyecto consiste en el desarrollo del sistema ERP y plataforma web "Le Bon Goût" para la gestión integral de un restaurante de lujo. El sistema permite administrar reservas, toma de pedidos por parte de meseros, visualización de comandas en cocina (KDS), facturación electrónica, y un panel de administración completo para inventario y métricas BI. El Frontend se desarrolló utilizando React/Next.js y el backend con Spring Boot/Java y Node.js, desplegado mediante una arquitectura de microservicios.

---

## 2. PLANIFICACIÓN Y FRONT-END

### 2.1. ANÁLISIS EMPRESARIAL

#### 2.1.1. Análisis de Sistemas
**Sistemas actuales identificados:**
- **Caja registradora:** Toast POS (versión antigua 2018), sin actualizaciones.
- **Reservas:** Resy (sin integración con POS ni inventario).
- **Inventario, Costos y Nómina:** Excel manual.
- **Facturación:** Toast sin facturación electrónica (generando riesgos con SUNAT).
- **CRM:** Inexistente (solo libreta física).
- **Compras:** WhatsApp, correo y Excel.
**Principales problemas:** Falta de integración, pérdidas diarias de S/ 1,800 a S/ 4,500, gerente pierde 4-5 horas al día conciliando, riesgo con SUNAT y nulo análisis de rentabilidad por plato.

#### 2.1.2. Análisis de Procesos AS-IS
- **Recepción y reservas:** Asignación manual de mesas, sin identificar clientes VIP.
- **Pedidos y cocina:** Uso de papel, sin control de tiempos, 30% de errores en modificaciones.
- **Caja & Cierre:** Digitación manual con altos errores, propinas mal gestionadas, reportes tardíos y manuales.
- **Inventario:** Conteo manual lento (8-10h), sin stock mínimo ni histórico de compras.
- **Cuellos de botella:** Fuerte dependencia de personas clave y pérdida constante de información.

#### 2.1.3. Arquitectura Empresarial
- **Módulos propuestos:** Facturación electrónica, Reservas, Inventario, Compras, Mapa de mesas, Control de mermas, BI (ventas, costos, rentabilidad).
- **Tecnología base:** Backend en Node.js, Frontend en React, BD MySQL.
- **Beneficios esperados:** Reducción del 65% en mermas (S/ 420k de ahorro), -95% en errores de caja, aumento del 10% en clientes VIP, y optimización del Food cost (de 38% a 30%).

#### 2.1.4. Innovación Tecnológica
- IA predictiva de demanda (94% de precisión).
- NFT Membership VIP.

---

### 2.2. PLANIFICACIÓN DE PROYECTOS

#### 2.2.1. Gestión de Requerimientos
- **Funcionales:** Reservas, CRM, Mapa en tiempo real, Pedidos en tablet, KDS, POS electrónico, Inventario en tiempo real, Dashboard, App empleados.
- **No Funcionales:** 99.98% de disponibilidad, tiempos de respuesta <800ms, cifrado de seguridad AES-256, soporte para 180 clientes simultáneos.

#### 2.2.2. Calendarización
(Mapeado a través de los Sprints definidos en Scrum, estructurando el proyecto en un lapso de 20 semanas).

#### 2.2.3. Desarrollo Ágil SCRUM
- **Duración y Sprints:** Proyecto de 20 semanas en Sprints de 2 semanas. (Sprint 0: análisis/diseño, Sprints 1-2: reservas/CRM, Sprints 3-5: POS/pedidos, Sprints 6-7: inventario, Sprint 8: facturación, Sprint 9: dashboard, Sprint 10: testing).
- **Artefactos:** Product Backlog, Sprint Backlog e Incrementos.
- **Eventos:** Daily a las 9:15 am, Planning los lunes, Review y Retro los viernes.

---

### 2.3. DESARROLLO DE SOFTWARE

- **Infraestructura:** Arquitectura de Microservicios, API Gateway y protocolo REST HTTPS.
- **Plataforma:** Vercel (Frontend) y Railway (Backend + BD).
- **Herramientas:** Git + GitHub, Docker, CI/CD, Jira.
- **Tecnologías:** Next.js, Spring Boot, TypeScript, Java.

---

### 2.4. PROTOTIPOS

Se emplearon **Wireframes** y **Mockups** para definir la interfaz, aplicando principios avanzados de **UX/UI** y un diseño intuitivo orientado al lujo.

---

### 2.5. RIESGOS

Se contemplan estrategias de mitigación para riesgos en **Desarrollo**, **Despliegue** y **Monitoreo**, asegurando la estabilidad del sistema en cada pase a producción.

---

### 2.6. FRONT-END

Implementación basada en **Buenas prácticas** de React/Next.js y conversión fiel de los **Prototipos** web en componentes interactivos y responsivos.

---

### 2.7. SLA

Definición de **Buenas prácticas** y acuerdos de niveles de servicio (SLA) para garantizar la operatividad de los módulos críticos como el KDS y el POS.

---

### 2.8. OPTIMIZACIÓN WEB

Aplicación de **WPO (Web Performance Optimization)** para asegurar la carga rápida de las vistas, crucial para la atención fluida en el restaurante.

---

## 3. DOCUMENTACIÓN

### 3.1. Scrum Team
Equipo de desarrollo alineado con las ceremonias ágiles.

### 3.2. Sprints
Seguimiento y cierre de iteraciones según lo planificado en las 20 semanas.

### 3.3. Monday
Uso de tableros de gestión visual para seguimiento de tareas a nivel gerencial.

### 3.4. GitHub
- **Commits:** Historial de versionamiento y despliegues.
- **Issues:** Gestión de tickets para resolución de bugs.

### 3.5. Pruebas
- **Unitarias e Integrales:** Validación del código en Frontend y Backend.
- **Usabilidad:** Pruebas de campo con los prototipos y producto final.
- **Seguridad:** Verificación de vulnerabilidades y encriptación de datos.
