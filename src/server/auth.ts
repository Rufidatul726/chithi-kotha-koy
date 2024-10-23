import {
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { userService } from "./services/userService";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", 
  },
  callbacks: {
    async jwt({ token, account, user }) { 
      if (account?.type === "credentials" && user) {
        token.userId = user.id;
      } 
      
      if (account?.provider && account.provider !== "credentials") {
        token.userId = account.providerAccountId; 
      }

      return token; 
    },
    async session({ session, token }) { 
      session.user.id = token.userId;
      
      return session; 
    },

    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  pages: {
    signIn: '/auth', 
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        email: {label: "email", type: "email", placeholder: "email"},
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        const user = await userService.authorize(username, password);

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
    // Github provider
    Github({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    // Google provider
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  secret: process.env.AUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET, 
  },
};

export const getServerAuthSession = () => getServerSession(authOptions); //(6)
