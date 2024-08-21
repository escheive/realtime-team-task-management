import React from 'react';
import {
  Box, 
  FormControl, 
  FormLabel, 
  Input,
  Select
} from '@chakra-ui/react';
import { IUser } from '~users/types';
import { formatDate } from '~utils/helpers';

interface UserDetailsFormProps {
  user: IUser;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement| HTMLSelectElement>) => void;
  isDisabled: boolean;
}

export const DetailsForm: React.FC<UserDetailsFormProps> = ({ user, onInputChange, isDisabled }) => {

  return (
    <Box mb={4}>
      <FormControl mb={4}>
        <FormLabel htmlFor='username'>Username</FormLabel>
        <Input
          id='username'
          name='username'
          value={user?.username || ''}
          onChange={onInputChange}
          isDisabled={isDisabled}
        />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel htmlFor='phoneNumber'>Phone Number</FormLabel>
        <Input
          id='phoneNumber'
          name='phoneNumber'
          value={user?.phoneNumber || ''}
          onChange={onInputChange}
          isDisabled={isDisabled}
        />
      </FormControl>
      
      <FormControl id='dateOfBirth'>
        <FormLabel>Date of Birth</FormLabel>
        <Input
          type='date'
          value={user.dateOfBirth ? formatDate(user.dateOfBirth) : undefined}
          onChange={onInputChange}
        />
      </FormControl>

      <FormControl id='profilePicture'>
        <FormLabel>Profile Picture</FormLabel>
        <Input
          type='file'
          name='profilePicture'
          accept='image/*'
          onChange={onInputChange}
        />
      </FormControl>

      <FormControl id='status'>
        <FormLabel>Status</FormLabel>
        <Select
          name='status'
          value={user?.status || ''}
          onChange={onInputChange}
        >
          <option value='Active'>Active</option>
          <option value='Suspended'>Suspended</option>
          <option value='Deactivated'>Deactivated</option>
        </Select>
      </FormControl>

      <FormControl id='street' isRequired>
        <FormLabel>Street</FormLabel>
        <Input
          name='street'
          value={user.address?.street || ''}
          onChange={onInputChange}
        />
      </FormControl>

      <FormControl id='city' isRequired>
        <FormLabel>City</FormLabel>
        <Input
          name='city'
          value={user.address?.city || ''}
          onChange={onInputChange}
        />
      </FormControl>

      <FormControl id='state' isRequired>
        <FormLabel>State</FormLabel>
        <Input
          name='state'
          value={user.address?.state || ''}
          onChange={onInputChange}
        />
      </FormControl>

      <FormControl id='postalCode' isRequired>
        <FormLabel>Postal Code</FormLabel>
        <Input
          name='postalCode'
          value={user.address?.postalCode || ''}
          onChange={onInputChange}
        />
      </FormControl>

      <FormControl id='country' isRequired>
        <FormLabel>Country</FormLabel>
        <Input
          name='country'
          value={user.address?.country || ''}
          onChange={onInputChange}
        />
      </FormControl>

      <FormControl id='roles' isRequired>
        <FormLabel>Roles</FormLabel>
        <Select
          name='role'
          value={user?.role || ''}
          onChange={onInputChange}
        >
          <option value='Admin'>Admin</option>
          <option value='User'>User</option>
          <option value='Moderator'>Moderator</option>
        </Select>
      </FormControl>
    </Box>
  );
};
