import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "talkcar/server/api/trpc";

export const commentRouter = createTRPCRouter({
  // Obtener comentarios de un coche por su ID
  getByCarId: publicProcedure
    .input(z.object({ carId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.comment.findMany({
        where: { carId: input.carId },
        orderBy: { createdAt: "desc" },
        include: {
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
    }),

  // Publicar un nuevo comentario
  create: protectedProcedure
    .input(
      z.object({
        carId: z.string(),
        content: z.string().min(1).max(500),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.comment.create({
        data: {
          content: input.content,
          car: { connect: { id: input.carId } },
          author: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
});
