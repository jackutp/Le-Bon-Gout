# INFORME DE PROYECTO FINAL

## 1. RESUMEN


---

## 2. PLANIFICACIÓN Y FRONT-END

### 2.1. ANÁLISIS EMPRESARIAL

#### 2.1.1. Análisis de Sistemas

**Sistemas actuales identificados:**
- Caja registradora física: Toast POS (versión antigua, 2018), sin actualizaciones desde 2021.
- Reservas: Resy (no integrado con POS ni inventario).
- Inventario: Excel manual (conteo semanal).
- Facturación: Toast sin facturación electrónica (problema con SUNAT).
- Costos: Excel + papel.
- CRM: No existe (solo libreta física).
- Compras: WhatsApp + correo + Excel.
- Mermas: Sin medición.
- Nómina: Excel + reloj manual.

**Principales problemas:**
- No hay integración.
- Pérdidas diarias: S/ 1,800 – S/ 4,500.
- Gerente pierde 4–5 horas/día conciliando.
- Sin análisis de rentabilidad por plato.
- Riesgo alto con SUNAT.

---

#### 2.1.2. Análisis de Procesos AS-IS

**Recepción y reservas:**
- Asignación manual de mesas.
- No identificación de clientes VIP.

**Pedidos y cocina:**
- Pedidos en papel.
- Sin control de tiempos.
- 30% de errores en modificaciones.

**Caja:**
- Digitación manual → errores altos.
- Propinas mal gestionadas.

**Inventario:**
- Conteo manual (8–10h).
- Sin stock mínimo.
- Compras sin histórico.

**Cierre:**
- Manual.
- Reportes tardíos.

**Cuellos de botella:**
- Dependencia de personas clave.
- Pérdida constante de información.

---

#### 2.1.3. Arquitectura Empresarial

**Módulos:**
- Facturación electrónica
- Reservas
- Inventario
- Compras
- Mapa de mesas
- Control de mermas
- BI (ventas, costos, rentabilidad)

**Tecnología:**
- Backend: Node.js
- Frontend: React
- BD: MySQL

**Beneficios:**
- -65% mermas (S/ 420k ahorro)
- -95% errores de caja
- +10% clientes VIP
- Food cost: 38% → 30%

---

#### 2.1.4. Innovación Tecnológica

- IA predictiva de demanda (94% precisión)
- NFT Membership VIP

---

### 2.2. PLANIFICACIÓN DE PROYECTOS

#### 2.2.1. Requerimientos

##### Funcionales:
- Reservas
- CRM
- Mapa en tiempo real
- Pedidos en tablet
- KDS
- POS electrónico
- Inventario en tiempo real
- Dashboard
- App empleados

##### No funcionales:
- 99.98% disponibilidad
- <800ms respuesta
- Seguridad AES-256
- Soporte 180 clientes simultáneos

---

#### 2.2.2. Calendarización


---

#### 2.2.3. SCRUM

**Duración:** 20 semanas  
**Sprint:** 2 semanas  

**Sprints:**
- Sprint 0: análisis + diseño
- Sprint 1-2: reservas + CRM
- Sprint 3-5: POS + pedidos
- Sprint 6-7: inventario
- Sprint 8: facturación
- Sprint 9: dashboard
- Sprint 10: testing

##### Artefactos:
- Product Backlog
- Sprint Backlog
- Incrementos

##### Eventos:
- Daily: 9:15 am
- Planning: lunes
- Review y Retro: viernes

---

### 2.3. DESARROLLO DE SOFTWARE

#### Infraestructura:
- Microservicios
- Gateway
- REST HTTPS

#### Plataforma:
- Vercel (frontend)
- Railway (backend + BD)

#### Herramientas:
- Git + GitHub
- Docker
- CI/CD
- Jira

#### Tecnologías:
- Next.js
- Spring Boot
- TypeScript
- Java

---

### 2.4. PROTOTIPOS

- Wireframes
- Mockups
- UX/UI

---

### 2.5. RIESGOS

- Desarrollo
- Despliegue
- Monitoreo

---

### 2.6. FRONT-END

- Buenas prácticas
- Prototipos

---

### 2.7. SLA

- Buenas prácticas

---

### 2.8. OPTIMIZACIÓN WEB

- WPO

---

## 3. DOCUMENTACIÓN

### 3.1. Scrum Team

### 3.2. Sprints

### 3.3. Monday

### 3.4. GitHub

- Commits
- Issues

### 3.5. Pruebas

- Unitarias
- Integrales
- Usabilidad
- Seguridad