// src/lib/apiHeaders.ts

/**
 * Devuelve los headers base con Content-Type y, si existe, el Authorization Bearer token.
 * Se usa en todos los servicios para garantizar que las peticiones autenticadas
 * siempre adjunten el token almacenado en localStorage.
 */
export function getAuthHeaders(): Record<string, string> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };
}

/**
 * Versión sin Content-Type, para peticiones multipart/FormData donde
 * el navegador debe establecer el boundary automáticamente.
 */
export function getAuthHeadersNoContentType(): Record<string, string> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return {
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };
}
