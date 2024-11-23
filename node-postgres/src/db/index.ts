// Make sure to install the 'pg' package
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

// You can specify any property from the node-postgres connection options
const db = drizzle({
  connection: {
    // connectionString: process.env.DATABASE_URL, // commenting this because we are using other way to connect
    host: process.env.DATABASE_HOST ?? "localhost",
    port: 5432,
    user: process.env.DATABASE_USER ?? "",
    password: process.env.DATABASE_PASSWORD ?? "",
    database: process.env.DATABASE_NAME ?? "",
    ssl: false,
  },
});

export default db;
