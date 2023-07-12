import { type UserRoleSchema } from "@/schema/user";
import { type z } from "zod";

export type UserRole = z.infer<typeof UserRoleSchema>;
