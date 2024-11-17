import db from "@/db";
import { authUser } from "@/api/contact-us/schema";

export async function getContactUsInfo(req: any, res: any) {
  const users = await db.select().from(authUser);
  return res.status(200).json(users);
}
