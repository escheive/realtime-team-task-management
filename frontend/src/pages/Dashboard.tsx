import TaskBoard from '~components/tasks/TaskBoard';
import React, { useEffect, useState } from 'react';
import axios from "~utils/axiosConfig";
import { Box, Grid, Flex, Text } from '@chakra-ui/react';
import TaskForm from '~components/tasks/TaskForm';
import { onTaskCreated, onTaskUpdated, onTaskDeleted, emitTaskCreated, cleanupTaskSockets } from "~services/sockets/index";
import { ITask } from '~types/taskTypes';

export const Dashboard = () => {
  const [taskStatusCounts, setTaskStatusCounts] = useState({
    unassigned: 0,
    incomplete: 0,
    inProgress: 0,
  });
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    onTaskCreated((task: ITask) => {
      setTasks((prevTasks) => [...prevTasks, task]);
    });

    onTaskUpdated((task: ITask) => {
      setTasks((prevTasks) => prevTasks.map((t) => (t._id === task._id ? task : t)));
    });

    onTaskDeleted((taskId: string) => {
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== taskId));
    });

    const fetchTaskStatusCounts = async () => {
      try {
        const response = await axios.get('/api/tasks/status-counts');
        setTaskStatusCounts(response.data);
      } catch (error) {
        console.error('Error fetching incomplete tasks count:', error);
      }
    };

    fetchTaskStatusCounts();

    // Cleanup
    return () => {
      cleanupTaskSockets();
    };
  }, []);

  return (
    <Box p={4}>
      <TaskForm />
      {/* Top Sections */}
      <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={4}>
        {/* Data Breakdown */}
        <Box bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="lg" mb={2}>Data Breakdown</Text>
          <Text>Unassigned: {taskStatusCounts.unassigned}</Text>
          <Text>Incomplete: {taskStatusCounts.incomplete}</Text>
          <Text>In Progress: {taskStatusCounts.inProgress}</Text>
        </Box>

        {/* Current Tasks */}
        <Box bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="lg" mb={2}>Current Tasks</Text>
          {/* tasks content here */}
        </Box>
      </Grid>

      {/* Bottom Sections */}
      <Flex direction={{ base: "column", md: "row" }} mt={4} gap={4}>
        {/* Section 1 */}
        <Box flex="1" bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="lg" mb={2}>Section 1</Text>
          {/* section 1 content here */}
        </Box>

        {/* Section 2 */}
        <Box flex="1" bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="lg" mb={2}>Section 2</Text>
          {/* section 2 content here */}
        </Box>

        {/* Section 3 */}
        <Box flex="1" bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="lg" mb={2}>Section 3</Text>
          {/* section 3 content here */}
        </Box>
      </Flex>
      <TaskBoard />
    </Box>
  );
};
