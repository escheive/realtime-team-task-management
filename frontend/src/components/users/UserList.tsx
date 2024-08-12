import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Box, Text } from '@chakra-ui/react';

const socket = io('http://localhost:5000/users');

const UserList: React.FC = () => {
  const [users, setUsers] = useState<{ username: string; isOnline: boolean }[]>([]);

  useEffect(() => {
    socket.on('userConnected', (user) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    });

    socket.on('userDisconnected', (user) => {
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.username === user.username ? { ...u, isOnline: false } : u))
      );
    });

    return () => {
      socket.off('userConnected');
      socket.off('userDisconnected');
    };
  }, []);

  return (
    <Box>
      {users.map((user) => (
        <Text key={user.username} color={user.isOnline ? 'green.500' : 'red.500'}>
          {user.username} {user.isOnline ? '(Online)' : '(Offline)'}
        </Text>
      ))}
    </Box>
  );
};

export default UserList;
