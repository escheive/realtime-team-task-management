import { usePresence } from '~context/PresenceContext';
import { Avatar, Box, HStack } from '@chakra-ui/react';

// List of online users
export const UserPresenceList = () => {
  const { onlineUsers } = usePresence();

  return (
    <Box
      top="60px"
      left="0"
      width="100%"
      backgroundColor="white"
      boxShadow="sm"
      padding="8px"
      zIndex="1000" // Ensure component stays on top
    >
      <HStack spacing={3} overflowX="auto">
        {onlineUsers.map(userId => (
          <AvatarWithPresence key={userId} userId={userId} />
        ))}
      </HStack>
    </Box>
  );
};

// User avatar badge components
const AvatarWithPresence = ({ userId }: { userId: string }) => {
  const { onlineUsers } = usePresence();

  const isOnline = onlineUsers.includes(userId);

  return (
    <Box position="relative">
      <Avatar name="User Name" size="sm" />
      {isOnline && (
        <Box
          position="absolute"
          bottom="0"
          right="0"
          width="10px"
          height="10px"
          borderRadius="full"
          backgroundColor="green.400"
          border="2px solid white"
        />
      )}
    </Box>
  );
};
