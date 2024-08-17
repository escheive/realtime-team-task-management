import React from 'react';
import { Box, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { IUser } from '~users/types';

interface UserDetailsFormProps {
  user: IUser;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isDisabled: boolean;
}

export const DetailsForm: React.FC<UserDetailsFormProps> = ({ user, onInputChange, isDisabled }) => {
  return (
    <Box mb={4}>
      <FormControl mb={4}>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          id="username"
          name="username"
          value={user.username}
          onChange={onInputChange}
          isDisabled={isDisabled}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          value={user.phoneNumber || ''}
          onChange={onInputChange}
          isDisabled={isDisabled}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel htmlFor="address">Address</FormLabel>
        <Textarea
          id="address"
          name="address"
          value={user.address ? `${user.address.street || ''}, ${user.address.city || ''}, ${user.address.state || ''}, ${user.address.postalCode || ''}, ${user.address.country || ''}` : ''}
          onChange={onInputChange}
          isDisabled={isDisabled}
        />
      </FormControl>
    </Box>
  );
};
