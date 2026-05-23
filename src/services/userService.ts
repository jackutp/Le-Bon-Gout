// src/services/userService.ts
import { apiFetch } from './apiClient';

export interface User {
    idUsuario: number;
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    tipo: "CLIENTE" | "MESERO" | "COCINERO" | "ADMINISTRADOR";
    token?: string;
}

export interface CreateUserRequest {
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    clave: string;
}

export interface UpdateUserRequest {
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    clave?: string;
}

class UserService {
    async getAllUsers(): Promise<User[]> {
        const response = await apiFetch('/usuarios');
        if (!response.ok) {
            throw new Error('Error al cargar los usuarios');
        }
        return response.json();
    }

    async createUser(data: CreateUserRequest, tipo: string): Promise<User> {
        const response = await apiFetch(`/usuarios/admin/create?tipo=${tipo}`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Error al crear usuario');
        }
        return response.json();
    }

    async updateUser(id: number, data: UpdateUserRequest, tipo?: string): Promise<User> {
        const url = tipo
            ? `/usuarios/${id}?tipo=${tipo}`
            : `/usuarios/${id}`;
        const response = await apiFetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Error al actualizar usuario');
        }
        return response.json();
    }

    async deleteUser(id: number): Promise<void> {
        const response = await apiFetch(`/usuarios/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar usuario');
        }
    }
}

export const userService = new UserService();