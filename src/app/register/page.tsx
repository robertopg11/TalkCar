"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "talkcar/trpc/react";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const registerMutation = api.user.register.useMutation({
    onSuccess: () => {
      router.push("/api/auth/signin");
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    registerMutation.mutate(formData);
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md space-y-8 glass-card p-10 animate-in fade-in zoom-in duration-500">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand/20 rounded-2xl text-brand mb-6 shadow-glow">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Únete a TalkCar</h1>
          <p className="text-silver/60">Gestiona tu colección de coches hoy mismo</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400 animate-shake">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-silver/80 ml-1">Nombre Completo</label>
              <input
                type="text"
                required
                placeholder="Juan Pérez"
                className="mt-2 block w-full rounded-xl border border-white/5 bg-white/5 py-3 px-4 text-white placeholder:text-silver/20 focus:border-brand/50 focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
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
              <label className="text-sm font-semibold text-silver/80 ml-1">Contraseña</label>
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
            disabled={registerMutation.isPending}
            className="btn-primary w-full py-4 text-lg mt-8"
          >
            {registerMutation.isPending ? "Preparando motores..." : "Registrarse Ahora"}
          </button>
        </form>

        <p className="text-center text-silver/40">
          ¿Ya tienes cuenta?{" "}
          <Link href="/api/auth/signin" className="font-bold text-brand hover:text-brand-hover underline-offset-4 hover:underline transition-all">
            Inicia sesión
          </Link>
        </p>
      </div>
    </main>
  );
}
