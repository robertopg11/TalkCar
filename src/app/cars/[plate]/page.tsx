import { api } from "talkcar/trpc/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CommentSection } from "./_components/comment-section";

export default async function CarProfilePage({
  params,
}: {
  params: Promise<{ plate: string }>;
}) {
  const { plate } = await params;

  // Buscar el coche por matrícula (esto asume que tenemos un query público)
  // Por ahora lo simplificamos a una consulta directa si existe
  const car = await api.car.getByPlate({ plate });

  if (!car) {
    return (
      <main className="min-h-screen bg-bg-dark text-silver flex flex-col items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-brand/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          </div>
          <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Sin dueño</h1>
          <p className="text-silver/60 mb-8">
            El coche con matrícula <span className="text-white font-mono">{plate}</span> aún no ha sido registrado en TalkCar.
          </p>
          <a href="/register" className="btn-primary inline-block">
            ¿ES TU COCHE? REGÍSTRALO
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-dark text-silver pb-20">
      <div className="relative h-[400px] w-full bg-white/5 overflow-hidden">
        {car.imageUrl ? (
          <Image
            src={car.imageUrl}
            alt={`${car.brand} ${car.model}`}
            fill
            className="object-cover opacity-80"
            priority
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/5">
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent"></div>

        <div className="absolute bottom-10 left-10 z-20">
          <div className="bg-white px-4 py-1 rounded border-2 border-bg-dark shadow-2xl mb-4 inline-block">
            <p className="text-bg-dark font-mono font-black text-xl tracking-widest uppercase">{car.plate}</p>
          </div>
          <h1 className="text-6xl font-black text-white uppercase tracking-tighter">
            {car.brand} <span className="text-brand">{car.model}</span>
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="glass-card p-10">
          <div className="flex items-center gap-6 mb-10 pb-10 border-b border-white/10">
            <div className="w-16 h-16 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </div>
            <div>
              <p className="text-silver/50 uppercase text-xs font-bold tracking-widest mb-1">Dueño del vehículo</p>
              <h3 className="text-2xl font-bold text-white uppercase tracking-tight">{car.owner?.name ?? "Usuario de TalkCar"}</h3>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h4 className="text-brand font-bold uppercase tracking-widest text-sm mb-4">Sobre este coche</h4>
              <p className="text-silver/80 leading-relaxed text-lg italic">
                {car.bio ? `"${car.bio}"` : `"Este dueño aún no ha escrito la historia de su ${car.brand} ${car.model}."`}
              </p>
            </section>
          </div>
        </div>

        {/* Sección de Comentarios */}
        <CommentSection carId={car.id} />
      </div>
    </main>
  );
}
