import { UserRoleSchema } from "@/schema/user";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  /**
   * @example
   *
   * const { mutate } = api.user.updateUserRole.useMutation();
   * mutate({ role: "HR", id: "user cuid" });
   *
   */
  updateUserRole: protectedProcedure
    .input(z.object({ email: z.string().email(), role: UserRoleSchema }))
    .mutation(({ ctx, input }) => {
      if (
        ctx.session?.user?.email === input.email &&
        ctx.session?.user?.role === "ADMIN"
      ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Admin cannot change their own role to lower role",
        });
      }

      return ctx.prisma.user.update({
        where: {
          email: input.email,
        },
        data: {
          role: input.role,
        },
      });
    }),
});
