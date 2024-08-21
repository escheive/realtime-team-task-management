import React, { useEffect, useState } from 'react';
import { Box, Button, useToast } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { IUser } from '~users/types';
import { deleteUser, updateUser } from '~users/api';
import { useUser } from '~users/context';
import { Header, DetailsForm, ActivityLog } from '~users/components';

export const UserDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { paginatedUsers } = useUser();
  const [editedUser, setEditedUser] = useState<IUser | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [newProfileImage, setNewProfileImage] = useState<File | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const foundUser = paginatedUsers.users.find((user) => user._id === id);
    if (foundUser) {
      setEditedUser(foundUser);
      setUser({ ...foundUser });
    } else {
      navigate('/users');
    }
  }, [id, paginatedUsers, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (editedUser) {
      if (type === 'file' && e.target instanceof HTMLInputElement) {
        const { files } = e.target;
        if (!files) return;
        const file = files[0];
        setNewProfileImage(file)
        // setEditedUser({ ...editedUser, profilePicture: URL.createObjectURL(file) });
      } else if (type === 'date') {
        setEditedUser({ ...editedUser, dateOfBirth: value ? new Date(value) : undefined });
      } else if (name in editedUser.address) {
        const updatedAddress = { ...editedUser.address, [name]: value };
        setEditedUser({ ...editedUser, address: updatedAddress });
      } else {
        setEditedUser({ ...editedUser, [name]: value });
      }
    }
      setIsEditing(true);
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);

    if (!user || !editedUser) {
      setIsSaving(false);
      return;
    }

    try {
      await updateUser(editedUser, newProfileImage);
      setUser({ ...editedUser });
      setIsSaving(false);
      setIsEditing(false);
      toast({
        title: 'User updated.',
        description: 'The user details have been successfully updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      toast({
        title: 'Failed to update user.',
        description: 'There was an error updating the user. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleDeleteUser = async () => {
    if (!user) return;

    try {
      await deleteUser(user._id); // Make sure to implement this API method
      toast({
        title: 'User deleted.',
        description: 'The user has been successfully deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/users');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Failed to delete user.',
        description: 'There was an error deleting the user. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6} maxW='800px' mx='auto'>
      {user && editedUser && (
        <Box>
          <Header
            user={editedUser}
            onInputChange={handleInputChange}
            isDisabled={isSaving}
          />

          <DetailsForm 
            user={editedUser}
            onInputChange={handleInputChange}
            isDisabled={isSaving}
          />

          <ActivityLog activityLog={user.activityLog} />

          <Box mt={4}>
            <Button 
              colorScheme='blue' 
              onClick={handleSaveChanges} 
              isDisabled={!isEditing || isSaving}
              mr={2}
            >
              Save Changes
            </Button>
            <Button 
              colorScheme='red' 
              onClick={handleCancel}
              isDisabled={!isEditing || isSaving}
            >
              Cancel
            </Button>
            <Button 
              colorScheme='red' 
              onClick={handleDeleteUser} 
              isDisabled={isSaving}
              mt={2}
            >
              Delete User
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
