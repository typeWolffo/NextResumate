import { z } from "zod";

export const CandidateSchema = z.object({
  id: z.string().optional(),
  candidateId: z.number().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  name: z.union([z.string(), z.literal("N/A")]),
  surname: z.union([z.string(), z.literal("N/A")]),
  bio: z.union([z.string(), z.literal("N/A")]),
  favourite: z.boolean().optional(),
  english_level: z.union([z.string(), z.literal("N/A")]),
  age: z.union([z.string(), z.literal("N/A")]),
  university: z.union([z.string(), z.literal("N/A")]),
  university_start: z.union([z.string(), z.literal("N/A")]),
  university_end: z.union([z.string(), z.literal("N/A")]),
  university_degree: z.union([z.string(), z.literal("N/A")]),
  github_url: z.union([z.string(), z.literal("N/A")]),
  website_url: z.union([z.string(), z.literal("N/A")]),
  city: z.union([z.string(), z.literal("N/A")]),
  stars: z.number().nullable().optional(),
  points: z.number().nullable().optional(),
  status: z.enum(["applied", "need_information", "graded"]).default("applied"),
  skills: z.string().or(z.array(z.string())),
  interests: z.string().or(z.array(z.string())),
});

export type TCandidate = z.infer<typeof CandidateSchema>;

export type TCandidateFormFields = Pick<
  TCandidate,
  | "name"
  | "surname"
  | "bio"
  | "favourite"
  | "english_level"
  | "age"
  | "university"
  | "university_start"
  | "university_end"
  | "university_degree"
  | "github_url"
  | "website_url"
  | "city"
  | "skills"
  | "interests"
>;
