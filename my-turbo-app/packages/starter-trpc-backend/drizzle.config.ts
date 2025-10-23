import { defineConfig } from "drizzle-kit";

import dotenv from "dotenv";
dotenv.config({
  path: "../../.env"
})

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  throw new Error("URL not found")
}

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./src/db/schema/*",
  
  dbCredentials: {
    url: DATABASE_URL,
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
