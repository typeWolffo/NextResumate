import { CandidateSchema } from "@/schema/candidate";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const candidateRouter = createTRPCRouter({
  createCandidate: publicProcedure
    .input(CandidateSchema)
    .mutation(({ ctx, input }) => {
      const { prisma } = ctx;
      return prisma.candidate.create({
        data: {
          name: input.name,
          surname: input.surname,
          favourite: input.favourite,
          englishLvl: input.englishLvl,
          age: input.age,
          studies: input.studies,
          github: input.github,
          website: input.website,
          city: input.city,
          grade: input.grade,
          skills: {
            create: input.skills.map((skillName) => {
              return {
                skill: {
                  connectOrCreate: {
                    create: { name: skillName },
                    where: { name: skillName },
                  },
                },
              };
            }),
          },
        },
      });
    }),
});
