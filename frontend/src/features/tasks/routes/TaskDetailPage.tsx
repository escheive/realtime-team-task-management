// src/features/tasks/pages/TaskDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { Box, Text, Input, Button, FormControl, FormLabel, Stack } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { ITask } from '~tasks/types';
import { updateTask } from '~tasks/api';
import { useTaskContext } from '~/features/tasks/context';

export const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks, setTasks } = useTaskContext();
  const [task, setTask] = useState<ITask | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the task by ID from the context
    const taskFromContext = tasks.find((task) => task._id === id);
    if (taskFromContext) {
      setTask(taskFromContext);
    } else {
      console.error('Task not found');
      navigate(-1); // Navigate to previous page
    }
  }, [id, tasks, navigate]);

  const handleUpdate = async () => {
    if (task) {
      try {
        await updateTask(task);
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === task._id ? task : task))
        );
        navigate(-1); // Navigate to previous page
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  if (!task) return <Text>Loading...</Text>;

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Edit Task</Text>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            value={task.description || ''}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleUpdate}>
          Save
        </Button>
      </Stack>
    </Box>
  );
};
