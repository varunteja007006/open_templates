import { betterAuth, Auth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db, dbSchema } from "@/lib/db"; // your drizzle instance

export const auth: Auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", 
    schema: dbSchema
  }),
  //...Providers
  emailAndPassword: {
    enabled: true,
  },
});
