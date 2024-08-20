import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useUser } from '~/features/users/context';

let socket: Socket | null = null;

export const useUserPresence = () => {
  const { user } = useUser();

  useEffect(() => {
    // Ensure user is valid
    if (!user) return;


    if (!socket) {
      // Initialize the socket connection
      const socket = io('http://localhost:5000/users', {
        transports: ['websocket'],
        query: {
          userId: user?._id,
          username: user?.username,
          profilePicture: user?.profilePicture
        }
      });

      socket.on('connect', () => {
        console.log(`Socket connected: ${socket?.id}`);
      });

      socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket?.id}`);
      });
    }

    return () => {
      if (socket) {
        // Emit presence when user offline
        socket.emit('user-disconnected', user._id);
        socket.disconnect();
        socket = null;
      }
    };
  }, [user]);

  return null;
}