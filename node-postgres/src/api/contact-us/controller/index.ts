import db from "@/db";
import { contactUs } from "@/api/contact-us/schema";
import { contactUsZodSchema } from "../zod";
import { zodReadableError } from "@/utils/utils";

export async function getContactUsInfo(req: any, res: any) {
  try {
    const contactUsRecords = await db.select().from(contactUs);
    return res.status(200).json(contactUsRecords);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}

export async function createContactUs(req: any, res: any) {
  try {
    // let us validate the data using zod
    const validatedData = contactUsZodSchema.safeParse(req.body);
    if (!validatedData.success) {
      // if not valid
      return res
        .status(400)
        .json({ error: zodReadableError(validatedData.error) });
    }

    // if valid let us insert in the db
    const contactUsRecord = await db
      .insert(contactUs)
      .values(validatedData.data)
      .returning();
    return res.status(200).json(contactUsRecord);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
