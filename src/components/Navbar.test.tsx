import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Navbar from './Navbar';

// Mock de framer-motion para evitar problemas en el entorno de pruebas
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
  },
}));

describe('Navbar Component', () => {
  it('debe renderizar el nombre del restaurante', () => {
    render(<Navbar />);
    expect(screen.getByText(/Le Bon Goût/i)).toBeInTheDocument();
  });

  it('debe contener el enlace de Reservas', () => {
    render(<Navbar />);
    const link = screen.getByText(/RESERVAS/i);
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/reservas');
  });
});
