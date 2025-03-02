import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "./prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // Credentials Provider (email + password)
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; // Si email ou mot de passe sont vides, retour de null
        }

        try {
          // Recherche de l'utilisateur par son email dans la base de données
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            return null; // Si aucun utilisateur n'est trouvé
          }

          // Comparer le mot de passe hashé avec celui fourni par l'utilisateur
          const isPasswordValid = bcrypt.compareSync(
            credentials.password,
            user.password
          );

          if (isPasswordValid) {
            // Si le mot de passe est valide, retourner l'utilisateur
            return { id: user.id, email: user.email, name: user.name };
          } else {
            return null; // Mot de passe incorrect
          }
        } catch (error) {
          console.error(error);
          return null; // En cas d'erreur interne
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Utilisation du JWT pour la gestion de session
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
  },
};
