import db from "./db";
import { authUser } from "./db/schema";

async function main() {
  const authUsers = await db.select().from(authUser);
  console.log(authUsers);
}

main();
