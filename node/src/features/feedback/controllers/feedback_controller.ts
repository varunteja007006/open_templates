import mongoose from "mongoose";

import feedbackSchema from "@/src/mongodb/schema/feedback_model";

export const getFeedback = async (req: any, res: any) => {
  const feedback = await mongoose.model("feedback", feedbackSchema).find();
  return res.status(200).json(feedback);
};
