import React, { useState } from 'react';
import axios from 'axios';
import { ITask, TaskStatus, TaskPriority } from '~types/taskTypes';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Stack,
  useToast,
  Tag,
  TagCloseButton,
  TagLabel,
  IconButton,
} from '@chakra-ui/react';
import { onTaskCreated } from '~utils/taskUtils';
import { useWebSockets } from '~context/WebSocketContext';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(TaskStatus.UNASSIGNED);
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState(TaskPriority.LOW);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [attachments, setAttachments] = useState<{ filename: string; url: string }[]>([]);
  const [reminderDate, setReminderDate] = useState('');
  const [reminderMessage, setReminderMessage] = useState('');
  const toast = useToast();
  const { setTasks } = useWebSockets();

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddAttachment = () => {
    const filename = prompt('Enter filename:');
    const url = prompt('Enter URL:');
    if (filename && url) {
      setAttachments([...attachments, { filename, url }]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Omit<ITask, '_id'> = {
      title,
      description,
      status,
      createdBy: 'user-id-placeholder', // Replace with actual user ID logic
      assignedTo,
      dueDate: new Date(dueDate),
      priority,
      tags,
      reminder: reminderDate ? { date: new Date(reminderDate), message: reminderMessage } : undefined,
      attachments,
    };

    try {
      // Send task to server and get response back with _id
      // const response = await axios.post('/api/tasks', newTask);
      // const createdTask = response.data;

      // Emit the task to socket
      // emitTaskCreated(createdTask);

      onTaskCreated(newTask, setTasks)

      // Reset form fields
      setTitle('');
      setDescription('');
      setStatus(TaskStatus.UNASSIGNED);
      setAssignedTo('');
      setDueDate('');
      setPriority(TaskPriority.LOW);
      setTags([]);
      setAttachments([]);
      setReminderDate('');
      setReminderMessage('');

      toast({
        title: 'Task Created',
        description: 'Your task has been created successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error creating task:', error);
      toast({
        title: 'Error',
        description: 'There was an error creating the task.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md" bg="white">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>

          <FormControl id="status">
            <FormLabel>Status</FormLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
            >
              {Object.values(TaskStatus).map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="priority">
            <FormLabel>Priority</FormLabel>
            <Select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
            >
              {Object.values(TaskPriority).map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="assignedTo">
            <FormLabel>Assigned To</FormLabel>
            <Input
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />
          </FormControl>

          <FormControl id="dueDate">
            <FormLabel>Due Date</FormLabel>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </FormControl>

          <FormControl id="tags">
            <FormLabel>Tags</FormLabel>
            <Stack direction="row" spacing={2}>
              <Input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add a tag"
              />
              <Button onClick={handleAddTag}>Add Tag</Button>
            </Stack>
            <Stack direction="row" spacing={2} mt={2}>
              {tags.map(tag => (
                <Tag key={tag} size="md" borderRadius="full">
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                </Tag>
              ))}
            </Stack>
          </FormControl>

          <FormControl id="attachments">
            <FormLabel>Attachments</FormLabel>
            <Button onClick={handleAddAttachment}>Add Attachment</Button>
            <Stack mt={2}>
              {attachments.map((attachment, index) => (
                <Box key={index}>
                  {attachment.filename} - <a href={attachment.url}>{attachment.url}</a>
                </Box>
              ))}
            </Stack>
          </FormControl>

          <FormControl id="reminder">
            <FormLabel>Reminder</FormLabel>
            <Input
              type="datetime-local"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
            />
            <Input
              mt={2}
              type="text"
              value={reminderMessage}
              onChange={(e) => setReminderMessage(e.target.value)}
              placeholder="Reminder message"
            />
          </FormControl>

          <Button colorScheme="teal" type="submit">
            Create Task
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default TaskForm;
