import express from "express";
import { getContactUsInfo } from "@/api/contact-us/controller";

const ContactUsRouter = express.Router();

ContactUsRouter.get("/", getContactUsInfo);

export default ContactUsRouter;
