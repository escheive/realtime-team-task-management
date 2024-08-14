import { Server as SocketIOServer } from "socket.io";
import { setupTaskSockets } from "./taskSocket";
import { setupUserSockets } from "./userSocket";

export const setupSockets = (io: SocketIOServer) => {
  const taskNamespace = io.of('/tasks');
  // const userNamespace = io.of('/users');

  setupTaskSockets(taskNamespace);
  // setupUserSockets(userNamespace);
};