import { literal, union } from "zod";

export const UserRoleSchema = union([
  literal("HR"),
  literal("REVIEWER"),
  literal("ADMIN"),
]);
