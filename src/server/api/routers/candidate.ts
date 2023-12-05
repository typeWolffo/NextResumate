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
      if (!Array.isArray(input.skills)) throw new Error("Skills must be array");

      return ctx.prisma.candidate.create({
        data: {
          name: input.name,
          surname: input.surname,
          bio: input.bio,
          favourite: input.favourite,
          english_level: input.english_level,
          age: input.age,
          university: input.university,
          university_start: input.university_start,
          university_end: input.university_end,
          university_degree: input.university_degree,
          github_url: input.github_url,
          website_url: input.website_url,
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
      if (!Array.isArray(input.skills)) throw new Error("Skills must be array");

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
              english_level: {
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
      if (!Array.isArray(input.skills)) throw new Error("Skills must be array");

      return ctx.prisma.candidate.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          surname: input.surname,
          favourite: input.favourite,
          english_level: input.english_level,
          age: input.age,
          university: input.university,
          university_start: input.university_start,
          university_end: input.university_end,
          university_degree: input.university_degree,
          github_url: input.github_url,
          website_url: input.website_url,
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
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.candidate.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
