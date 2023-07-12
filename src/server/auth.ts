import { env } from "@/env.mjs";
import { prisma } from "@/server/db";
import { type UserRole } from "@/types/User";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";

import { UserRoleSchema } from "@/schema/user";
import { TRPCError } from "@trpc/server";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "./api/trpc";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
  }
}

const router = createTRPCRouter({
  user: createTRPCRouter({
    updateUserRole: publicProcedure
      .input(z.object({ email: z.string(), role: UserRoleSchema }))
      .mutation(({ ctx, input }) => {
        return ctx.prisma.user.update({
          where: {
            email: input.email,
          },
          data: {
            role: input.role,
          },
        });
      }),
  }),
});

const caller = router.createCaller({
  session: null,
  prisma,
});

const handleError = (error: unknown) => {
  if (error instanceof TRPCError) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: error.message,
    });
  }
  throw new Error(error as string);
};

export const authOptions: NextAuthOptions = {
  callbacks: {
    signIn: ({ user }) => {
      const adminEmails = env.NEXT_PUBLIC_ADMIN_EMAILS.split(",");

      if (user.email && adminEmails.includes(user.email)) {
        caller.user
          .updateUserRole({ email: user.email, role: "ADMIN" })
          .then(() => {
            return true;
          })
          .catch((error) => {
            handleError(error);
          });
      }

      if (
        user.email &&
        (user.role === "ADMIN" || !user.role) &&
        !adminEmails.includes(user.email)
      ) {
        caller.user
          .updateUserRole({ email: user.email, role: "REVIEWER" })
          .then(() => {
            return true;
          })
          .catch((error) => {
            handleError(error);
          });
      }

      return true;
    },
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        role: user.role,
      },
    }),
    // eslint-disable-next-line @typescript-eslint/require-await
    redirect: async ({ url, baseUrl }) => {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
