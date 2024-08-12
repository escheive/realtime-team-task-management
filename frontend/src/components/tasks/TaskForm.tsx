import React, { useState } from 'react';
import axios from 'axios';
import { ITask } from '~types/taskTypes';
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
} from '@chakra-ui/react';

const TaskForm: React.FC<{ onTaskCreated: (task: ITask) => void }> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Omit<ITask, '_id' | 'createdBy'> = {
      title,
      description,
      status,
      createdBy: 'user-id-placeholder', // Replace with actual user ID logic
      assignedTo,
      dueDate: new Date(dueDate),
    };

    try {
      const response = await axios.post('/api/tasks', newTask);
      onTaskCreated(response.data);
      setTitle('');
      setDescription('');
      setStatus('To Do');
      setAssignedTo('');
      setDueDate('');
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
    <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Status</FormLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Select status"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Assigned To</FormLabel>
            <Input
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              placeholder="Enter person assigned to"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Due Date</FormLabel>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </FormControl>

          <Button type="submit" colorScheme="teal">
            Create Task
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default TaskForm;
