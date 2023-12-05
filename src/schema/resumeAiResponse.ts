import { z } from "zod";

export const ResumeAiResponse = z.object({
  name: z.string(),
  surname: z.string(),
  skills: z.string().or(z.array(z.string())),
  age: z.string(),
  university: z.string(),
  university_degree: z.string(),
  university_start: z.string(),
  university_end: z.string(),
  english_level: z.string(),
  github_url: z.string(),
  website_url: z.string(),
  interests: z.string().or(z.array(z.string())),
  bio: z.string(),
  favourite: z.boolean(),
  city: z.string(),
});

export type TResumeAiResponse = z.infer<typeof ResumeAiResponse>;
