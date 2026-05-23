// src/services/authService.ts
import { apiFetch } from './apiClient';  // ✅ Cambiar importación

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegistroRequest {
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    clave: string;
}

export interface UserResponse {
    idUsuario: number;
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    tipo: "CLIENTE" | "MESERO" | "COCINERO" | "ADMINISTRADOR";
    token: string;
}

class AuthService {
    async login(data: LoginRequest): Promise<UserResponse> {
        // ✅ Usar apiFetch - NO necesita token (skipAuth se puede omitir porque es público)
        const response = await apiFetch('/usuarios/login', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Error al iniciar sesión');
        }

        return response.json();
    }

    async registro(data: RegistroRequest): Promise<UserResponse> {
        const response = await apiFetch('/usuarios/registro', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Error al registrarse');
        }

        return response.json();
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    getUser(): UserResponse | null {
        const userStr = localStorage.getItem('user');
        if (!userStr) return null;
        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    hasRole(role: string): boolean {
        const user = this.getUser();
        return user?.tipo === role;
    }
}

export const authService = new AuthService();