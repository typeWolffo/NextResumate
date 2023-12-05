import { literal, union, type z } from "zod";

export type TUserRole = z.infer<typeof UserRoleSchema>;

export const UserRoleSchema = union([
  literal("HR"),
  literal("REVIEWER"),
  literal("ADMIN"),
]);
