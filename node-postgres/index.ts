import "dotenv/config";
import express from "express";
import cors from "cors";
import ContactUsRouter from "@/api/contact-us/routes";

const app = express();

app.use(express.json());

app.use(cors());

//Add routes
app.use("/api/contact-us", ContactUsRouter);

app
  .listen(process.env.EXPRESS_PORT ?? 4000, () => {
    console.log("Running on port : ", process.env.EXPRESS_PORT ?? 4000);
  })
  .on("error", (err: Error) => {
    console.log(err);
  });
