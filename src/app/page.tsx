import { HydrateClient } from "talkcar/trpc/server";
import { HeroSlideshow } from "talkcar/app/_components/hero-slideshow";
import { SearchForm } from "talkcar/app/_components/search-form";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative h-[650px] flex items-center justify-center text-white overflow-hidden">
          <HeroSlideshow />

          <div className="relative z-10 container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
              ¿Te gusta el coche que ves? <br />
              <span className="text-brand">Descubre su historia.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-silver/90 max-w-3xl mx-auto font-medium">
              Introduce la matrícula para guardar el coche en tu colección y conocer sus detalles básicos.
            </p>

            {/* Search Bar */}
            <SearchForm />
          </div>
        </section>

        {/* Process Section */}
        <section className="py-32 bg-bg-dark relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="process-card">
                <div className="icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">1. Ves un coche que te encanta.</h3>
                <p className="text-silver/60">Captura ese momento especial en la calle o en cualquier lugar.</p>
              </div>
              
              {/* Step 2 */}
              <div className="process-card">
                <div className="icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z"/><path d="M15 13H9"/><path d="M15 17H9"/><path d="M10 9H9"/><path d="M22 22l-4-4"/><circle cx="13.5" cy="13.5" r="4.5"/></svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">2. Buscas su matrícula en la app.</h3>
                <p className="text-silver/60">Accede a la información técnica y curiosidades del vehículo al instante.</p>
              </div>

              {/* Step 3 */}
              <div className="process-card">
                <div className="icon-wrapper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/><path d="M21 12H3"/><path d="M12 9h.01"/><path d="M15 9h.01"/><path d="M9 9h.01"/></svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">3. Lo guardas en tu garaje virtual.</h3>
                <p className="text-silver/60">Crea tu propia colección privada y compártela con otros entusiastas.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </HydrateClient>
  );
}
