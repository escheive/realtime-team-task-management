import { usePresence } from '~context/PresenceContext';
import { Avatar, Badge } from '@chakra-ui/react';

export const UserPresenceIndicator = ({ userId }: { userId: string }) => {
  const { onlineUsers } = usePresence();

  const isOnline = onlineUsers.includes(userId);

  return (
    <Avatar name="User Name">
      {isOnline && <Badge colorScheme="green" />}
    </Avatar>
  );
};
