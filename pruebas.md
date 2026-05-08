# Informe de Pruebas de Software - Le Bon Goût

Este documento detalla la ejecución de las pruebas unitarias, integrales, de usabilidad y de seguridad realizadas para el proyecto front-end.

---

## 1. Pruebas Unitarias (Unit Tests)
**Objetivo:** Verificar el correcto funcionamiento de componentes individuales de la interfaz.

### Pasos:
1. Configuración de **Vitest** y **React Testing Library**.
2. Creación de archivos `.test.tsx` para los componentes.
3. Ejecución del comando: `npm test`

### Resultado de Ejecución:
```bash
> le-bon-gout@0.1.0 test
> vitest run

 RUN  v4.1.5 E:/Ciclo 9/INTEGRADOR 2/le-bon-gout

 ✓ src/components/Navbar.test.tsx (2 tests) 29ms

 Test Files  1 passed (1)
      Tests  2 passed (2)
   Duration  1.91s
```
**Estado:** ✅ PASADO

---

## 2. Pruebas Integrales (Integration / E2E Tests)
**Objetivo:** Validar flujos de usuario completos y navegación entre páginas.

### Pasos:
1. Instalación de **Playwright**: `npm install -D @playwright/test`
2. Creación de scripts de navegación en `tests/`.
3. Ejecución (requiere el servidor corriendo): `npx playwright test`

### Escenario Probado:
*   Navegación desde el Home hasta la sección de Reservas a través de la barra de navegación.

**Estado:** 🛠️ CONFIGURADO (Listo para ejecución en entorno local)

---

## 3. Pruebas de Usabilidad (Usability Tests)
**Objetivo:** Garantizar que la aplicación sea fácil de usar, accesible y rápida.

### Pasos para realizar en el Informe:
1. **Reporte de Lighthouse:**
   *   Abrir la aplicación en Chrome (Modo Incógnito).
   *   F12 -> Pestaña "Lighthouse".
   *   Hacer clic en "Analyze page load".
2. **Capturar Resultados:** Tomar captura de los puntajes de Performance, Accessibility, Best Practices y SEO.

### Checklist de Usabilidad aplicada:
- [x] Contraste de colores adecuado (Silent Luxury design).
- [x] Navegación clara y predecible.
- [x] Diseño responsivo (adaptable a móviles).
- [ ] Atributos `alt` en todas las imágenes.

---

## 4. Pruebas de Seguridad (Security Tests)
**Objetivo:** Identificar vulnerabilidades en dependencias y proteger la integridad de los datos.

### Pasos:
1. Ejecución de auditoría de paquetes: `npm audit`
2. Revisión de variables de entorno para evitar exposición de llaves.

### Resultado de Ejecución:
```bash
# npm audit report
postcss  <8.5.10
Severity: moderate
PostCSS has XSS via Unescaped </style> in its CSS Stringify Output
fix available via `npm audit fix --force`
```
**Observación:** Se detectaron 2 vulnerabilidades de severidad moderada en `postcss` (dependencia de Next.js). Se recomienda actualizar mediante `npm update`.

---

## 💡 Cómo incluir esto en tu Informe (Guía)

Para que tu informe se vea profesional, te sugiero seguir esta estructura por cada tipo de prueba:

1.  **Nombre de la Prueba:** (Ej. Prueba Unitaria del Componente Navbar).
2.  **Herramienta utilizada:** (Ej. Vitest, Playwright, Lighthouse).
3.  **Descripción del caso de prueba:** ¿Qué intentabas verificar? (Ej. "Verificar que el botón de reservas redirija correctamente").
4.  **Captura de pantalla/Log:** Pega el cuadro de texto del resultado (como los que puse arriba) o una captura de pantalla de la terminal.
5.  **Interpretación:** Breve conclusión. (Ej. "La prueba fue exitosa, confirmando que la navegación principal no presenta fallos").
6.  **Recomendaciones:** Si algo falló (como en seguridad), indica qué pasos se tomarán para corregirlo.

---
*Archivo generado automáticamente por Antigravity para el proyecto Le Bon Goût.*
