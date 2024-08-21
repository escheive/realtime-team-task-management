import { useState } from 'react';
import {
  Box,
  Heading,
  Divider,
  Stack,
  FormControl,
  FormLabel,
  Switch,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

export const SettingsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [confirmationText, setConfirmationText] = useState('');
  const toast = useToast();

  const handleDelete = () => {
    if (confirmationText !== 'delete') {
      toast({
        title: 'Error',
        description: 'You must type "delete" to confirm.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // TODO: Actual Delete logic

    toast({
      title: 'Account Deleted',
      description: 'Your account has been successfully deleted.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    onClose();
  };

  return (
    <Box maxW="3xl" mx="auto" py={8}>
      <Heading as="h1" mb={6}>
        Settings
      </Heading>

      {/* Notification Preferences Section */}
      <Box mb={8}>
        <Heading as="h2" size="lg" mb={4}>
          Notification Preferences
        </Heading>
        <Stack spacing={4}>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Email Notifications</FormLabel>
            <Switch id="email-notifications" defaultChecked />
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Push Notifications</FormLabel>
            <Switch id="push-notifications" />
          </FormControl>
        </Stack>
      </Box>
      <Divider />

      {/* Appearance Section */}
      <Box mt={8} mb={8}>
        <Heading as="h2" size="lg" mb={4}>
          Appearance
        </Heading>
        <Stack spacing={4}>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Dark Mode</FormLabel>
            <Switch id="dark-mode" />
          </FormControl>
        </Stack>
      </Box>

      {/* Danger Zone Section */}
      <Box mt={8}>
        <Heading as="h2" size="lg" color="red.500" mb={4}>
          Danger Zone
        </Heading>
        <Stack spacing={4}>
          <Button colorScheme="red" onClick={onOpen}>Delete Account</Button>
          <Button variant="outline" colorScheme="red">
            Export Data
          </Button>
        </Stack>
      </Box>

      {/* Delete Account Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Account Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>
              Are you sure you want to delete your account? This action cannot be undone. If you're not sure, you might consider deactivating your account instead.
            </Text>
            <FormControl>
              <FormLabel>Type "delete" to confirm:</FormLabel>
              <Input
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="outline" ml={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
