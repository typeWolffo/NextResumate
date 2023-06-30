import { z } from "zod";

export const CandidateSkillsSchema = z.object({
  candidateId: z.number(),
  skillId: z.number(),
});

export const CandidateSchema = z.object({
  id: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  name: z.string().nullable(),
  surname: z.string().nullable(),
  favourite: z.boolean().nullable(),
  englishLvl: z.string().nullable(),
  age: z.string().nullable(),
  studies: z.string().nullable(),
  github: z.string().nullable(),
  website: z.string().nullable(),
  city: z.string().nullable(),
  stars: z.number().nullable(),
  points: z.number().nullable(),
  status: z.enum(["applied", "need_information", "graded"]).default("applied"),
  skills: z.array(z.string()),
});

export const SkillSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
});
