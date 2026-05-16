"use client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-stone-900 border-t border-stone-800 relative mt-16 text-stone-400">
      <button
        onClick={scrollToTop}
        className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-amber-500 text-black flex items-center justify-center hover:bg-amber-400 transition-colors shadow-lg"
        aria-label="Volver arriba"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-6 lg:px-12 py-12 pt-16">

        {/*Columna 1*/}
        <div>
          <h3 className="font-bold text-xs uppercase tracking-wider text-amber-500 mb-4">Sobre la marca</h3>
          <nav className="space-y-1" aria-label="Enlaces corporativos">
            <a href="#" className="block hover:text-white text-sm py-1 transition">Nuestra historia</a>
            <a href="#" className="block hover:text-white text-sm py-1 transition">Eventos</a>
            <a href="#" className="block hover:text-white text-sm py-1 transition">Cartas</a>
            <a href="#" className="block hover:text-white text-sm py-1 transition">Horarios</a>
            <a href="#" className="block hover:text-white text-sm py-1 transition">Trabaja con nosotros</a>
          </nav>
        </div>

        {/*Columna 2*/}
        <div>
          <h3 className="font-bold text-xs uppercase tracking-wider text-amber-500 mb-4">Ayuda y legales</h3>
          <nav className="space-y-1" aria-label="Enlaces legales">
            <a href="#" className="block hover:text-white text-sm py-1 transition">Contáctanos</a>
            <a href="#" className="block hover:text-white text-sm py-1 transition">Políticas de cookies</a>
            <a href="#" className="block hover:text-white text-sm py-1 transition">Política de privacidad</a>
            <a href="#" className="block hover:text-white text-sm py-1 transition">Términos y condiciones</a>
            <a href="#" className="block hover:text-white text-sm py-1 transition">Libro de reclamaciones</a>
          </nav>
        </div>

        {/*Columna 3*/}
        <div className="flex flex-col items-start md:items-end md:text-right">
          <h3 className="font-bold text-xs uppercase tracking-wider text-amber-500 mb-4 block md:hidden">Redes Sociales</h3>

          {/* Iconos*/}
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-stone-700 rounded-full p-2 hover:border-amber-500 hover:text-amber-500 transition"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-stone-700 rounded-full p-2 hover:border-amber-500 hover:text-amber-500 transition"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="5" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>

          {/* Insignias */}
          <div className="mt-6 space-y-2 w-full flex flex-col items-start md:items-end">
            <div className="bg-stone-800 rounded-md p-2 text-white text-xs text-center w-40 border border-stone-700">
              Libro de Reclamaciones
            </div>
            <div className="bg-stone-800 rounded-md p-2 text-white text-xs text-center w-40 border border-stone-700">
              Sello de Calidad
            </div>
          </div>

          {/* Información Fiscal */}
          <div className="mt-6">
            <p className="text-stone-500 text-[11px] tracking-wide">
              RUC: 20512345678 <span className="hidden md:inline">|</span><br className="md:hidden" /> RAZÓN SOCIAL: A&G EVENTOS S.A.C.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
