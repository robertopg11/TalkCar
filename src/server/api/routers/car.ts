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
        bio: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.car.create({
        data: {
          brand: input.brand,
          model: input.model,
          plate: input.plate.toUpperCase().replace(/\s+/g, ""),
          color: input.color,
          imageUrl: input.imageUrl,
          bio: input.bio,
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

  // Buscar un coche específico por su matrícula
  getByPlate: publicProcedure
    .input(z.object({ plate: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.car.findUnique({
        where: { plate: input.plate.toUpperCase().replace(/\s+/g, "") },
        include: {
          owner: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
    }),

  // Actualizar un coche existente
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        brand: z.string().min(1).optional(),
        model: z.string().min(1).optional(),
        color: z.string().optional(),
        imageUrl: z.string().optional(),
        bio: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const car = await ctx.db.car.findUnique({
        where: { id: input.id },
      });

      if (!car || car.ownerId !== ctx.session.user.id) {
        throw new Error("No tienes permiso para editar este coche.");
      }

      return ctx.db.car.update({
        where: { id: input.id },
        data: {
          brand: input.brand,
          model: input.model,
          color: input.color,
          imageUrl: input.imageUrl,
          bio: input.bio,
        },
      });
    }),
});
