import registerDemoHandler from "@/handlers/demo";
import { io } from "./index";
import { Socket } from "socket.io";

const onConnection = (socket: Socket) => {
  registerDemoHandler(io, socket);
};

export default onConnection;
