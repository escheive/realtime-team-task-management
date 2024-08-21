import { useState } from 'react';
import {
  Box,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Avatar,
  HStack,
} from '@chakra-ui/react';
import { useUser } from '~users/context';

export const ProfilePage = () => {
  const { user } = useUser();
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    // Implement save logic
    setEditing(false);
  };

  return (
    <Box maxW='3xl' mx='auto' py={8}>
      <Heading as='h1' mb={6}>
        Profile
      </Heading>

      <Box mb={8}>
        <Heading as='h2' size='lg' mb={4}>
          Profile Information
        </Heading>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Profile Picture</FormLabel>
            <HStack spacing={4}>
              <Avatar name={user?.username} src={user?.profilePicture} size='lg' />
              <Button variant='outline'>Change Picture</Button>
            </HStack>
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder='Your Name'
              defaultValue={user?.username}
              isReadOnly={!editing}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              placeholder='Your Email'
              defaultValue={user?.email}
              isReadOnly={!editing}
            />
          </FormControl>
        </Stack>
      </Box>

      {editing ? (
        <Button colorScheme='teal' onClick={handleSave}>
          Save Changes
        </Button>
      ) : (
        <Button variant='outline' onClick={() => setEditing(true)}>
          Edit Profile
        </Button>
      )}
    </Box>
  );
};
