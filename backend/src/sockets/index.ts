import { Namespace, Server as SocketIOServer } from "socket.io";
import { setupTaskSockets } from "./taskSocket";
import { setupUserSockets } from "./userSocket";

export let taskNamespace: Namespace

export const setupSockets = (io: SocketIOServer) => {
  taskNamespace = io.of('/tasks');
  // const userNamespace = io.of('/users');

  setupTaskSockets(taskNamespace);
  // setupUserSockets(userNamespace);
};