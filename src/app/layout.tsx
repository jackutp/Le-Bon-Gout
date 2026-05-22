// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PedidoProvider } from "@/context/PedidoContext";
import { ProductoProvider } from "@/context/ProductoContext";
import { InsumoProvider } from "@/context/InsumoContext";
import { MermaProvider } from "@/context/MermaContext";
import { ProveedorProvider } from "@/context/ProveedorContext";
import { MesaProvider } from "@/context/MesaContext";
import { CocinaProvider } from "@/context/CocinaContext";
import { PagoProvider } from "@/context/PagoContext"; // ← AGREGAR
import { ComprobanteProvider } from "@/context/ComprobanteContext";
import { MetricasProvider } from "@/context/MetricasContext";
import { AuthProvider } from "@/context/AuthContext";
import { UserProvider } from "@/context/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Le Bon Gout - Exclusive Restaurant",
  description: "Experience culinary excellence at Le Bon Gout",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <PagoProvider>  {/* ← AGREGAR */}
          <CocinaProvider>
            <PedidoProvider>
              <ProductoProvider>
                <InsumoProvider>
                  <MermaProvider>
                    <ProveedorProvider>
                      <MesaProvider>
                        <ComprobanteProvider>
                          <MetricasProvider>
                            <AuthProvider>
                              <UserProvider>
                                {children}
                              </UserProvider>
                            </AuthProvider>
                          </MetricasProvider>
                        </ComprobanteProvider>
                      </MesaProvider>
                    </ProveedorProvider>
                  </MermaProvider>
                </InsumoProvider>
              </ProductoProvider>
            </PedidoProvider>
          </CocinaProvider>
        </PagoProvider>
      </body>
    </html>
  );
}