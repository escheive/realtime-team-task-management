import { Namespace, Server as SocketIOServer } from 'socket.io';
import { setupTaskSockets } from './taskSocket';
import { setupUserSockets } from './userSocket';

// Initialize different websocket namespaces
export let taskNamespace: Namespace;
export let userNamespace: Namespace;

// Function to setup all sockets
export const setupSockets = (io: SocketIOServer) => {
  // Create namespaces for web sockets
  taskNamespace = io.of('/tasks');
  userNamespace = io.of('/users');

  // Call setup functions for each namespace
  setupTaskSockets(taskNamespace);
  setupUserSockets(userNamespace);
};