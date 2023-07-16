import { candidateRouter } from "@/server/api/routers/candidate";
import { exampleRouter } from "@/server/api/routers/example";
import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  candidate: candidateRouter,
});

export type AppRouter = typeof appRouter;
