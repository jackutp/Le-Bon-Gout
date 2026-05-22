// src/middleware.ts

import { NextRequest, NextResponse } from 'next/server';

// Rutas públicas (no requieren autenticación)
const publicRoutes = ['/', '/login', '/registro'];

// Rutas protegidas con sus roles permitidos
const protectedRoutes: Record<string, string[]> = {
    '/admin': ['ADMINISTRADOR'],
    '/mesero': ['MESERO'],
    '/cocina': ['COCINERO'],
    '/reservas': ['CLIENTE', 'ADMINISTRADOR', 'MESERO', 'COCINERO'],
    '/eventos': ['CLIENTE', 'ADMINISTRADOR', 'MESERO', 'COCINERO'],
};

// Función para decodificar JWT (sin verificar firma)
function decodeJWT(token: string): any {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        const payload = parts[1];
        const decoded = Buffer.from(payload, 'base64').toString('utf-8');
        return JSON.parse(decoded);
    } catch {
        return null;
    }
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Verificar si es ruta pública
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    // 2. Verificar si la ruta necesita protección
    let requiredRoles: string[] | null = null;
    for (const [route, roles] of Object.entries(protectedRoutes)) {
        if (pathname === route || pathname.startsWith(route + '/')) {
            requiredRoles = roles;
            break;
        }
    }

    // Si la ruta no está en la lista de protegidas, permitir
    if (!requiredRoles) {
        return NextResponse.next();
    }

    // 3. Obtener token de la cookie
    const token = request.cookies.get('token')?.value;

    // 4. Si no hay token, redirigir a login
    if (!token) {
        const url = new URL('/login', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
    }

    // 5. Decodificar token para obtener el rol
    const payload = decodeJWT(token);

    if (!payload) {
        // Token inválido
        const url = new URL('/login', request.url);
        return NextResponse.redirect(url);
    }

    // Verificar si el token ha expirado
    const exp = payload.exp;
    if (exp && Date.now() >= exp * 1000) {
        // Token expirado
        const url = new URL('/login', request.url);
        return NextResponse.redirect(url);
    }

    // Obtener el rol del usuario
    const userRole = payload.tipo || payload.role;

    // 6. Verificar si el rol tiene permiso
    if (!requiredRoles.includes(userRole)) {
        // No autorizado
        const url = new URL('/unauthorized', request.url);
        return NextResponse.redirect(url);
    }

    // 7. Permitir acceso
    return NextResponse.next();
}

// Configurar qué rutas serán procesadas por el middleware
export const config = {
    matcher: [
        '/admin/:path*',
        '/mesero/:path*',
        '/cocina/:path*',
        '/reservas/:path*',
        '/perfil/:path*',
    ],
};