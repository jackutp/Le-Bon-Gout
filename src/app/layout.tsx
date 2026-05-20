import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { InventarioLocalProvider } from "@/context/InventarioLocalContext";
import { MenuLocalProvider } from "@/context/MenuLocalContext";
import { PedidoProvider } from "@/context/PedidoContext";
import { ProductoProvider } from "@/context/ProductoContext";
import { InsumoProvider } from "@/context/InsumoContext";
import { MermaProvider } from "@/context/MermaContext";
import { ProveedorProvider } from "@/context/ProveedorContext";
import { MesaProvider } from "@/context/MesaContext";
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
        <InventarioLocalProvider>
          <MenuLocalProvider>
            <PedidoProvider>
              <ProductoProvider>
                <InsumoProvider>
                  <MermaProvider>
                    <ProveedorProvider>
                      <MesaProvider>
                        {children}
                      </MesaProvider>
                    </ProveedorProvider>
                  </MermaProvider>
                </InsumoProvider>
              </ProductoProvider>
            </PedidoProvider>
          </MenuLocalProvider>
        </InventarioLocalProvider>
      </body>
    </html>
  );
}