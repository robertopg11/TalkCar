"use client";

import { useState } from "react";
import { api } from "talkcar/trpc/react";
import { useSession } from "next-auth/react";

interface CommentSectionProps {
  carId: string;
}

export function CommentSection({ carId }: CommentSectionProps) {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const utils = api.useUtils();

  const comments = api.comment.getByCarId.useQuery({ carId });
  const createComment = api.comment.create.useMutation({
    onSuccess: async () => {
      setContent("");
      await utils.comment.getByCarId.invalidate({ carId });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    createComment.mutate({ carId, content });
  };

  return (
    <section className="mt-16 pt-16 border-t border-white/10">
      <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-10 flex items-center gap-4">
        <span className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        </span>
        Avistamientos y Comentarios
      </h3>

      {/* Formulario de comentario */}
      {session ? (
        <form onSubmit={handleSubmit} className="glass-card p-6 mb-12 border-brand/20">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center text-silver/30 overflow-hidden">
              {session.user.image ? (
                <img src={session.user.image} alt={session.user.name ?? ""} className="w-full h-full object-cover" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              )}
            </div>
            <div className="flex-1 space-y-4">
              <textarea
                placeholder="¡Cuéntanos dónde has visto este coche o deja un mensaje!"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand transition-all min-h-[100px] resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={createComment.isPending || !content.trim()}
                  className="btn-primary py-2 px-8 text-sm disabled:opacity-50"
                >
                  {createComment.isPending ? "PUBLICANDO..." : "PUBLICAR MENSAJE"}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="glass-card p-8 mb-12 text-center bg-brand/5 border-dashed border-brand/20">
          <p className="text-silver/60 mb-4">¿Has visto este coche o tienes algo que decir? Inicia sesión para comentar.</p>
          <a href="/signin" className="btn-outline inline-block text-xs py-2 px-6">INICIAR SESIÓN</a>
        </div>
      )}

      {/* Lista de comentarios */}
      <div className="space-y-6">
        {comments.isLoading ? (
          <div className="flex justify-center py-10 opacity-30">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand"></div>
          </div>
        ) : comments.data?.length === 0 ? (
          <div className="text-center py-10 opacity-40 italic">
            &quot;Aún no hay avistamientos. Sé el primero en decir algo.&quot;
          </div>
        ) : (
          comments.data?.map((comment) => (
            <div key={comment.id} className="glass-card p-6 flex gap-4 hover:border-white/20 transition-all">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex-shrink-0 flex items-center justify-center text-silver/30 overflow-hidden">
                {comment.author.image ? (
                  <img src={comment.author.image} alt={comment.author.name ?? ""} className="w-full h-full object-cover" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-white text-sm uppercase tracking-wide">{comment.author.name ?? "Usuario Anónimo"}</h4>
                  <span className="text-[10px] uppercase font-bold text-silver/30 tracking-widest">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-silver/80 text-sm leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
