
## Requerimientos

### 1. Modificar `src/app/login/page.tsx`
- Actualmente este archivo contiene lógica combinada de login y registro.
- **Nuevo comportamiento**: debe importar y mostrar los dos componentes:
  - `Login` (desde `./Login`)
  - `Registro` (desde `./Registro`)
- Organización visual: usar pestañas (`Tabs`) o disposición de dos columnas, o acordeón. Ambos componentes deben ser accesibles en la misma ruta `/login`.

### 2. Crear/Modificar `src/app/login/Login.tsx`
- Debe contener **exactamente la misma lógica y funcionalidad** que actualmente existe en `page.tsx` para el inicio de sesión.
- Campos:
  - `email` (tipo email, obligatorio)
  - `clave` (tipo password, obligatorio)
- Botón "Iniciar sesión".
- Validaciones básicas (campos no vacíos, formato de email).
- Al enviar, simular autenticación (mostrar mensaje en consola o alerta).
- Usar `"use client"`.

### 3. Crear/Modificar `src/app/login/Registro.tsx`
- Formulario de registro con los siguientes campos, todos obligatorios y editables:

| Campo     | Tipo      | Valor por defecto (ejemplo) |
|-----------|-----------|-----------------------------|
| nombre    | text      | "Juan"                      |
| apellido  | text      | "Perez"                     |
| dni       | text      | "12345678"                  |
| email     | email     | "juan@example.com"          |
| clave     | password  | "123456"                    |

- Validaciones:
  - Ningún campo vacío.
  - Email válido.
  - DNI solo números (7-8 dígitos).
- Botón "Registrarse".
- Al enviar: mostrar en consola o alerta los datos ingresados (simular registro exitoso).
- Usar `"use client"`.

### 4. Estilos
- Usar **TailwindCSS**.
- Cada formulario debe tener:
  - Bordes redondeados
  - Sombra suave
  - Espaciado coherente
  - Botones con estilos diferenciados (login: azul, registro: verde)

### 5. Tipado (TypeScript)
- Definir interfaces:
  - `LoginFormData` (email, clave)
  - `RegistroFormData` (nombre, apellido, dni, email, clave)

## Entregable
Generar el código completo de los siguientes archivos:

1. `src/app/login/page.tsx`
2. `src/app/login/Login.tsx`
3. `src/app/login/Registro.tsx`

## Notas adicionales
- No se requiere conexión a backend real.
- Simular respuestas exitosas/error con `setTimeout` o instantáneo.
- Mantener el código limpio, comentado y funcional.