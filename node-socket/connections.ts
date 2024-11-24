import registerOrderHandler from "@/handlers/order-handler";
import { io } from "./index";
import { Socket } from "socket.io";

const onConnection = (socket: Socket) => {
  registerOrderHandler(io, socket);
};

export default onConnection;
