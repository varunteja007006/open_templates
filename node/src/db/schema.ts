import {
  boolean,
  integer,
  pgTable,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

export const authUser = pgTable(
  "auth_user",
  {
    id: integer("id").primaryKey().notNull().generatedByDefaultAsIdentity({
      name: "null",
      startWith: undefined,
      increment: undefined,
      minValue: undefined,
      maxValue: undefined,
      cache: undefined,
    }),
    password: varchar("password", { length: 128 }).notNull(),
    lastLogin: timestamp("last_login", { withTimezone: true, mode: "string" }),
    isSuperuser: boolean("is_superuser").notNull(),
    username: varchar("username", { length: 150 }).notNull(),
    firstName: varchar("first_name", { length: 150 }).notNull(),
    lastName: varchar("last_name", { length: 150 }).notNull(),
    email: varchar("email", { length: 254 }).notNull(),
    isStaff: boolean("is_staff").notNull(),
    isActive: boolean("is_active").notNull(),
    dateJoined: timestamp("date_joined", {
      withTimezone: true,
      mode: "string",
    }).notNull(),
  },
  (table) => {
    return [
      {
        authUserUsernameKey: unique("auth_user_username_key").on(
          table.username
        ),
      },
    ];
  }
);
