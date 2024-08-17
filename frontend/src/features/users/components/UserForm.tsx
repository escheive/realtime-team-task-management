import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Select,
  useToast,
} from '@chakra-ui/react';
import { createUser } from '~users/api';
import { useNavigate } from 'react-router-dom';
import { useUser } from '~users/context';
import { IUser } from '../types';

export const UserForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [roles, setRoles] = useState<IUser['roles']>(['User']);
  const [status, setStatus] = useState<IUser['status']>('Active');
  const [address, setAddress] = useState<IUser['address']>({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  });
  const { user } = useUser();
  const toast = useToast();
  const navigate = useNavigate();

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const newUser: Omit<IUser, '_id'> = {
      email,
      password,
      username,
      fullName,
      phoneNumber,
      status,
      address,
      roles,
      activityLog: [
        {
          action: `User created by ${user?.username}`,
          timestamp: new Date()
        }
      ]
    };

    try {
      const createdUser = await createUser(newUser);

      navigate(`/users/${createdUser._id}`);

      // Reset form fields
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUsername('');
      setFullName('');
      setProfilePicture(null);
      setDateOfBirth(null);
      setPhoneNumber('');
      setRoles(['User']);
      setStatus('Active');
      setAddress({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
      });

      toast({
        title: 'User Created',
        description: 'The user has been created successfully.',
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        title: 'Error',
        description: 'There was an error creating the user.',
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md" bg="white">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>

          <FormControl id="fullName" isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </FormControl>

          <FormControl id="phoneNumber">
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </FormControl>

          <FormControl id="status">
            <FormLabel>Status</FormLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value as IUser['status'])}
            >
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
              <option value="deactivated">Deactivated</option>
            </Select>
          </FormControl>

          <FormControl id="street">
            <FormLabel>Street</FormLabel>
            <Input
              name="street"
              value={address.street}
              onChange={handleAddressChange}
            />
          </FormControl>

          <FormControl id="city">
            <FormLabel>City</FormLabel>
            <Input
              name="city"
              value={address.city}
              onChange={handleAddressChange}
            />
          </FormControl>

          <FormControl id="state">
            <FormLabel>State</FormLabel>
            <Input
              name="state"
              value={address.state}
              onChange={handleAddressChange}
            />
          </FormControl>

          <FormControl id="postalCode">
            <FormLabel>Postal Code</FormLabel>
            <Input
              name="postalCode"
              value={address.postalCode}
              onChange={handleAddressChange}
            />
          </FormControl>

          <FormControl id="country">
            <FormLabel>Country</FormLabel>
            <Input
              name="country"
              value={address.country}
              onChange={handleAddressChange}
            />
          </FormControl>

          <FormControl id="roles">
            <FormLabel>Roles</FormLabel>
            <Select
              multiple
              value={roles}
              onChange={(e) => setRoles(Array.from(e.target.selectedOptions, option => option.value))}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
            </Select>
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <FormControl id="confirmPassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>

          <Button colorScheme="teal" type="submit">
            Create User
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
