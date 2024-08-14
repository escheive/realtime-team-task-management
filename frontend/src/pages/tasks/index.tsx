import React, { useEffect, useState } from 'react';
import axios from '~utils/axiosConfig';
import { Box, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import { useWebSockets } from '~context/WebSocketContext';

export const TasksPage: React.FC = () => {
  const { tasks, setTasks } = useWebSockets();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (error) {
        setError('Error fetching tasks.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box p={4}>
      <Heading mb={4}>All Tasks</Heading>
      <Stack spacing={4}>
        {tasks.length === 0 ? (
          <Text>No tasks available.</Text>
        ) : (
          tasks.map((task) => (
            <Box
              key={task._id}
              p={4}
              borderWidth={1}
              borderRadius="md"
              boxShadow="md"
              bg="white"
            >
              <VStack align="start">
                <Heading size="md">{task.title}</Heading>
                <Text>{task.description}</Text>
                <Text>Status: {task.status}</Text>
                <Text>Priority: {task.priority}</Text>
                <Text>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</Text>
                {task.assignedTo && <Text>Assigned To: {task.assignedTo}</Text>}
              </VStack>
            </Box>
          ))
        )}
      </Stack>
    </Box>
  );
};
