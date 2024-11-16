// Make sure to install the 'pg' package
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

// You can specify any property from the node-postgres connection options
const db = drizzle({
  connection: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    //   connectionString: process.env.DATABASE_URL,
    ssl: false,
  },
});

export default db;
