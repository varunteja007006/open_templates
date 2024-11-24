import { DefaultEventsMap, Server, Socket } from "socket.io";

function registerOrderHandler(
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socket: Socket
) {
  const createOrder = (payload) => {
    // ...
  };
  const readOrder = (orderId, callback) => {
    // ...
  };

  socket.on("order:create", createOrder);
  socket.on("order:read", readOrder);
}

export default registerOrderHandler;
