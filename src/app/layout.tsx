import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sistema de Vendedores",
  description: "Aplicación para gestionar vendedores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {/* Header elegante con fondo negro y título dorado */}
        <header className="py-4" style={{background: 'linear-gradient(135deg, #1a1a1a, #2a2a2a)', borderBottom: '2px solid #ffd700'}}>
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                          fill="currentColor" className="text-warning"/>
                  </svg>
                </div>
                <h1 className="mb-0" style={{
                  background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontWeight: '800',
                  fontSize: '2rem',
                  textShadow: '0 2px 4px rgba(255, 215, 0, 0.3)'
                }}>
                  🏢 Sistema de Vendedores
                </h1>
              </div>
              <nav>
                <a href="/vendedores" className="btn me-2" style={{
                  background: 'linear-gradient(135deg, #ffd700, #daa520)',
                  color: '#0a0a0a',
                  border: 'none',
                  fontWeight: '600'
                }}>
                  👥 Vendedores
                </a>
              </nav>
            </div>
          </div>
        </header>

        <main style={{minHeight: '100vh', background: '#0a0a0a'}}>
          {children}
        </main>
      </body>
    </html>
  );
}
