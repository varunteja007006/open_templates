import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const postTable = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  post: varchar({ length: 255 }).notNull(),
});
