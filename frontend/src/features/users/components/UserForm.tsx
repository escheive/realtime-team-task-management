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
import { useNavigate } from 'react-router-dom';
import { useUser } from '~users/context';
import { IUser } from '../types';
import axios from '~utils/axiosConfig';

// Props to configure form behavior
interface UserFormProps {
  mode: 'register' | 'create'; // Determines the form mode
  onSubmit: (user: Omit<IUser, '_id'>) => Promise<void>;
}

export const UserForm: React.FC<UserFormProps> = ({ mode, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState<IUser['role']>('User');
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

  const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateOfBirth(e.target.value ? new Date(e.target.value) : null);
  };

  const handleProfilePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === 'register' && password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    let profilePictureUrl = '';
    if (profilePicture) {
      const formData = new FormData();
      formData.append('file', profilePicture);

      try {
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        profilePictureUrl = response.data.fileUrl;
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error uploading profile picture: ${error.message}`);
          toast({
            title: 'Error',
            description: `Profile picture upload failed: ${error.message}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        } else {
          console.error(`Unknown error while uploading profile picture: ${error}`);
          toast({
            title: 'Error',
            description: `Profile picture upload failed`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      }
    }

    const newUser: Omit<IUser, '_id'> = {
      email,
      password,
      username,
      fullName,
      phoneNumber,
      status,
      address,
      role,
      dateOfBirth: dateOfBirth || undefined,
      profilePicture: profilePictureUrl,
      activityLog: mode === 'create' ? [
        {
          action: `User created by ${user?.username}`,
          timestamp: new Date(),
        },
      ] : [
        {
          action: `User registered account`,
          timestamp: new Date(),
        }
      ],
    };

    try {
      await onSubmit(newUser);

      if (mode === 'create') {
        navigate(`/users`);
      } else {
        navigate('/'); // Navigate to dashboard after registration
      }

      toast({
        title: mode === 'create' ? 'User Created' : 'Registration Successful',
        description: mode === 'create'
          ? 'The user has been created successfully.'
          : 'Your account has been created successfully.',
        status: 'success',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });

      // Reset form fields
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUsername('');
      setFullName('');
      setProfilePicture(null);
      setDateOfBirth(null);
      setPhoneNumber('');
      setRole('User');
      setStatus('Active');
      setAddress({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'Error',
        description: `There was an error during ${
          mode === 'create' ? 'user creation' : 'registration'
        }.`,
        status: 'error',
        position: 'top',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius='md' boxShadow='md' bg='white'>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          {mode === 'register' && (
            <>
              <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>

              <FormControl id='confirmPassword' isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type='password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormControl>
            </>
          )}

          <FormControl id='username' isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>

          <FormControl id='fullName' isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              type='text'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </FormControl>

          <FormControl id='dateOfBirth'>
            <FormLabel>Date of Birth</FormLabel>
            <Input
              type='date'
              value={dateOfBirth ? dateOfBirth.toISOString().split('T')[0] : ''}
              onChange={handleDateOfBirthChange}
            />
          </FormControl>

          <FormControl id='profilePicture'>
            <FormLabel>Profile Picture</FormLabel>
            <Input
              type='file'
              accept='image/*'
              onChange={handleProfilePictureChange}
            />
          </FormControl>

          <FormControl id='phoneNumber'>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type='text'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </FormControl>

          {mode === 'create' && (
            <>
              <FormControl id='status'>
                <FormLabel>Status</FormLabel>
                <Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as IUser['status'])}
                >
                  <option value='Active'>Active</option>
                  <option value='Suspended'>Suspended</option>
                  <option value='Deactivated'>Deactivated</option>
                </Select>
              </FormControl>

              <FormControl id='roles' isRequired>
                <FormLabel>Roles</FormLabel>
                <Select
                  multiple
                  value={role}
                  onChange={(e) => setRole(e.target.value as IUser['role'])}
                >
                  <option value='Admin'>Admin</option>
                  <option value='User'>User</option>
                  <option value='Moderator'>Moderator</option>
                </Select>
              </FormControl>
            </>
          )}

          <FormControl id='street' isRequired>
            <FormLabel>Street</FormLabel>
            <Input
              name='street'
              value={address.street}
              onChange={handleAddressChange}
            />
          </FormControl>

          <FormControl id='city' isRequired>
            <FormLabel>City</FormLabel>
            <Input
              name='city'
              value={address.city}
              onChange={handleAddressChange}
            />
          </FormControl>

          <FormControl id='state' isRequired>
            <FormLabel>State</FormLabel>
            <Input
              name='state'
              value={address.state}
              onChange={handleAddressChange}
            />
          </FormControl>

          <FormControl id='postalCode' isRequired>
            <FormLabel>Postal Code</FormLabel>
            <Input
              name='postalCode'
              value={address.postalCode}
              onChange={handleAddressChange}
            />
          </FormControl>

          <FormControl id='country' isRequired>
            <FormLabel>Country</FormLabel>
            <Input
              name='country'
              value={address.country}
              onChange={handleAddressChange}
            />
          </FormControl>

          <Button colorScheme='teal' type='submit'>
            {mode === 'register' ? 'Register' : 'Create User'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
