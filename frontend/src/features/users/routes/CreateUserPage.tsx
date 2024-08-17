import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { UserForm } from '~users/components';

export const CreateUserPage: React.FC = () => {
  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Create or Edit User</Text>
      <UserForm />
    </Box>
  );
};
