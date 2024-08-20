import React, { createContext, useState, useEffect, useContext } from 'react';
import { useUserPresence } from '~hooks/useUserPresence';
import { useUser } from '~users/context';

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
  const socket = useUserPresence();

  useEffect(() => {
    // Ensure userId is available before proceeding
    if (!userId) return;

    // Add user to online users
    socket.on('user-presence-updated', (users: any) => {
      setOnlineUsers(users);
    });

    // Remove user from online users
    socket.on('user-disconnected', (userId: string) => {
      setOnlineUsers(prev => prev.filter(user => user._id !== userId));
    });

    // Cleanup sockets
    return () => {
      socket.off('user-presence-updated');
      socket.off('user-disconnected');
    };
  }, [userId]);

  return (
    <PresenceContext.Provider value={{ onlineUsers }}>
      {children}
    </PresenceContext.Provider>
  );
};

export const usePresence = (): PresenceContextType => {
  const context = useContext(PresenceContext);
  if (!context) {
    throw new Error('usePresence must be used within a PresenceProvider');
  }
  return context;
};
