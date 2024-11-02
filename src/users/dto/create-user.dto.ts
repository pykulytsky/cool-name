import { usersTable } from "src/db/schema";

export type CreateUserDto = typeof usersTable.$inferInsert & { fullName: string };
