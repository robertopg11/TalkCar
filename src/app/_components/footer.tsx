import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-bg-dark border-t border-white/5 text-silver py-12 px-8 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <span className="text-silver/40">© 2024</span>
          <div className="flex gap-6">
            <Link href="/privacidad" className="hover:text-brand transition-colors text-sm">Privacidad</Link>
            <Link href="/terminos" className="hover:text-brand transition-colors text-sm">Términos</Link>
            <Link href="/contacto" className="hover:text-brand transition-colors text-sm">Contacto</Link>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-silver/40">
          <span>Hecho con</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-red-500/60"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          <span>para amantes del motor</span>
        </div>
      </div>
    </footer>
  );
}
