"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import { Suspense } from "react";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Credenciales inválidas. Por favor, inténtalo de nuevo.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError("Credenciales inválidas. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 glass-card p-10 animate-in fade-in zoom-in duration-500">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand/20 rounded-2xl text-brand mb-6 shadow-glow">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Bienvenido de nuevo</h1>
        <p className="text-silver/60">Accede a tu garaje virtual en TalkCar</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400 animate-shake">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-silver/80 ml-1">Correo Electrónico</label>
            <input
              type="email"
              required
              placeholder="juan@ejemplo.com"
              className="mt-2 block w-full rounded-xl border border-white/5 bg-white/5 py-3 px-4 text-white placeholder:text-silver/20 focus:border-brand/50 focus:ring-2 focus:ring-brand/20 outline-none transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <div className="flex items-center justify-between ml-1">
              <label className="text-sm font-semibold text-silver/80">Contraseña</label>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="mt-2 block w-full rounded-xl border border-white/5 bg-white/5 py-3 px-4 text-white placeholder:text-silver/20 focus:border-brand/50 focus:ring-2 focus:ring-brand/20 outline-none transition-all"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-4 text-lg mt-8"
        >
          {loading ? "Iniciando sesión..." : "Entrar al Garaje"}
        </button>
      </form>

      <p className="text-center text-silver/40">
        ¿No tienes cuenta?{" "}
        <Link href="/register" className="font-bold text-brand hover:text-brand-hover underline-offset-4 hover:underline transition-all">
          Regístrate gratis
        </Link>
      </p>
    </div>
  );
}

export default function SignInPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[120px] pointer-events-none"></div>

      <Suspense fallback={
        <div className="w-full max-w-md h-[500px] glass-card animate-pulse" />
      }>
        <SignInForm />
      </Suspense>
    </main>
  );
}
