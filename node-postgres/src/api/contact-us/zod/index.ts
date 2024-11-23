import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

import { contactUs } from "@/api/contact-us/schema";

export const contactUsZodSchema = createInsertSchema(contactUs).omit({
  id: true,
});
