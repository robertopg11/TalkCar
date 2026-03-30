import { api, HydrateClient } from "talkcar/trpc/server";
import { ActivityFeed } from "talkcar/app/_components/activity-feed";
import { Suspense } from "react";

export default async function ExplorePage() {
  void api.car.getGlobalActivity.prefetch();

  return (
    <HydrateClient>
      <main className="min-h-screen bg-bg-dark pt-12">
        <div className="container mx-auto px-4">
          <div className="mb-12 border-b border-white/5 pb-8">
            <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-4">
              Explorar <span className="text-brand">TalkCar</span>
            </h1>
            <p className="text-silver/60 text-lg max-w-2xl">
              Descubre los coches más impresionantes registrados por nuestra comunidad y lee sus historias.
            </p>
          </div>
          
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-80 bg-white/5 rounded-3xl animate-pulse" />
              ))}
            </div>
          }>
            <ActivityFeed />
          </Suspense>
        </div>
      </main>
    </HydrateClient>
  );
}
