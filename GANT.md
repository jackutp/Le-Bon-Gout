Actúa como un Software Architect Senior especializado en:
- Microservicios con Spring Boot
- Arquitectura distribuida
- Sistemas de restaurantes premium
- Event-Driven Architecture
- Domain-Driven Design (DDD)
- Comunicación síncrona y asíncrona
- Frontend Next.js + Backend Spring Cloud

Tu objetivo NO es programar todavía.
Tu objetivo es analizar completamente mi frontend actual y luego diseñar una propuesta de backend profesional basada en microservicios.

# PASO 1 — ANALIZAR TODO EL FRONTEND

Primero debes leer y analizar TODO mi proyecto frontend.

Necesito que entiendas:
- arquitectura
- flujo de datos
- manejo de estados
- componentes
- contexto global
- interacción entre módulos
- lógica de pedidos
- flujo cocina → mesero
- flujo productos → orden
- estados de mesas
- estados de pedidos
- modales
- estructura UI/UX
- entidades implícitas
- reglas de negocio implícitas

# PASO 2 — ENFOCARSE EN ESTOS ARCHIVOS Y MÓDULOS

Después de analizar todo el proyecto, enfócate especialmente en:

src/app/cocina
src/app/mesero
src/context/OrderContext.tsx

Debes entender profundamente:
- cómo se crean las órdenes
- cómo se agregan productos
- cómo se manejan los estados
- cómo cocina recibe pedidos
- cómo cocina actualiza estados
- cómo mesero interactúa con cocina
- cómo se renderizan mesas y órdenes
- cómo se manejaría concurrencia
- cómo se manejarían eventos en tiempo real

# PASO 3 — EDITAR EL ARCHIVO Implementacion.md

Luego de analizar TODO el frontend y enfocarte en los módulos indicados, debes editar:

Implementacion.md

Y convertirlo en un documento técnico profesional que proponga la arquitectura backend completa.

# IMPORTANTE

NO quiero una explicación genérica.

Quiero que la propuesta:
- esté basada en MI frontend real
- respete MI flujo actual
- respete MI lógica actual
- respete MI arquitectura actual
- proponga mejoras reales
- piense como arquitectura empresarial escalable

# CONTEXTO ACTUAL DE MIS MICROSERVICIOS

Ya tengo implementados:

- eureka
- gateway
- proveedores
- eventos
- insumos
- mermas
- productos
- reservas

Debes considerar estos microservicios como existentes.

# CONSIDERACIONES IMPORTANTES

## MESERO

En mi opinión:

El módulo mesero solamente debería conectarse mediante:

spring-cloud-starter-openfeign

con el microservicio:

productos

Porque ahí se encuentran:
- platos
- bebidas
- postres

Analiza si esta decisión es correcta arquitectónicamente.

Si NO lo es:
- explica por qué
- propone una mejor arquitectura
- justifica técnicamente

## COCINA

En mi opinión:

cocina debería conectarse con mesero,
ya que mesero es quien envía los pedidos a cocina.

Analiza:
- si esta relación es correcta
- si debería existir un microservicio intermedio
- si debería manejarse mediante eventos
- si debería usarse mensajería
- si debería existir orchestration vs choreography
- cómo manejar estados de pedidos
- cómo manejar concurrencia
- cómo manejar tiempo real
- cómo evitar acoplamiento fuerte

# OBJETIVOS DEL DOCUMENTO

El archivo Implementacion.md debe incluir:

## 1. Arquitectura General

- propuesta completa
- explicación de responsabilidades
- bounded contexts
- separación de dominios

## 2. Microservicios Recomendados

Indica:
- cuáles ya existen
- cuáles faltan
- cuáles deberían dividirse
- cuáles deberían fusionarse

## 3. Flujo Completo de Pedidos

Desde:
- selección de productos
- creación de orden
- envío a cocina
- preparación
- entrega
- pago
- cierre

Con flujo detallado paso a paso.

## 4. Comunicación Entre Microservicios

Explica:
- OpenFeign
- WebClient
- Kafka
- RabbitMQ
- WebSockets
- SSE
- REST

Y cuándo usar cada uno.

## 5. Propuesta de Eventos

Usando mi microservicio:
eventos

Proponer:
- eventos de dominio
- eventos de integración
- nombres de eventos
- payloads
- productores
- consumidores

## 6. Diseño de Cocina

Debes analizar:
- cola de pedidos
- prioridad
- estados
- concurrencia
- múltiples cocineros
- cancelaciones
- tiempos de preparación

## 7. Diseño de Mesero

Debes analizar:
- manejo de mesas
- órdenes activas
- órdenes parciales
- división de cuentas
- sincronización en tiempo real

## 8. Recomendación Tecnológica

Indica:
- qué usar síncrono
- qué usar asíncrono
- qué usar en tiempo real

## 9. Riesgos Arquitectónicos

Detecta:
- acoplamientos peligrosos
- posibles cuellos de botella
- problemas de escalabilidad
- problemas de consistencia
- race conditions
- problemas de concurrencia

## 10. Arquitectura Final Recomendada

Incluye:
- flujo final recomendado
- justificación técnica
- mejores prácticas
- visión enterprise-grade

# REGLAS IMPORTANTES

- NO inventes funcionalidades que no existen en el frontend.
- Primero analiza el código real.
- Basa todas las decisiones en el proyecto actual.
- No des respuestas genéricas.
- Piensa como arquitecto enterprise.
- Usa lenguaje técnico profesional.
- Usa arquitectura limpia.
- Propón mejoras escalables.
- Considera crecimiento futuro.
- Considera alta concurrencia.
- Considera tiempo real.
- Considera observabilidad.
- Considera trazabilidad.
- Considera resiliencia.

# FORMATO DE RESPUESTA

Debes:
1. Leer todo el frontend.
2. Analizar profundamente los módulos indicados.
3. Editar Implementacion.md.
4. Dejar el documento listo para arquitectura backend enterprise.
5. Explicar decisiones técnicas.
6. Proponer diagramas textuales si es necesario.
7. Mantener formato profesional técnico.

NO generar código todavía.
NO generar controladores todavía.
NO generar entidades todavía.

Primero arquitectura y diseño técnico.