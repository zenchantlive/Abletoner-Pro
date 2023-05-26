import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { Session } from "next-auth";
import { CookiesOptions } from "next-auth";
interface CustomSession extends Session {
  userId: number;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {},
      // @ts-ignore
      async authorize(credentials, _) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password) {
          throw new Error("Missing username or password");
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          throw new Error("Invalid username or password");
        }
        return user;
      },
    }),
  ],
  session: { 
    strategy: "jwt",
  },
  callbacks: {
    session: async (params) => {
      const session = params.session as CustomSession;
      const user = params.user as User & { id: number | string };
      session.userId = Number(user.id);
      return session;
    },
  },
  // Use secure cookies (transmitted over HTTPS only) 
  cookies: {
    secure: process.env.NODE_ENV === 'production',
  } as CookiesOptions,
});
