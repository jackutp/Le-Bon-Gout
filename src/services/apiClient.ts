const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8090/api';

function getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
}

interface RequestOptions extends RequestInit {
    skipAuth?: boolean;
}

export async function apiFetch(
    endpoint: string,
    options: RequestOptions = {}
): Promise<Response> {
    const { skipAuth = false, ...fetchOptions } = options;

    const headers: Record<string, string> = {
        ...(fetchOptions.headers as Record<string, string>),
    };

    // No agregar Content-Type si es FormData (subida de archivos)
    if (!(fetchOptions.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    // Inyectar token JWT automáticamente
    if (!skipAuth) {
        const token = getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...fetchOptions,
        headers,
    });

    // Si el servidor devuelve 401, limpiar sesión y redirigir
    if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    }

    return response;
}

export { API_BASE_URL };