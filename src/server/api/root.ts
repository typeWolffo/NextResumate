import { candidateRouter } from "@/server/api/routers/candidate";
import { userRouter } from "@/server/api/routers/user";
import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  candidate: candidateRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
