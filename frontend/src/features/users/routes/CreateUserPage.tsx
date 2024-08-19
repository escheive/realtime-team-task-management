import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { UserForm } from '~users/components';
import { useNavigate } from 'react-router-dom';
import { createUser } from '~users/api';
import { IUser } from '~users/types';

export const CreateUserPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateUser = async (newUser: Omit<IUser, '_id'>) => {
    try {
      // Make an API call to create a new user within the app
      await createUser(newUser);

      // Successfully created, navigate to the user details page
      navigate(`/users/${newUser.username}`);
    } catch (error) {
      console.error('User creation error:', error);
      // Handle user creation error (e.g., show a toast)
    }
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Create or Edit User</Text>
      <UserForm mode="create" onSubmit={handleCreateUser} />
    </Box>
  );
};
