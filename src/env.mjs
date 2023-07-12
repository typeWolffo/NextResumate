import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const EmailSchema = z.string().email();

const CommaSeparatedEmailsSchema = z.string().refine(
  (str) => {
    const emails = str.split(",");
    return emails.every((email) => EmailSchema.safeParse(email).success);
  },
  {
    message: "Invalid email format",
  }
);

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXTAUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string().min(1)
        : z.string().min(1).optional(),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string().min(1) : z.string().url()
    ),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    OPEN_AI_API_KEY: z.string(),
  },

  client: {
    NEXT_PUBLIC_ADMIN_EMAILS: CommaSeparatedEmailsSchema,
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
    NEXT_PUBLIC_ADMIN_EMAILS: process.env.NEXT_PUBLIC_ADMIN_EMAILS,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
