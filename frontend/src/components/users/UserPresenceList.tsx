import { usePresence } from '~context/PresenceContext';
import { Avatar, Box, HStack } from '@chakra-ui/react';

// List of online users
export const UserPresenceList = () => {
  const { onlineUsers } = usePresence();

  if (!onlineUsers) return;

  return (
    <HStack spacing={4} alignItems="center">
      {onlineUsers.length > 0 && onlineUsers.map((user) => (
        <Avatar key={user.username} name={user.username} src={user.profilePicture} size="sm">
          <Box position="absolute" top="0" right="0">
            <Box h="10px" w="10px" bg="green.500" borderRadius="full" />
          </Box>
        </Avatar>
      ))}
    </HStack>
  );
};
