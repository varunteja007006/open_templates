import express from "express";
import { getContactUsInfo, createContactUs } from "@/api/contact-us/controller";

const ContactUsRouter = express.Router();

ContactUsRouter.get("/", getContactUsInfo);

ContactUsRouter.post("/", createContactUs);

export default ContactUsRouter;
