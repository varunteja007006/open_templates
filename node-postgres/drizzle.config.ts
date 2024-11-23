import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  out: "./drizzle",
  schema: ["./src/api/**"],
  dbCredentials: {
    host: process.env.DATABASE_HOST ?? "localhost",
    port: 5432,
    user: process.env.DATABASE_USER ?? "",
    password: process.env.DATABASE_PASSWORD ?? "",
    database: process.env.DATABASE_NAME ?? "",
    ssl: false,
  },
  migrations: {
    prefix: "timestamp",
    table: "__drizzle_migrations__",
    schema: "public",
  },
  strict: true,
  verbose: true,
});
