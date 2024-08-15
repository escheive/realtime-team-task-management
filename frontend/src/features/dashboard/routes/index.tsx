import { useEffect, useState } from 'react';
import axios from "~utils/axiosConfig";
import { Link as RouterLink } from 'react-router-dom';
import { Box, Grid, Flex, Text, Button, List, ListItem } from '@chakra-ui/react';
import { ITask } from '~/features/tasks/types';

export const Dashboard = () => {
  const [taskStatusCounts, setTaskStatusCounts] = useState({
    unassigned: 0,
    incomplete: 0,
    inProgress: 0,
  });
  const [userTasks, setUserTasks] = useState<ITask[]>([])

  useEffect(() => {

    const fetchTaskStatusCounts = async () => {
      try {
        const response = await axios.get('/api/tasks/status-counts');
        setTaskStatusCounts(response.data);
      } catch (error) {
        console.error('Error fetching incomplete tasks count:', error);
      }
    };

    const fetchUserTasks = async () => {
      try {
        const response = await axios.get(`/api/tasks?assignedTo=${user._id}`);
        setUserTasks(response.data);
      } catch (error) {
        console.error('Error fetching user tasks:', error);
      }
    };

    fetchTaskStatusCounts();
    fetchUserTasks();
  }, []);

  return (
    <Box p={4}>
      <Button
        as={RouterLink}
        to="/tasks/new"
        colorScheme="blue"
        variant="solid"
        size="lg"
        mb={4}
      >
        Create New Task
      </Button>
      {/* Top Sections */}
      <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={4}>
        {/* Data Breakdown */}
        <Box bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="lg" mb={2}>Data Breakdown</Text>
          <Text>
            <RouterLink to="/tasks/status/unassigned">Unassigned: {taskStatusCounts.unassigned}</RouterLink>
          </Text>
          <Text>
            <RouterLink to="/tasks/status/incomplete">Incomplete: {taskStatusCounts.incomplete}</RouterLink>
          </Text>
          <Text>
            <RouterLink to="/tasks/status/in-progress">In Progress: {taskStatusCounts.inProgress}</RouterLink>
          </Text>
        </Box>

        {/* Current Tasks Assigned to User */}
        <Box bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="lg" mb={2}>Current Tasks Assigned to You</Text>
          {userTasks.length > 0 ? (
            <List spacing={3}>
              {userTasks.map(task => (
                <ListItem key={task._id}>
                  <RouterLink to={`/tasks/${task._id}`}>{task.title}</RouterLink>
                </ListItem>
              ))}
            </List>
          ) : (
            <Text>No tasks assigned to you.</Text>
          )}
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
