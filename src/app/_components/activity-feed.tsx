"use client";

import { api } from "talkcar/trpc/react";
import Image from "next/image";
import Link from "next/link";

export function ActivityFeed() {
  const [activity] = api.car.getGlobalActivity.useSuspenseQuery();

  if (!activity || activity.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-bg-dark relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">
              Últimos <span className="text-brand">Avistamientos</span>
            </h2>
            <p className="text-silver/50 max-w-xl">
              Explora los vehículos que la comunidad ha registrado recientemente. Haz clic en cualquier matrícula para ver su historia completa.
            </p>
          </div>
          <div className="flex items-center gap-2 text-brand font-bold text-sm tracking-widest uppercase">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand"></span>
            </span>
            En Directo
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activity.map((car) => (
            <Link 
              href={`/cars/${car.plate}`} 
              key={car.id}
              className="group glass-card overflow-hidden hover:border-brand/40 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-64 w-full bg-white/5 overflow-hidden">
                {car.imageUrl ? (
                  <Image
                    src={car.imageUrl}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white/5 group-hover:scale-110 transition-transform duration-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><path d="M9 17h6" /><circle cx="17" cy="17" r="2" /></svg>
                  </div>
                )}
                
                {/* Plate Badge Overlay */}
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-white px-3 py-1 rounded-sm border border-bg-dark shadow-xl">
                    <p className="text-bg-dark font-mono font-black text-sm tracking-wider uppercase">{car.plate}</p>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent opacity-80"></div>
              </div>

              <div className="p-6 relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full border border-brand/20 bg-brand/5 flex items-center justify-center overflow-hidden">
                    {car.owner.image ? (
                      <img src={car.owner.image} alt={car.owner.name ?? ""} className="w-full h-full object-cover" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand/40"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    )}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-silver/40">
                    Añadido por <span className="text-white">{car.owner.name?.split(" ")[0]}</span>
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white uppercase group-hover:text-brand transition-colors">
                  {car.brand} <span className="text-brand group-hover:text-white">{car.model}</span>
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
