import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "talkcar/server/api/trpc";

export const carRouter = createTRPCRouter({
  // Consulta protegida: solo el dueño puede ver sus coches
  getMyCars: protectedProcedure.query(({ ctx }) => {
    return ctx.db.car.findMany({
      where: { ownerId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),

  // Mutación protegida: añadir un coche
  create: protectedProcedure
    .input(
      z.object({
        brand: z.string().min(1),
        model: z.string().min(1),
        plate: z.string().min(1),
        color: z.string().optional(),
        imageUrl: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.car.create({
        data: {
          brand: input.brand,
          model: input.model,
          plate: input.plate,
          color: input.color,
          imageUrl: input.imageUrl,
          owner: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  // Consulta pública: listado general (opcional)
  getAllPublic: publicProcedure.query(({ ctx }) => {
    return ctx.db.car.findMany({
      select: {
        brand: true,
        model: true,
      },
      take: 10,
    });
  }),
});
