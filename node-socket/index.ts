import "dotenv/config";
import express from "express";

import { createServer } from "http";
import { Server } from "socket.io";

import cors from "cors";

import logger from "@/middleware/logger/logger";
import onConnection from "./connections";
import socketLogger from "@/middleware/socket-logger/socket-logger";

const app = express();

app.use(express.json());

app.use(cors());

app.use(logger);

//Add routes
app.use("/api/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
    credentials: true,
  },
});

// middleware
io.use(socketLogger);

io.on("connection", onConnection);

httpServer
  .listen(process.env.EXPRESS_PORT ?? 4000, () => {
    console.log("Running on port : ", process.env.EXPRESS_PORT ?? 4000);
  })
  .on("error", (err: Error) => {
    console.log(err);
  });

// Using app.listen(3000) will not work here, as it creates a new HTTP server.

export { io };
