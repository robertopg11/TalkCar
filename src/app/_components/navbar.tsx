import Link from "next/link";
import { auth } from "talkcar/server/auth";

export async function Navbar() {
  const session = await auth();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-bg-dark/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
      <div className="flex items-center gap-2 group">
        <div className="flex items-center justify-center w-10 h-10 bg-brand rounded-lg text-bg-dark transition-transform group-hover:scale-110 shadow-lg shadow-brand/20">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
        </div>
        <span className="text-2xl font-bold text-brand tracking-tight">Talk<span className="text-white">Car</span></span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <Link href="/" className="nav-link">Inicio</Link>
        <Link href="/explorar" className="nav-link">Explorar</Link>
        <Link href="/cars" className="nav-link">Mi Colección</Link>
      </div>

      <div className="flex items-center gap-4">
        {session ? (
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-silver/60">Hola, {session.user?.name}</span>
            <Link href="/api/auth/signout" className="btn-outline">Salir</Link>
          </div>
        ) : (
          <>
            <Link href="/api/auth/signin" className="btn-outline">Iniciar Sesión</Link>
            <Link href="/register" className="btn-primary">Regístrate</Link>
          </>
        )}
      </div>
    </nav>
  );
}
