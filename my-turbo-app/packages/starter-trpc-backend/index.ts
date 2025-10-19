import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as dbSchemas from "./src/schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const db = drizzle({ client: pool, casing: "snake_case" });

async function main() {
  console.log("TESTING DB: F",await db.execute("SELECT 1"));
}
main();

export { db, dbSchemas };
