import { auth } from "talkcar/server/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  // Si no hay sesión, redirigimos al login automáticamente (Protección de ruta)
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white/10 p-8 shadow-xl backdrop-blur-sm">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight">Tu Perfil</h1>
          <p className="mt-2 text-white/60">Datos de tu cuenta en TalkCar</p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="rounded-md bg-white/5 p-4 ring-1 ring-white/10">
            <h3 className="text-sm font-medium text-white/50">Nombre</h3>
            <p className="text-lg font-semibold">{session.user?.name}</p>
          </div>
          
          <div className="rounded-md bg-white/5 p-4 ring-1 ring-white/10">
            <h3 className="text-sm font-medium text-white/50">Email</h3>
            <p className="text-lg font-semibold">{session.user?.email}</p>
          </div>

          <div className="rounded-md bg-white/5 p-4 ring-1 ring-white/10">
            <h3 className="text-sm font-medium text-white/50">ID de Usuario</h3>
            <p className="text-xs font-mono text-indigo-300">{session.user?.id}</p>
          </div>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="flex w-full justify-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20 transition"
          >
            Volver al Inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
