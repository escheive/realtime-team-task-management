import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useUser } from '~/features/users/context';

export const useUserPresence = (userId: string | undefined) => {
  // Initialize the socket connection
  const socket = io('http://localhost:5000/users', {
    transports: ['websocket'],
  });

  const { user } = useUser();

  useEffect(() => {
    // Ensure user is valid
    if (!user) return;

    // Emit presence when user online
    socket.emit('user-connected', user._id);

    return () => {
      // Emit presence when user offline
      socket.emit('user-disconnected', user._id);
      socket.off();
    };
  }, [userId]);

  return socket;
}