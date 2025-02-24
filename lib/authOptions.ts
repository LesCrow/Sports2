import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

// https://localhost:3000/api/auth/callback/github
export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
};
