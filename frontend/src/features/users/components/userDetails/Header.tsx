import React from 'react';
import { Box, Text, Flex, Input, } from '@chakra-ui/react';
import { IUser } from '~users/types';

interface UserHeaderProps {
  user: IUser;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
}

export const Header: React.FC<UserHeaderProps> = ({ user, onInputChange, isDisabled }) => {
  return (
    <Flex direction='column' mb={6}>
    <Text fontSize='2xl' fontWeight='bold'>User Details</Text>
    <Box mt={2}>
      <Input 
        name='fullName' 
        value={user.fullName} 
        onChange={onInputChange} 
        fontSize='xl' 
        fontWeight='bold' 
        isDisabled={isDisabled} 
        placeholder='Full Name'
      />
      <Input 
        name='email' 
        value={user.email} 
        onChange={onInputChange} 
        fontSize='xl' 
        mt={4} 
        isDisabled={isDisabled} 
        placeholder='Email'
      />
    </Box>
  </Flex>
  );
};
