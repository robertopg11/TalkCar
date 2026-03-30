import { type DefaultSession, type NextAuthConfig } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

// Esta es la configuración ligera para que el Middleware no pese demasiado
// NO importamos Prisma ni bcrypt aquí para que Vercel no dé error de límite de tamaño
export const authConfig = {
  providers: [], // Los providers se añaden en el config.ts completo
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized: ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const isProtectedRoute = 
        nextUrl.pathname.startsWith("/cars") || 
        nextUrl.pathname.startsWith("/profile");

      if (isProtectedRoute && !isLoggedIn) {
        return false; // Redirigir al login
      }

      return true;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub!,
      },
    }),
  },
} satisfies NextAuthConfig;
