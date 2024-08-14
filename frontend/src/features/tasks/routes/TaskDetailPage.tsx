import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Badge,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  List,
  ListItem,
  ListIcon,
  Divider,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import { EditIcon, CheckIcon, AttachmentIcon, CalendarIcon, AddIcon } from '@chakra-ui/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { ITask, TaskStatus, TaskPriority } from '~tasks/types';
import { updateTask } from '~tasks/api';
import { useTaskContext } from '~/features/tasks/context';

export const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks, setTasks } = useTaskContext();
  const [task, setTask] = useState<ITask | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newAttachmentUrl, setNewAttachmentUrl] = useState('');
  const [newAttachmentName, setNewAttachmentName] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    const foundTask = tasks.find((task) => task._id === id);
    if (foundTask) {
      setTask(foundTask);
    } else {
      navigate(-1);
    }
  }, [id, tasks]);

  if (!task) return <Text>Task not found</Text>;

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask((prevTask) => (prevTask ? { ...prevTask, [name]: value } : null));
  };

  const handleSaveChanges = async () => {
    if (!task) return;

    try {
      await updateTask(task);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleAddAttachment = () => {
    if (newAttachmentUrl && newAttachmentName) {
      const updatedAttachments = [
        ...task!.attachments!,
        { filename: newAttachmentName, url: newAttachmentUrl },
      ];
      setTask({ ...task!, attachments: updatedAttachments });
      setNewAttachmentUrl('');
      setNewAttachmentName('');
    }
  };

  const handleRemoveAttachment = (index: number) => {
    const updatedAttachments = task!.attachments!.filter((_, i) => i !== index);
    setTask({ ...task!, attachments: updatedAttachments });
  };

  return (
    <Box p={6} boxShadow="lg" bg="white" borderRadius="md">
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          {isEditing ? (
            <Input name="title" value={task.title} onChange={handleInputChange} fontSize="2xl" fontWeight="bold" />
          ) : (
            <Text fontSize="2xl" fontWeight="bold">
              {task.title}
            </Text>
          )}
          {isEditing ? (
            <Textarea name="description" value={task.description} onChange={handleInputChange} fontSize="md" color="gray.500" />
          ) : (
            <Text fontSize="md" color="gray.500">
              {task.description || 'No description provided'}
            </Text>
          )}
        </Box>
        <IconButton
          icon={isEditing ? <CheckIcon /> : <EditIcon />}
          aria-label="Edit task"
          onClick={isEditing ? handleSaveChanges : handleEditToggle}
        />
      </Flex>

      {isEditing ? (
        <>
          <FormControl mb={4}>
            <FormLabel>Status</FormLabel>
            <Select name="status" value={task.status} onChange={handleInputChange}>
              {Object.values(TaskStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Priority</FormLabel>
            <Select name="priority" value={task.priority} onChange={handleInputChange}>
              {Object.values(TaskPriority).map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Due Date</FormLabel>
            <Input
              name="dueDate"
              type="date"
              value={task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Assigned To</FormLabel>
            <Input name="assignedTo" value={task.assignedTo || ''} onChange={handleInputChange} />
          </FormControl>

          <Divider my={6} />

          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Attachments
          </Text>
          <List spacing={3}>
            {task.attachments?.map((attachment, index) => (
              <ListItem key={index}>
                <ListIcon as={AttachmentIcon} color="gray.500" />
                <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                  {attachment.filename}
                </a>
                <IconButton
                  aria-label="Delete Attachment"
                  icon={<DeleteIcon />}
                  size="sm"
                  ml={2}
                  onClick={() => handleRemoveAttachment(index)}
                />
              </ListItem>
            ))}
          </List>

          <Button leftIcon={<AddIcon />} colorScheme="teal" mt={4} onClick={onOpen}>
            Add Attachment
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add New Attachment</ModalHeader>
              <ModalBody>
                <Stack spacing={4}>
                  <FormControl>
                    <FormLabel>Attachment URL</FormLabel>
                    <Input
                      value={newAttachmentUrl}
                      onChange={(e) => setNewAttachmentUrl(e.target.value)}
                      placeholder="Enter URL"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Attachment Name</FormLabel>
                    <Input
                      value={newAttachmentName}
                      onChange={(e) => setNewAttachmentName(e.target.value)}
                      placeholder="Enter filename"
                    />
                  </FormControl>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="teal" ml={3} onClick={handleAddAttachment}>
                  Add
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <>
          <Stack direction="row" align="center" mb={4}>
            <Badge colorScheme="blue">{task.status}</Badge>
            <Badge colorScheme="red">{task.priority}</Badge>
          </Stack>

          <Text mb={4}>
            <strong>Assigned To:</strong> {task.assignedTo || 'Unassigned'}
          </Text>

          <Text mb={4}>
            <strong>Created By:</strong> {task.createdBy}
          </Text>

          {task.completedAt && (
            <Text mb={4} color="green.500">
              <strong>Completed At:</strong> {new Date(task.completedAt).toLocaleDateString()}
            </Text>
          )}

          {task.dueDate && (
            <Text mb={4}>
              <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
            </Text>
          )}

          <Divider my={6} />

          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Activity Log
          </Text>
          <List spacing={3} mb={6}>
            {task.activityLog?.map((log, index) => (
              <ListItem key={index}>
                <ListIcon as={CalendarIcon} color="gray.500" />
                {log.user} {log.action} on {new Date(log.timestamp).toLocaleString()}
                {log.comment && <Text ml={8}>{log.comment}</Text>}
              </ListItem>
            ))}
          </List>

          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Attachments
          </Text>
          <List spacing={3}>
            {task.attachments?.map((attachment, index) => (
              <ListItem key={index}>
                <ListIcon as={AttachmentIcon} color="gray.500" />
                <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                  {attachment.filename}
                </a>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
};