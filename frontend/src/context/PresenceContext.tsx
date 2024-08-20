import React, { createContext, useState, useEffect, useContext } from 'react';
import { useUserPresence } from '~hooks/useUserPresence';
import { useUser } from '~users/context';
import { io } from 'socket.io-client';

interface PresenceContextType {
  onlineUsers: any[];
}

const PresenceContext = createContext<PresenceContextType | undefined>(undefined);

export const PresenceProvider = ({ children }: { children: React.ReactNode }) => {
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);

  // Access user from context and extract userId
  const { user } = useUser();
  const userId = user?._id;

  // Pass userId to presence hook for tracking online status
  useUserPresence();

  useEffect(() => {
    // Ensure userId is available before proceeding
    if (!userId) return;

    const socket = io('http://localhost:5000/users', {
      transports: ['websocket'],
      query: {
        userId,
        username: user?.username,
        profilePicture: user?.profilePicture
      }
    });

    // Add user to online users
    socket.on('user-presence-updated', (users: any) => {
      setOnlineUsers(users);
    });

    // Remove user from online users
    socket.on('user-disconnected', (users: any) => {
      setOnlineUsers(users);
    });

    // Cleanup sockets
    return () => {
      socket.off('user-presence-updated');
      socket.off('user-disconnected');
      socket.disconnect();
    };
  }, [userId]);

  return (
    <PresenceContext.Provider value={{ onlineUsers }}>
      {children}
    </PresenceContext.Provider>
  );
};

export const usePresence = () => {
  const context = useContext(PresenceContext);
  if (!context) {
    throw new Error('usePresence must be used within a PresenceProvider');
  }
  return context;
};
