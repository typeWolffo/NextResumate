import { z } from "zod";

export const CandidateSkillsSchema = z.object({
  candidateId: z.number(),
  skillId: z.number(),
});

export const CandidateSchema = z.object({
  id: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  name: z.union([z.string(), z.literal("N/A")]),
  surname: z.union([z.string(), z.literal("N/A")]),
  bio: z.union([z.string(), z.literal("N/A")]),
  favourite: z.boolean(),
  englishLvl: z.union([z.string(), z.literal("N/A")]),
  age: z.union([z.string(), z.literal("N/A")]),
  studies: z.string().optional(),
  github: z.union([z.string(), z.literal("N/A")]),
  website: z.union([z.string(), z.literal("N/A")]),
  city: z.union([z.string(), z.literal("N/A")]),
  stars: z.number().nullable(),
  points: z.number().nullable(),
  status: z.enum(["applied", "need_information", "graded"]).default("applied"),
  skills: z.array(z.string()),
});

export const SkillSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
});
