import { type CandidateSchema } from "@/schema/candidate";
import { type z } from "zod";

export type CandidateType = z.infer<typeof CandidateSchema>;
