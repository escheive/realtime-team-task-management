import React, { useEffect, useState } from 'react';
import axios from "~utils/axiosConfig";
import { Link } from 'react-router-dom';
import { Box, Grid, Flex, Text } from '@chakra-ui/react';
import TaskForm from '~components/tasks/TaskForm';
import { onTaskCreated, onTaskUpdated, onTaskDeleted, emitTaskCreated, cleanupTaskSockets } from "~services/sockets/index";
import { ITask } from '~types/taskTypes';
import { useWebSockets } from '~context/WebSocketContext';

export const Dashboard = () => {
  const [taskStatusCounts, setTaskStatusCounts] = useState({
    unassigned: 0,
    incomplete: 0,
    inProgress: 0,
  });
  const { tasks } = useWebSockets();

  useEffect(() => {

    const fetchTaskStatusCounts = async () => {
      try {
        const response = await axios.get('/api/tasks/status-counts');
        setTaskStatusCounts(response.data);
      } catch (error) {
        console.error('Error fetching incomplete tasks count:', error);
      }
    };

    fetchTaskStatusCounts();

  }, []);

  return (
    <Box p={4}>
      <TaskForm />
      {/* Top Sections */}
      <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={4}>
        {/* Data Breakdown */}
        <Box bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="lg" mb={2}>Data Breakdown</Text>
          <Text>
            <Link to="/tasks/unassigned">Unassigned: {taskStatusCounts.unassigned}</Link>
          </Text>
          <Text>
            <Link to="/tasks/incomplete">Incomplete: {taskStatusCounts.incomplete}</Link>
          </Text>
          <Text>
            <Link to="/tasks/in-progress">In Progress: {taskStatusCounts.inProgress}</Link>
          </Text>
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
      {/* <TaskBoard /> */}
    </Box>
  );
};
