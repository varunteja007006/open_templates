import { integer, pgTable, unique, varchar } from "drizzle-orm/pg-core";

export const contactUs = pgTable(
  "contact_us",
  {
    id: integer("id").primaryKey().notNull().generatedByDefaultAsIdentity({
      name: "null",
      startWith: undefined,
      increment: undefined,
      minValue: undefined,
      maxValue: undefined,
      cache: undefined,
    }),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    message: varchar("message", { length: 255 }).notNull(),
  },
  (table) => {
    return [
      {
        contactUsPkey: unique("contact_us_pkey").on(table.id),
      },
    ];
  }
);
