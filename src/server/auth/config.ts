import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { db } from "talkcar/server/db";
import { authConfig as edgeConfig } from "./auth.config";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  ...edgeConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await db.user.findUnique({
          where: { email: credentials?.email as string },
        });

        if (user?.password) {
          const isValid = await bcrypt.compare(
            credentials?.password as string,
            user.password
          );

          if (isValid) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            };
          }
        }
        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
