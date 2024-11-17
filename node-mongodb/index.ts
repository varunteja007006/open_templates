import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import FeedbackRouter from "@/api/feedback/routes";

const app = express();

app.use(express.json());

app.use(cors());

//Add routes
app.use("/api/feedback", FeedbackRouter);

//connect to Mongo DB
mongoose
  .connect(process.env.MONGO_URI ?? "", {
    dbName: process.env.MONGO_DATABASE_NAME ?? "", //database name
  })
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(process.env.EXPRESS_PORT ?? 4040, () => {
      console.log("Running on port : ", process.env.EXPRESS_PORT ?? 4040);
    });
  })
  .catch((error) => {
    console.log(error);
  });
