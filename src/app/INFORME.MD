# 📋 PROMPT DE DESARROLLO FRONTEND – LE BON GOUT

> **Contexto:**  
> Este documento contiene exclusivamente las funcionalidades a implementar/modificar en el proyecto frontend existente.  
> **El diseño visual debe regirse estrictamente por el archivo `DESING.MD` proporcionado aparte.**  
> No se debe alterar la paleta de colores, tipografías, espaciados ni filosofía visual definida en dicho sistema de diseño.

---

## 🌐 1. REQUERIMIENTOS GLOBALES (Todas las Vistas)

### 1.1 Cambio de Moneda
- Convertir **todas** las cifras monetarias de la aplicación a **Soles Peruanos**.
- **Formato requerido:** `S/ XX.XX`
- **Símbolo:** `S/` seguido de un espacio y el monto (Ejemplo: `S/ 45.00`).

### 1.2 Footer / Sección "Nuestras Redes Sociales"
- **Actualización de Enlaces:**
  - Facebook: `https://www.facebook.com/`
  - Instagram: `https://www.instagram.com/`
  - X (Twitter): `http://x.com/`
- **Nuevo Componente: Libro de Reclamaciones**
  - **Posición:** Al costado de los íconos de redes sociales.
  - **Elemento Visual:** Imagen o botón con el texto `"Libro de Reclamaciones"`.
  - **Comportamiento:** Al hacer clic, debe **abrir una pestaña nueva**.
  - **Contenido de la nueva pestaña (Diseño propio):**
    - Fondo oscuro (acorde a `DESING.MD`).
    - Formulario con los siguientes campos:
      - Nombre Completo
      - Correo Electrónico
      - Teléfono / Celular
      - Descripción del Reclamo
    - Botón de envío con estilo `Accent Gold` (`#C6A96B`).

---

## 🏠 2. PÁGINA PRINCIPAL (Home)

### 2.1 Botón: "¿Quieres formar parte de nosotros?"
- **Interacción:** Abrir un **Modal** (Ventana emergente).
- **Estilo del Modal:** Seguir los principios `Linear` definidos en `DESING.MD` (Fondo `#121214`, bordes redondeados 12px, overlay con transición suave).
- **Contenido del Modal (Propuesta de diseño):**
  - **Título:** "Únete a Le Bon Gout"
  - **Campos:**
    1. Nombre Completo (Input text)
    2. Correo Electrónico (Input email)
    3. Puesto Deseado (Select: Mesero, Cocina, Administración, Bartender)
    4. **Subir CV:** Botón funcional que abra el explorador de archivos del sistema operativo (Simular carga).
  - **Botón Final:** "Enviar Solicitud" (Estilo Primario Gold).

### 2.2 Botón: "Ver Menú Completo"
- **Interacción:** **Expandir contenido en la misma página** (No navegar a otra ruta).
- **Funcionalidad:**
  - Al hacer clic, se despliega una sección oculta con más **Platos, Bebidas y Postres**.
  - El texto del botón debe alternar entre **"Ver Menú Completo"** y **"Ver Menos"**.
  - La UI de los nuevos items debe respetar el diseño `Card-based` con imágenes de alta calidad definido en `DESING.MD`.

---

## 📅 3. VISTA DE EVENTOS / RESERVAS

### 3.1 Restricción de Fechas (Date Picker)
- **Validación Frontend:**
  - **Fecha Mínima seleccionable:** Día actual (hoy).
  - **Fecha Máxima seleccionable:** Exactamente **3 meses** posteriores a la fecha actual.
  - **UI:** El calendario debe deshabilitar visualmente los días fuera de este rango.

---

## 👨‍🍳 4. VISTA MESERO (Gestión de Pedidos)

### 4.1 Flujo de Envío a Cocina
1.  Seleccionar **Número de Mesa**.
2.  Seleccionar **Productos** y **Cantidades**.
3.  Presionar botón **"ENVIAR A COCINA"** (Estilo Gold).
4.  **Modal de Confirmación:** Debe aparecer un resumen del pedido antes de enviar.
5.  Botón **"CONFIRMAR"** en el modal.
    - *Resultado esperado:* Los datos del pedido deben registrarse y **aparecer en tiempo real (o vía estado global) en la Vista Cocina**.

### 4.2 Botón "YA ENVIADOS" (NUEVO)
- **Ubicación:** Parte superior de la vista Mesero.
- **Acción:** Abrir un **Modal** con el historial de pedidos enviados, organizado por **Número de Mesa**.
- **Funcionalidad de Edición:**
  - El modal debe permitir **Editar** los pedidos que ya fueron enviados a cocina.
  - **Sincronización:** Al modificar un pedido desde este modal, el cambio debe reflejarse **automáticamente** en la **Vista Cocina** y en el panel de **Admin** (Inventario).

---

## 🍳 5. VISTA COCINA

### 5.1 Recepción de Pedidos
- Visualizar **exactamente** los productos y cantidades enviados por el **Mesero**.
- Cada pedido debe mostrarse como un "Ticket" con:
  - Número de Mesa.
  - Lista de productos.

### 5.2 Proceso de "SERVIR MESA"
- El ticket debe tener un **Check** de "Proceso Listo" o similar.
- Al presionar el botón **"SERVIR MESA"**:
  - El ticket debe **eliminarse** de la vista de Cocina.
  - (Opcional): Debe actualizar el estado del pedido en la Vista Mesero.

---

## 🛠️ 6. VISTA ADMINISTRADOR (Panel de Control)

### 6.1 Módulo: INVENTARIO
- **Vinculación Obligatoria:**
  - El stock debe descontarse **automáticamente** en función de los productos enviados por el **Mesero**.
  - *Ejemplo:* Si un mesero envía 2 "Pisco Sour", el ingrediente "Pisco" en Inventario debe reducir sus unidades correspondientes.

### 6.2 Módulo: PERSONAL
- **Agregar Campos en el Formulario:**
  - **Contraseña:** Input de tipo `password`.
  - **Notas / Permisos:** Campo de texto largo (`textarea`) para información adicional del empleado.

### 6.3 Módulo: EDITOR CARTA
- **Funcionalidad Faltante: Subida de Imagen**
  - En el formulario de **EDITAR** y **NUEVO** plato/bebida, se debe incluir un campo para **Subir Imagen**.
  - Debe permitir seleccionar un archivo del explorador y mostrar una **Previsualización** de la imagen antes de guardar.
- **Corrección:** Asegurar que el botón **BORRAR** elimine correctamente el item del menú público.

### 6.4 Módulo: PROVEEDORES
- **Botón "VER POS":**
  - **Acción:** Abrir un **Modal**.
  - **Contenido del Modal (Criterio propio):**
    - Mostrar los **datos del proveedor**.
    - Mostrar los **productos específicos** que ese proveedor envió al restaurante.
    - **Extra (Sugerido):** Agregar un campo o badge con la "Fecha de Último Pedido".

### 6.5 Módulo: Carga de Facturas
- **Funcionalidad:**
  - Botón o área de Dropzone que **abra el explorador de archivos** del sistema operativo.
  - **Filtro de archivos:** Aceptar únicamente `.pdf` y `.xlsx` (Excel).
  - **UI:** Mostrar una lista de los archivos seleccionados (Nombre y tamaño).

---

## 📝 NOTAS DE IMPLEMENTACIÓN PARA EL DESARROLLADOR

1.  **Diseño:** **NO MODIFICAR** las reglas del archivo `DESING.MD`. Todos los modales, botones y secciones nuevas deben heredar la paleta oscura, tipografía `Inter` / `Playfair Display` y animaciones sutiles definidas previamente.
2.  **Estado Global:** Se requiere manejo de estado (React Context, Zustand, Vue Pinia, etc.) para simular la comunicación en tiempo real entre `Mesero` y `Cocina`.
3.  **Imágenes:** Usar placeholders de comida de alta gama (Unsplash, Pexels) pero optimizadas para web (Lazy Loading).
4.  **Modal de Edición de Pedidos:** Asegurar que la edición de un pedido "Ya Enviado" actualice tanto el historial del mesero como la cola de tickets en cocina.
5. **Todas las vistas deben de ser responsive**
---
**Fin del Prompt Funcional.**