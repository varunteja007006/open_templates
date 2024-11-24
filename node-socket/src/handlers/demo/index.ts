import { DefaultEventsMap, Server, Socket } from "socket.io";

function registerDemoHandler(
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socket: Socket
) {
  const readOrder = () => {
    // ...
  };

  socket.on("order:read", readOrder);
}

export default registerDemoHandler;
