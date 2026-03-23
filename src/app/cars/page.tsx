"use client";

import { useState } from "react";
import { api } from "talkcar/trpc/react";

export default function CarsPage() {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    plate: "",
  });

  const utils = api.useUtils();
  const cars = api.car.getMyCars.useQuery();
  
  const createCar = api.car.create.useMutation({
    onSuccess: async () => {
      await utils.car.getMyCars.invalidate();
      setFormData({ brand: "", model: "", plate: "" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCar.mutate(formData);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white p-8">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-8">
        Gestionar <span className="text-[hsl(280,100%,70%)]">Coches</span>
      </h1>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        {/* Formulario */}
        <section className="rounded-xl bg-white/10 p-6 shadow-xl backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-4">Añadir nuevo coche</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Marca</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md bg-white/5 border-0 p-2 text-white ring-1 ring-white/20 focus:ring-2 focus:ring-indigo-500"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Modelo</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md bg-white/5 border-0 p-2 text-white ring-1 ring-white/20 focus:ring-2 focus:ring-indigo-500"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Matrícula</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md bg-white/5 border-0 p-2 text-white ring-1 ring-white/20 focus:ring-2 focus:ring-indigo-500"
                value={formData.plate}
                onChange={(e) => setFormData({ ...formData, plate: e.target.value })}
              />
            </div>
            <button
              type="submit"
              disabled={createCar.isPending}
              className="w-full rounded-md bg-indigo-600 py-2 font-semibold hover:bg-indigo-500 transition disabled:opacity-50"
            >
              {createCar.isPending ? "Añadiendo..." : "Guardar Coche"}
            </button>
          </form>
        </section>

        {/* Listado */}
        <section className="rounded-xl bg-white/10 p-6 shadow-xl backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-4">Mis Coches</h2>
          {cars.isLoading ? (
            <p>Cargando lista...</p>
          ) : cars.data?.length === 0 ? (
            <p className="text-white/50 italic">No tienes coches registrados.</p>
          ) : (
            <ul className="space-y-3">
              {cars.data?.map((car) => (
                <li
                  key={car.id}
                  className="flex items-center justify-between rounded-lg bg-white/5 p-3 ring-1 ring-white/10 hover:bg-white/10 transition"
                >
                  <div>
                    <p className="font-bold">{car.brand} {car.model}</p>
                    <p className="text-sm text-indigo-300 font-mono uppercase">{car.plate}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
