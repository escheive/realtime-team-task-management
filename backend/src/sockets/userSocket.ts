import { Namespace, Socket } from 'socket.io';

// let onlineUsers = new Map<string, { userId: string, username: string, profilePicture: string }>();
let onlineUsersData = new Map<string, { userId: string, username: string, profilePicture: string }>();

// Map to track active connections for each user
const userConnections = new Map<string, Set<string>>();

export const setupUserSockets = (userNamespace: Namespace) => {
  userNamespace.on('connection', async (socket: Socket) => {
    const { userId, username, profilePicture } = socket.handshake.query as any;

    if (userId) {
      // Add or update user data
      onlineUsersData.set(userId, { userId, username, profilePicture });

      // Ensure there is a set for this users connections
      if (!userConnections.has(userId)) {
        userConnections.set(userId, new Set());
      }

      // Add this socket ID to user's connection set
      userConnections.get(userId)?.add(socket.id);

      // Broadcast updated user presence
      userNamespace.emit('user-presence-updated', Array.from(onlineUsersData.values()));

      socket.on('disconnect', () => {

        // Remove this socket ID from the user's set
        const sockets = userConnections.get(userId);
        if (sockets) {
          sockets.delete(socket.id);

          // If no more sockets left for this user, remove the user
          if (sockets.size === 0) {
            userConnections.delete(userId);
            onlineUsersData.delete(userId);
          }
        }

        // Broadcast updated user presence
        userNamespace.emit('user-presence-updated', Array.from(onlineUsersData.values()));
      });
    } else {
      console.error('User ID is missing in user socket handshake query');
    }

    // if (userId) {
    //   // Add user to online users
    //   onlineUsers.set(userId, { userId, username, profilePicture });

    //   // Broadcast that a user connected
    //   userNamespace.emit('user-presence-updated', Array.from(onlineUsers.values()));

    //   socket.on('disconnect', () => {
    //     // Remove user from online users
    //     onlineUsers.delete(userId);

    //     // Broadcast that a user disconnected
    //     userNamespace.emit('user-disconnected', Array.from(onlineUsers.values()))
    //   });
    // } else {
    //   console.error('User ID is missing in user socket handshake query');
    // }
  });
};
