"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SearchForm() {
  const [plate, setPlate] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (plate.trim()) {
      // Limpiar espacios y pasar a mayúsculas para el URL
      const cleanPlate = plate.trim().toUpperCase().replace(/\s+/g, "");
      router.push(`/cars/${cleanPlate}`);
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="search-container group focus-within:ring-4 focus-within:ring-brand/30 transition-all"
    >
      <div className="pl-6 text-brand/50">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </div>
      <input 
        type="text" 
        placeholder="Ej: 1234 LMK" 
        className="search-input"
        value={plate}
        onChange={(e) => setPlate(e.target.value)}
      />
      <button type="submit" className="search-btn">
        <span>Buscar Coche</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </button>
    </form>
  );
}
