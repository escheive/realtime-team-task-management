import { Namespace, Socket } from 'socket.io';

export const setupTaskSockets = (taskNamespace: Namespace) => {
  taskNamespace.on('connection', (socket: Socket) => {

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};