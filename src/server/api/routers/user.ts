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
    .input(z.object({ id: z.string(), role: UserRoleSchema }))
    .mutation(({ ctx, input }) => {
      if (ctx.session?.user?.role) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You can not change your role once it has been set.",
        });
      }

      return ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          role: input.role,
        },
      });
    }),
});
