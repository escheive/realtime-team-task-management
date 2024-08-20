import { Namespace, Socket } from 'socket.io';
import { updateUserPresence, trackUserActivity, removeUserPresence } from '../controllers/userController';

export const setupUserSockets = (userNamespace: Namespace) => {
  userNamespace.on('connection', async (socket: Socket) => {

    // When a user logs in or opens the app, update presence
    socket.on('user-connected', async (userId: string) => {
      console.log(`A user connected ${userId}`)
      await updateUserPresence(userId, socket.id);
      socket.emit('user-presence-updated', userId);
    });

    // Track activity like viewing a task
    socket.on('viewing-task', async (userId: string, taskId: string) => {
      await trackUserActivity(userId, taskId);
      socket.emit('task-activity-updated', userId, taskId);
    });

    // When a user disconnects, remove their presence
    socket.on('user-disconnected', async () => {
      await removeUserPresence(socket.id);
      socket.emit('user-disconnected', socket.id);
      console.log(`User disconnected: ${socket.id}`);
    })

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};
