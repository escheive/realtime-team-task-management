import React, { useEffect } from 'react';
import { Box, Text, Stack, Badge, Flex, Tooltip, IconButton } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import axios from '~utils/axiosConfig';
import { TaskStatus } from '~types/taskTypes';
import { updateTask, deleteTask } from '~tasks/api';
import { useWebSockets } from '~context/WebSocketContext';

export const TaskListPage: React.FC = () => {
  const { tasks, setTasks } = useWebSockets();

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.UNASSIGNED:
        return 'gray';
      case TaskStatus.INCOMPLETE:
        return 'yellow';
      case TaskStatus.IN_PROGRESS:
        return 'blue';
      case TaskStatus.CANCELLED:
        return 'red';
      case TaskStatus.COMPLETE:
        return 'green';
      default:
        return 'gray';
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>
        Task List
      </Text>
      <Stack spacing={4}>
        {tasks.map((task) => (
          <Box
            key={task._id}
            p={4}
            borderWidth={1}
            borderRadius="md"
            boxShadow="md"
            bg="white"
          >
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontSize="lg" fontWeight="bold">
                  {task.title}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {task.description || 'No description provided'}
                </Text>
                <Badge
                  mt={2}
                  colorScheme={getStatusColor(task.status)}
                  fontSize="0.8em"
                >
                  {task.status}
                </Badge>
              </Box>
              <Flex>
                <Tooltip label="Edit Task">
                  <IconButton
                    aria-label="Edit Task"
                    icon={<EditIcon />}
                    onClick={() => updateTask(task)}
                    mr={2}
                  />
                </Tooltip>
                <Tooltip label="Delete Task">
                  <IconButton
                    aria-label="Delete Task"
                    icon={<DeleteIcon />}
                    onClick={() => deleteTask(task._id)}
                  />
                </Tooltip>
              </Flex>
            </Flex>
            {task.dueDate && (
              <Text fontSize="sm" mt={2} color="gray.600">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </Text>
            )}
            {task.tags && (
              <Flex mt={2}>
                {task.tags.map((tag) => (
                  <Badge key={tag} colorScheme="purple" mr={2}>
                    {tag}
                  </Badge>
                ))}
              </Flex>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};