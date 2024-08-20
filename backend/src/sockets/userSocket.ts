import { Namespace, Socket } from 'socket.io';

let onlineUsers = new Map<string, { userId: string, username: string, profilePicture: string }>();

export const setupUserSockets = (userNamespace: Namespace) => {
  userNamespace.on('connection', async (socket: Socket) => {
    const { userId, username, profilePicture } = socket.handshake.query as any;

    if (userId) {
      // Add user to online users
      onlineUsers.set(userId, { userId, username, profilePicture });

      // Broadcast that a user connected
      userNamespace.emit('user-presence-updated', Array.from(onlineUsers.values()));

      socket.on('disconnect', () => {
        // Remove user from online users
        onlineUsers.delete(userId);

        // Broadcast that a user disconnected
        userNamespace.emit('user-disconnected', Array.from(onlineUsers.values()))
      });
    } else {
      console.error('User ID is missing in user socket handshake query');
    }
  });
};
