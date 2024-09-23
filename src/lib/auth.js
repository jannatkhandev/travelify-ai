
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import Email from "next-auth/providers/email";

export const authOptions = {
  providers: [
    Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};
