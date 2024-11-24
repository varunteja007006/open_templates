import { Socket } from "socket.io";

export default function socketLogger(socket: Socket, next: any) {
  console.log("\n\n------------------");
  console.log("Request ID:", socket.id);
  console.log("Request URL:", socket.handshake.url);
  console.log("Request URL:", socket.handshake.query);
  console.log("Request Headers:", socket.handshake.headers);
  console.log("------------------");
  next();
}
