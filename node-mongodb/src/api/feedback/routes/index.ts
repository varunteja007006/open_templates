import express from "express";

import { getFeedback } from "@/api/feedback/controllers";

const FeedbackRouter = express.Router();

//get all orders
FeedbackRouter.get("/", getFeedback);

export default FeedbackRouter;
