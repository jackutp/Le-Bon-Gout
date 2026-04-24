# Mejores y Buenas Prácticas UX/UI - Le Bon Gout

## 1. Principios de Diseño General

### 1.1 Consistencia Visual
- **Paleta de colores unificada**: Mantener los colores principales (#C6A96B dorado, #0B0B0C negro, #121214 gris oscuro) en toda la aplicación
- **Tipografía coherente**: Usar las mismas familias tipográficas (Playfair Display para títulos serif, Geist para cuerpo) en todos los módulos
- **Espaciado uniforme**: Seguir un sistema de espaciado consistente (p-4, p-6, gap-4, gap-6)
- **Componentes reutilizables**: Crear componentes compartidos para elementos repetitivos (botones, cards, modales)

### 1.2 Jerarquía Visual
- **Importancia por tamaño**: Títulos más grandes que el contenido secundario
- **Contraste de color**: Usar el color dorado (#C6A96B) para elementos interactivos importantes
- **Peso visual**: Estados activos tienen mayor peso visual que estados inactivos
- **Agrupación lógica**: Elementos relacionados se agrupan visualmente

### 1.3 Accesibilidad
- **Contraste de texto**: Asegurar ratio mínimo de 4.5:1 para texto sobre fondos
- **Tamaño de targets táctiles**: Mínimo 44x44px para botones en móvil
- **Focus visible**: Indicadores claros para navegación por teclado
- **Texto alternativo**: Todas las imágenes deben tener atributos alt descriptivos

---

## 2. Módulo Mesero

### 2.1 Flujo de Pedidos

#### Navegación y Selección
- **Selección de mesa prominente**: El selector de mesa debe ser visible y accesible en todo momento
- **Feedback de selección**: Cambios inmediatos en la UI al seleccionar productos
- **Límite de stock visible**: Badge con cantidad disponible junto a cada producto
- **Estado agotado**: Productos sin stock deben verse deshabilitados visualmente

#### Carrito de Pedido
- **Panel lateral fijo**: El resumen del pedido debe estar siempre visible en desktop
- **Barra fija en móvil**: En móvil, mostrar un barra inferior con total y botón de envío
- **Contador de items**: Mostrar número de items en el carrito
- **Eliminación fácil**: Opción clara para reducir/remover items

#### Confirmación
- **Modal de confirmación**: Resumen claro antes de enviar a cocina
- **Desglose de precios**: Mostrar precio unitario, cantidad y subtotal por item
- **Total destacado**: El monto total debe ser prominente
- **Opciones de acción**: Cancelar (mantener en modal) y Confirmar (enviar y cerrar)

#### Pedidos Enviados
- **Estado en tiempo real**: Actualización instantánea al modificar cantidades
- **Sincronización de stock**: Al aumentar cantidad en enviado, stock baja; al reducir, stock sube
- **Historial accesible**: Botón "Enviados" siempre visible para acceder a pedidos activos
- **Edición inline**: Modificar cantidades directamente en la lista de enviados

### 2.2 Catálogo de Productos

#### Grid Responsivo
- **Adaptativo**: 1 columna móvil, 2 tablet, 3-4 desktop
- **Imágenes consistentes**: Todas las imágenes de productos con la misma proporción
- **Información visible**: Nombre, descripción, precio y stock siempre visibles
- **Indicador de disponibilidad**: Badge de stock con colores significativos (verde > 5, amarillo 1-5, rojo = 0)

#### Interacciones
- **Hover states**: Animación sutil al pasar sobre productos (scale 1.02)
- **Tap feedback**: Respuesta visual inmediata al tocar
- **Loading states**: Indicadores de carga para operaciones asíncronas
- **Deshabilitación clara**: Productos agotados no deben ser clicables

---

## 3. Módulo Cocina (KDS)

### 3.1 Vista de Comandas

#### Diseño Kanban
- **Columnas por estado**: Pendiente (naranja), En preparación,Completado
- **Cards scrolleables**: Cada card de orden con scroll interno para muchos items
- **Actualización en tiempo real**: Nuevos pedidos aparecen automáticamente
- **Sin necesidad de recargar**: polling o websocket para actualizar estado

#### Información de Orden
- **Mesa prominente**: Número de mesa grande y visible
- **Hora de creación**: Timestamp para priorizar órdenes antiguas
- **Lista de items**: Cada item con nombre, cantidad y notas especiales
- **Estado de items**: Checkbox visual para marcar items completados

#### Acciones
- **Toggle item**: Click en item para marcar como completado
- **Servir mesa**: Botón habilitado solo cuando todos los items están completados
- **Feedback de acción**: Animación al completar items o servir orden
- **Tiempo de espera**: Indicador visual de tiempo transcurrido

### 3.2 Estados de Orden

#### Pendiente
- **Color primario**: Borde/fondo con tono del estado
- **Items pendientes**: Sin marcar, texto normal
- **Items completados**: Tachados, opacidad reducida

#### Completado
- **Animación de salida**: Card se desvanece suavemente al servir
- **Transición**: Movimiento fluido entre estados
- **Feedback auditivo** (opcional): Sonido al marcar item o servir

---

## 4. Módulo Admin

### 4.1 Navegación

#### Sidebar
- **Posición fija**: Sidebar siempre visible en desktop
- **Menú hamburguesa**: Ocultar sidebar en móvil con botón de apertura
- **Estado activo claro**: pestaña seleccionada con fondo destacado
- **Iconos + texto**: Iconos descriptivos con etiquetas

#### Estructura de Páginas
- **Header con título**: Indica claramente en qué sección está el admin
- **Breadcrumbs** (si hay sub-páginas): Navegación clara de ubicación
- **Acciones principales**: Botones de acción prominentes arriba del contenido

### 4.2 Inventario

#### Tabla de Inventario
- **Columnas claras**: Producto, Unidad, Stock, Estado
- **Alertas visuales**: Fila highlighted si stock bajo
- **Ordenamiento**: Posibilidad de ordenar por columna
- **Búsqueda/filtro**: Filtrar por nombre o categoría

#### Estados de Stock
- **Normal**: Texto simple
- **Crítico (< 10)**: Background rojo sutil, badge de alerta
- **Agotado (0)**: Indicador muy visible, posiblemente rojo sólido

### 4.3 Editor de Menú

#### CRUD de Platillos
- **Preview de imagen**: Mostrar imagen del platillo en la card
- **Edición inline**: Modal para editar sin salir de la página
- **Confirmación de eliminación**: Alert antes de borrar
- **Campos del formulario**:
  - Nombre (requerido)
  - Precio (numérico, requerido)
  - Descripción (textarea)
  - Categoría (select)
  - Imagen (URL o upload)

#### Persistencia
- **Sincronización en tiempo real**: Cambios visibles en Mesero y Home inmediatamente
- **Indicador de guardado**: Feedback de que el cambio se guardó
- **Manejo de errores**: Mensaje claro si falla el guardado

### 4.4 Dashboard

#### Métricas
- **KPIs destacados**: Ventas, órdenes, ticket promedio
- **Gráficos visuales**: Barras, líneas o gráficos circulares
- **Período seleccionable**: Hoy, esta semana, este mes
- **Comparativas**: vs período anterior (opcional)

---

## 5. Página Principal (Home)

### 5.1 Hero Section
- **Imagen de fondo**: Alta calidad, restaurant elegante
- **Overlay oscuro**: Texto legible sobre la imagen
- **CTA claro**: Llamada a la acción prominente (Reservar, Ver Menú)
- **Animación de entrada**: Elementos aparecen con fade-in

### 5.2 Sección Menú
- **Grid de productos**: Usar datos del contexto, no hardcodeado
- **Toggle "Ver más"**: Mostrar 3 inicialmente, expandir si quiere
- **Hover en cards**: Zoom sutil en imagen
- **Precios visibles**: Formato claro (S/ XX.XX)

### 5.3 Información del Restaurant
- **Horarios**: Claros y prominentes
- **Ubicación**: Dirección y mapa (si aplica)
- **Contacto**: Teléfono clickeable (tel:), email
- **Redes sociales**: Links a redes del restaurant

---

## 6. Formularios

### 6.1 Validación
- **En tiempo real**: Validar mientras el usuario escribe (donde tenga sentido)
- **Mensajes inline**: Errores cerca del campo afectado
- **Campos requeridos**: Indicador visual (*)
- **Formateo**: Ej. fechas, precios con formato correcto

### 6.2 Estados de Formulario
- **Default**: Borde gris oscuro
- **Focus**: Borde dorado (#C6A96B)
- **Error**: Borde rojo, mensaje de error debajo
- **Success**: Borde verde (verde o dorado), checkmark
- **Disabled**: Opacidad reducida, cursor not-allowed

### 6.3 Botones de Acción
- **Primario**: Fondo dorado, texto negro
- **Secundario**: Borde, fondo transparente
- **Destructivo**: Rojo, para acciones irreversibles
- **Loading**: Spinner o texto "Guardando..."

---

## 7. Modales y Overlays

### 7.1 Diseño
- **Centrado verticalmente**: En viewport
- **Backdrop oscuro**: Fondo oscuro con blur
- **Cierre fácil**: Botón X y click fuera para cerrar
- **Animación de entrada/salida**: Fade + scale suave

### 7.2 Contenido
- **Header claro**: Título de la acción
- **Scroll si necesario**: Contenido scrolleable si es largo
- **Acciones al final**: Botones de acción en la parte inferior
- **Max-width**: No ocupar toda la pantalla (max-w-md o similar)

---

## 8. Responsive Design

### 8.1 Breakpoints
- **Mobile first**: Diseñar primero para móvil, luego expandir
- **Breakpoints comunes**:
  - sm: 640px (móvil grande)
  - md: 768px (tablet)
  - lg: 1024px (desktop)
  - xl: 1280px (desktop grande)

### 8.2 Adaptaciones
- **Grid a columna**: 3 columnas -> 2 -> 1 según breakpoint
- **Sidebar colapsable**: Visible en desktop, oculta en móvil
- **Barras fijas inferiores**: En móvil para acciones frecuentes
- **Touch-friendly**: Targets táctiles grandes en móvil

### 8.3 Navegación Móvil
- **Hamburger menu**: Sidebar como drawer desde izquierda
- **Gestos**: Swipe para cerrar drawer (si es viable)
- **Bottom navigation** (opcional): Para apps muy usadas

---

## 9. Performance UX

### 9.1 Velocidad
- **Loading spinners**: Para operaciones que toman tiempo
- **Skeleton screens**: Placeholders mientras carga contenido
- **Lazy loading**: Imágenes cargan solo cuando son visibles
- **Optimización de imágenes**: Next.js Image component

### 9.2 Interacciones
- **Respuesta inmediata**: Ninguna acción debe sentirse lenta
- **Optimistic UI**: Actualizar UI antes de confirmación del servidor
- **Debounce**: En búsquedas, esperar antes de buscar
- **Cancelación**: Permitir cancelar operaciones largas

---

## 10. Estados de Error y Vacíos

### 10.1 Estados Vacíos
- **Ilustración + mensaje**: "No hay pedidos" con icono apropiado
- **Mensaje amigable**: No técnico, orientado a acción
- **CTA sugerente**: Botón para crear algo si aplica

### 10.2 Estados de Error
- **Toast notifications**: Para errores no críticos
- **Modales**: Para errores que requieren atención
- **Inline**: Para errores de formulario
- **Retry**: Siempre ofrecer opción de reintentar

### 10.3 Offline
- **Indicador offline**: Si la app funciona offline, indicarlo
- **Cola de operaciones**: Guardar cambios locally hasta que haya conexión

---

## 11. Animaciones y Transiciones

### 11.1 Principios
- **Sutiles**: Mejoran sin distraer
- **Consistentes**: Misma easing function en toda la app
- **Breves**: 200-400ms para la mayoría de animaciones
- **Funcionales**: Animar para comunicar estado, no solo por estética

### 11.2 Tipos
- **Entrada**: fade-in, slide-in
- **Salida**: fade-out, slide-out
- **Transición de estado**: color, scale, opacity
- **Layout**: AnimatePresence para enter/exit de componentes

### 11.3 Ejemplos en el Proyecto
- **Cards de productos**: scale en hover
- **Modal**: fade + scale
- **Items de lista**: fade + slide en enter/exit
- **Toggle de items en cocina**: cambio de estilo suave

---

## 12. Internacionalización (i18n)

### 12.1 Consideraciones
- **Español como base**: Todo el proyecto en español
- **Formato de moneda**: S/. (sol peruano)
- **Formato de fecha**: DD/MM/YYYY o similar
- **Formato de hora**: 24h o 12h según preferencia local

### 12.2 Textos
- **Consistencia en botones**: Siempre el mismo texto para misma acción
- **Confirmaciones claras**: "Eliminar", no "Si", "No"
- **Mensajes de éxito/error**: Explícitos sobre lo que pasó

---

## 13. Testing UX

### 13.1 Pruebas Manuales
- **Flujo completo**: Probar cada flujo de usuario de inicio a fin
- **Dispositivos reales**: Probar en móvil y desktop reales
- **Usuarios reales**: Si es posible, observar a usuarios reales

### 13.2 Checklist Pre-lanzamiento
- [ ] Todos los links funcionan
- [ ] Todos los formularios se pueden enviar
- [ ] Validaciones muestran errores apropiados
- [ ] Navegación funciona en todos los breakpoints
- [ ] No hay elementos fuera de viewport
- [ ] Tiempos de carga aceptables
- [ ] Keyboard navigation funciona
- [ ] Lectores de pantalla pueden navegar

---

## 14. Checklist de Implementación

### Antes de Commits
- [ ] Verificar consistencia de colores
- [ ] Verificar que no haya textos hardcodeados donde no debe
- [ ] Probar en al menos móvil y desktop
- [ ] Verificar que todos los botones tienen feedback visual
- [ ] Verificar estados de carga y error

### Antes de Deploy
- [ ] Optimizar imágenes
- [ ] Minificar CSS/JS
- [ ] Probar en producción
- [ ] Verificar logs de consola (sin errores)
- [ ] Checklist de accesibilidad completo