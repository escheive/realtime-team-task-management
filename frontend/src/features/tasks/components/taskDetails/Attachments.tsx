import React from 'react';
import { Text, List, ListItem, ListIcon, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { AttachmentIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons';

interface AttachmentsProps {
  attachments: Array<{ filename: string, url: string }>;
  newAttachmentUrl: string;
  newAttachmentName: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setNewAttachmentUrl: (url: string) => void;
  setNewAttachmentName: (name: string) => void;
  handleAddAttachment: () => void;
  handleRemoveAttachment: (index: number) => void;
}

export const Attachments: React.FC<AttachmentsProps> = ({
  attachments,
  newAttachmentUrl,
  newAttachmentName,
  isOpen,
  onOpen,
  onClose,
  setNewAttachmentUrl,
  setNewAttachmentName,
  handleAddAttachment,
  handleRemoveAttachment,
}) => (
  <>
    <Text fontSize="lg" fontWeight="bold" mb={4}>Attachments</Text>
    <List spacing={3}>
      {attachments.map((attachment, index) => (
        <ListItem key={index}>
          <ListIcon as={AttachmentIcon} color="gray.500" />
          <a href={attachment.url} target="_blank" rel="noopener noreferrer">{attachment.filename}</a>
          <Button size="sm" ml={2} onClick={() => handleRemoveAttachment(index)} icon={<DeleteIcon />} />
        </ListItem>
      ))}
    </List>

    <Button leftIcon={<AddIcon />} colorScheme="teal" mt={4} onClick={onOpen}>Add Attachment</Button>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Attachment</ModalHeader>
        <ModalBody>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Attachment URL</FormLabel>
              <Input value={newAttachmentUrl} onChange={(e) => setNewAttachmentUrl(e.target.value)} placeholder="Enter URL" />
            </FormControl>
            <FormControl>
              <FormLabel>Attachment Name</FormLabel>
              <Input value={newAttachmentName} onChange={(e) => setNewAttachmentName(e.target.value)} placeholder="Enter filename" />
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button colorScheme="teal" ml={3} onClick={handleAddAttachment}>Add</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
);
