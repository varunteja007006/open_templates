import { Schema } from "mongoose";

//Create the model using Schema
const feedbackSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    feedback: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default feedbackSchema;
