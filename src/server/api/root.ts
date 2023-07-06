import { exampleRouter } from "@/server/api/routers/example";
import { createTRPCRouter } from "@/server/api/trpc";
import { candidateRouter } from "./routers/candidate";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  candidate: candidateRouter,
});

export type AppRouter = typeof appRouter;
