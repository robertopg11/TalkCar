import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Limpiando base de datos...");
  
  // Limpiar en orden inverso de dependencias
  await prisma.comment.deleteMany();
  await prisma.car.deleteMany();
  await prisma.user.deleteMany();

  console.log("🌱 Generando usuarios de prueba...");

  const hashedPassword = await bcrypt.hash("password123", 10);

  // 1. Crear Usuarios
  const user1 = await prisma.user.create({
    data: {
      name: "Rober",
      email: "rober@talkcar.com",
      password: hashedPassword,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rober",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Elena García",
      email: "elena@talkcar.com",
      password: hashedPassword,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Carlos Drift",
      email: "carlos@talkcar.com",
      password: hashedPassword,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    },
  });

  console.log("🚗 Generando coches y biografía...");

  // 2. Crear Coches
  const car1 = await prisma.car.create({
    data: {
      brand: "Porsche",
      model: "911 Carrera",
      plate: "9110PRR",
      color: "Rojo Guardia",
      ownerId: user1.id,
      bio: "Mi sueño desde pequeño. Lo uso solo los fines de semana para rutas por la sierra. El motor bóxer es pura música.",
      imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
    },
  });

  const car2 = await prisma.car.create({
    data: {
      brand: "BMW",
      model: "M3 E46",
      plate: "4444BMW",
      color: "Laguna Seca Blue",
      ownerId: user3.id,
      bio: "Un clásico instantáneo. Restaurado por completo el año pasado. Driftear con esto es lo más divertido que puedes hacer con ropa puesta.",
      imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800",
    },
  });

  const car3 = await prisma.car.create({
    data: {
      brand: "Volkswagen",
      model: "Golf GTI VII",
      plate: "0007GTI",
      color: "Negro",
      ownerId: user2.id,
      bio: "Mi fiel compañero diario. Cómodo para ir al súper y divertido para escaparte por curvas. El equilibrio perfecto.",
      imageUrl: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800",
    },
  });

  console.log("💬 Generando comentarios y avistamientos...");

  // 3. Crear Comentarios
  await prisma.comment.createMany({
    data: [
      {
        content: "¡Lo he visto hoy en la M-40! Sonaba increíble.",
        carId: car1.id,
        authorId: user2.id,
      },
      {
        content: "Esa generación de M3 es la mejor que han hecho. ¡Cuídalo!",
        carId: car2.id,
        authorId: user1.id,
      },
      {
        content: "Me encanta el color azul, no se ven muchos así.",
        carId: car2.id,
        authorId: user2.id,
      },
    ],
  });

  console.log("✅ Base de datos poblada con éxito.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
