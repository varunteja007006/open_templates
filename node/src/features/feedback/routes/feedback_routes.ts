import express from "express";

import { getFeedback } from "../controllers/feedback_controller";

const FeedbackRouter = express.Router();

//get all orders
FeedbackRouter.get("/", getFeedback);

export default FeedbackRouter;
