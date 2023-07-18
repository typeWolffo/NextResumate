import { CandidateSchema } from "@/schema/candidate";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";

export const candidateRouter = createTRPCRouter({
  /**
   * @example
   *
   * const { mutate, error } = api.candidate.createCandidate.useMutation();
   *
   * mutate(<candidate object here>);
   *
   */
  createCandidate: protectedProcedure
    .input(CandidateSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.candidate.create({
        data: {
          name: input.name,
          surname: input.surname,
          bio: input.bio,
          favourite: input.favourite,
          englishLvl: input.englishLvl,
          age: input.age,
          studies: input.studies,
          github: input.github,
          website: input.website,
          city: input.city,
          stars: input.stars,
          status: input.status,
          points: input.points,
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

  /**
   * @example
   *
   * const { data } = api.candidate.getAllCandidates.useQuery();
   *
   */
  getAllCandidates: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.candidate.findMany({
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
      },
    });
  }),

  /**
   * @example
   *
   * const { data } = api.candidate.getCandidateById.useQuery({
   *    id: 1,
   * });
   *
   */
  getCandidateById: publicProcedure
    .input(CandidateSchema.pick({ id: true }))
    .query(({ ctx, input }) => {
      return ctx.prisma.candidate.findUnique({
        where: {
          id: input.id,
        },
        include: {
          skills: {
            include: {
              skill: true,
            },
          },
        },
      });
    }),

  /**
   * @example
   *
   * const { data } = api.candidate.getCandidatesBySkill.useQuery({
   *    skills: ["React", "NextJS"],
   * });
   *
   */
  getCandidatesBySkill: publicProcedure
    .input(CandidateSchema.pick({ skills: true }))
    .query(({ ctx, input }) => {
      return ctx.prisma.candidate.findMany({
        where: {
          skills: {
            some: {
              skill: {
                name: {
                  in: input.skills,
                },
              },
            },
          },
        },
        include: {
          skills: {
            include: {
              skill: true,
            },
          },
        },
      });
    }),

  /**
   * @example
   *
   * const { data } = api.candidate.findCandidatesBy.useQuery({
   *    searchTerm: "typescript",
   * });
   *
   */
  findCandidatesBy: publicProcedure
    .input(z.object({ searchTerm: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.candidate.findMany({
        where: {
          OR: [
            {
              name: {
                contains: input.searchTerm,
                mode: "insensitive",
              },
            },
            {
              surname: {
                contains: input.searchTerm,
                mode: "insensitive",
              },
            },
            {
              city: {
                contains: input.searchTerm,
                mode: "insensitive",
              },
            },
            {
              englishLvl: {
                contains: input.searchTerm,
                mode: "insensitive",
              },
            },
            {
              skills: {
                some: {
                  skill: {
                    name: {
                      contains: input.searchTerm,
                      mode: "insensitive",
                    },
                  },
                },
              },
            },
          ],
        },
        include: {
          skills: {
            include: {
              skill: true,
            },
          },
        },
      });
    }),

  /**
   * @example
   *
   * const { mutate, error } = api.candidate.updateCandidate.useMutation();
   *
   * mutate(<candidate object here>);
   *
   */
  updateCandidate: protectedProcedure
    .input(CandidateSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.candidate.update({
        where: {
          id: input.id,
        },
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
          stars: input.stars,
          status: input.status,
          points: input.points,
          skills: {
            deleteMany: {}, // First delete all connections and then create new ones
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

  /**
   * @example
   *
   * const { mutate, error } = api.candidate.deleteCandidate.useMutation();
   *
   * mutate({ id: 1 });
   *
   */
  deleteCandidate: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.candidate.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
