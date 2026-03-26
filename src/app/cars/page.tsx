"use client";

import { useState, useRef } from "react";
import { api } from "talkcar/trpc/react";
import Image from "next/image";

export default function CarsPage() {
  const [isAdding, setIsAdding] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    plate: "",
    color: "",
  });

  const utils = api.useUtils();
  const cars = api.car.getMyCars.useQuery();
  
  const createCar = api.car.create.useMutation({
    onSuccess: async () => {
      await utils.car.getMyCars.invalidate();
      setFormData({ brand: "", model: "", plate: "", color: "" });
      setSelectedFile(null);
      setPreviewUrl(null);
      setIsAdding(false);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith(".png")) {
        alert("Solo se permiten archivos .png");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let imageUrl = "";
    
    if (selectedFile) {
      setIsUploading(true);
      try {
        const uploadData = new FormData();
        uploadData.append("file", selectedFile);
        
        const res = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });
        
        if (!res.ok) throw new Error("Error al subir la imagen");
        
        const data = await res.json();
        imageUrl = data.imageUrl;
      } catch (error) {
        console.error(error);
        alert("Error al subir la imagen. Por favor, inténtalo de nuevo.");
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    }

    createCar.mutate({ ...formData, imageUrl });
  };

  return (
    <main className="min-h-screen bg-bg-dark text-silver pb-20">
      {/* Header Section */}
      <div className="relative h-48 w-full bg-gradient-to-b from-brand/20 to-transparent flex items-center justify-center border-b border-glass-border">
        <div className="text-center">
          <h1 className="text-5xl font-black tracking-tighter text-white mb-2">
            MIS <span className="text-brand">COCHES</span>
          </h1>
          <p className="text-silver/60 uppercase tracking-widest text-sm font-bold">
            Tu colección personal de vehículos
          </p>
        </div>
        
        {/* Plus Button */}
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="absolute top-8 right-8 w-14 h-14 bg-brand hover:bg-brand-hover text-bg-dark rounded-full flex items-center justify-center shadow-lg shadow-brand/20 transition-all hover:scale-110 active:scale-95 z-50"
          title="Añadir coche"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Add Car Form (Conditional) */}
        {isAdding && (
          <div className="mb-12 glass-card p-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-top-4 duration-300">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
              </span>
              Nuevo Vehículo
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Upload Area */}
              <div className="md:col-span-2">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-40 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-brand/40 hover:bg-white/5 transition-all overflow-hidden relative"
                >
                  {previewUrl ? (
                    <Image 
                      src={previewUrl} 
                      alt="Vista previa" 
                      fill 
                      className="object-cover opacity-60"
                    />
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-silver/30 mb-2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                      <p className="text-sm font-bold text-silver/50">SUBIR IMAGEN (.PNG)</p>
                    </>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".png"
                    className="hidden" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-silver/50">Marca</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: BMW"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand transition-all"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-silver/50">Modelo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: M3"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand transition-all"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-silver/50">Matrícula</label>
                <input
                  type="text"
                  required
                  placeholder="1234ABC"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand font-mono uppercase transition-all"
                  value={formData.plate}
                  onChange={(e) => setFormData({ ...formData, plate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-silver/50">Color</label>
                <input
                  type="text"
                  placeholder="Ej: Azul Estoril"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand transition-all"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                />
              </div>
              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  disabled={createCar.isPending || isUploading}
                  className="w-full btn-primary py-4 text-lg disabled:opacity-50"
                >
                  {createCar.isPending || isUploading ? "PROCESANDO..." : "REGISTRAR COCHE"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Cars Grid */}
        {cars.isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 grayscale opacity-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand mb-4"></div>
            <p className="font-bold tracking-widest text-brand">CARGANDO GARAJE...</p>
          </div>
        ) : cars.data?.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-silver/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No tienes coches registrados</h3>
            <p className="text-silver/50 mb-8">Empieza por añadir tu primer vehículo usando el botón superior.</p>
            <button 
              onClick={() => setIsAdding(true)}
              className="btn-outline"
            >
              Añadir mi primer coche
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.data?.map((car) => (
              <div key={car.id} className="glass-card group overflow-hidden hover:border-brand/40 transition-all duration-500">
                {/* Car Image */}
                <div className="relative h-56 w-full bg-white/5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent z-10 opacity-60"></div>
                  {car.imageUrl ? (
                    <Image 
                      src={car.imageUrl} 
                      alt={`${car.brand} ${car.model}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/5 group-hover:scale-110 transition-transform duration-700">
                      <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
                    </div>
                  )}
                  {/* Badge Plate */}
                  <div className="absolute bottom-4 left-4 z-20 bg-white px-3 py-1 rounded border border-bg-dark shadow-lg">
                    <p className="text-bg-dark font-mono font-black text-sm tracking-widest uppercase">{car.plate}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-white leading-tight uppercase group-hover:text-brand transition-colors">
                        {car.brand} <span className="block text-silver/60 text-lg font-bold">{car.model}</span>
                      </h3>
                    </div>
                    {car.color && (
                      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: car.color.toLowerCase().includes('rojo') ? 'red' : car.color.toLowerCase().includes('azul') ? 'blue' : car.color.toLowerCase().includes('negro') ? 'black' : car.color.toLowerCase().includes('blanco') ? 'white' : car.color }}></div>
                        <span className="text-xs font-bold uppercase text-silver/70">{car.color}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <button className="btn-outline py-2 text-xs flex items-center justify-center gap-2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                       DETALLES
                    </button>
                    <button className="btn-outline py-2 text-xs flex items-center justify-center gap-2 hover:bg-brand/10">
                       <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                       EDITAR
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
