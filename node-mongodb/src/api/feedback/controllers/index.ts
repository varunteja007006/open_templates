import FeedbackModel from "@/api/feedback/model";

export const getFeedback = async (req: any, res: any) => {
  const feedback = await FeedbackModel.find();
  return res.status(200).json(feedback);
};
