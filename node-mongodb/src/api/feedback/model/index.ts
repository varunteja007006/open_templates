import mongoose from "mongoose";
import feedbackSchema from "@/api/feedback/schema";

const FeedbackModel = mongoose.model("feedback", feedbackSchema);

export default FeedbackModel;
