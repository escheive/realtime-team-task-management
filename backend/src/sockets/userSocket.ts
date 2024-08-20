import { Namespace, Socket } from 'socket.io';
import { updateUserPresence, trackUserActivity, removeUserPresence } from '../controllers/userController';

let onlineUsers: any = {};

export const setupUserSockets = (userNamespace: Namespace) => {
  userNamespace.on('connection', async (socket: Socket) => {

    // When a user logs in or opens the app, update presence
    socket.on('user-connected', async (user: any) => {
      console.log(`A user connected ${user.username}`)
      onlineUsers[user._id] = user;
      await updateUserPresence(user, socket.id);
      socket.emit('user-presence-updated', Object.values(onlineUsers));
    });

    // Track activity like viewing a task
    socket.on('viewing-task', async (user: any, taskId: string) => {
      await trackUserActivity(user, taskId);
      socket.emit('task-activity-updated', user, taskId);
    });

    // When a user disconnects, remove their presence
    socket.on('user-disconnected', async () => {
      await removeUserPresence(socket.id);
      socket.emit('user-disconnected', socket.id);
      console.log(`User disconnected: ${socket.id}`);
    })

    socket.on('disconnect', () => {
      delete onlineUsers[socket.id];
      console.log('A user disconnected');
    });
  });
};
