import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./src/db/schema/*",
  
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },

  introspect: {
    casing: "camel",
  },

  migrations: {
    prefix: "timestamp",
    table: "__drizzle_migrations__",
    schema: "public",
  },

  breakpoints: true,
  strict: true,
  verbose: true,
});
