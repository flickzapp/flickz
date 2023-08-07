import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

import { siteConfig } from "@/config/site";
import { db } from "@/lib/db";

// const postmarkClient = new Client(env.POSTMARK_API_TOKEN)

export const authOptions: NextAuthOptions = {
  // huh any! I know.
  // This is a temporary fix for prisma client.
  // @see https://github.com/prisma/prisma/issues/16117
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    EmailProvider({
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        try {
          const user = await db.user.findUnique({
            where: {
              email: identifier,
            },
            select: {
              emailVerified: true,
            },
          });

          const isEmailVerified = user?.emailVerified;

          let subject;
          let htmlContent;

          if (isEmailVerified) {
            subject = "Sign In Link";
            htmlContent = `Welcome back! Click <a href="${url}">here</a> to sign in.`;
          } else {
            2;
            subject = "Verify Your Email Address";
            htmlContent = `Please click <a href="${url}">here</a> to verify your email address.`;
          }

          await resend.emails.send({
            from: "ashutosh@verify.flickz.app",
            to: identifier,
            subject: subject,
            html: htmlContent,
          });
        } catch (error) {
          console.log({ error });
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
  },
};
