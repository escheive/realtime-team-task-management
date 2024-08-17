import { useEffect, useState } from 'react';
import axios from "~utils/axiosConfig";
import { Link as RouterLink } from 'react-router-dom';
import { Box, Grid, Flex, Text, Button, List, ListItem, Spinner } from '@chakra-ui/react';
import { useUser } from '~/features/users/context/UserContext';
import { useTaskContext } from '~/features/tasks/context';
import { TaskPriority } from '~tasks/types';

export const Dashboard = () => {
  const [taskStatusCounts, setTaskStatusCounts] = useState({
    unassigned: 0,
    incomplete: 0,
    inProgress: 0,
  });
  const [statusCountsLoading, setStatusCountsLoading] = useState(true);
  const { user } = useUser();
  const { userTasks, userTasksLoading } = useTaskContext();

  useEffect(() => {

    const fetchTaskStatusCounts = async () => {
      setStatusCountsLoading(true);
      try {
        const response = await axios.get('/api/tasks/status-counts');
        setTaskStatusCounts(response.data);
      } catch (error) {
        console.error('Error fetching incomplete tasks count:', error);
      } finally {
        setStatusCountsLoading(false);
      }
    };

    fetchTaskStatusCounts();
  }, [user]);

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
          {statusCountsLoading ? (
            <Flex justify="center" align="center" height="100%">
              <Spinner size="lg" m={4} />
            </Flex>
          ) : (
            <>
              <Text>
                <RouterLink to="/tasks?status=unassigned">Unassigned: {taskStatusCounts.unassigned}</RouterLink>
              </Text>
              <Text>
                <RouterLink to="/tasks?status=incomplete">Incomplete: {taskStatusCounts.incomplete}</RouterLink>
              </Text>
              <Text>
                <RouterLink to="/tasks?status=in-progress">In Progress: {taskStatusCounts.inProgress}</RouterLink>
              </Text>
            </>
          )}
        </Box>

        {/* Current Tasks Assigned to User */}
        <Box bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="lg" mb={2}>Current Tasks Assigned to You</Text>
          {userTasksLoading ? (
            <Flex justify="center" align="center" height="100%">
              <Spinner size="lg" m={4} />
            </Flex>
          ) : userTasks && userTasks.length > 0 ? (
            <List spacing={3}>
              {userTasks.map(task => {
                // Determine the task's status based on due date and priority
                const isUrgent = task.priority === TaskPriority.URGENT;
                const isHighPriority = task.priority === TaskPriority.HIGH;

                const today = new Date();
                const dueDate = new Date(task.dueDate)
                // const isDueToday = true;
                const isDueToday = task.dueDate && dueDate.toDateString() === today.toDateString();

                // Set the appropriate color based on the task's status
                let color = 'black';
                if (isUrgent || isDueToday) {
                  color = 'red.500';
                } else if (isHighPriority) {
                  color = 'yellow.500';
                }

                return (
                  <ListItem key={task._id}>
                    <RouterLink to={`/tasks/${task._id}`}>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Text fontWeight="bold" color={color}>
                          {task.title}
                        </Text>
                        <Text color={color} fontSize="sm">
                          {dueDate.toLocaleString()}
                        </Text>
                      </Box>
                    </RouterLink>
                  </ListItem>
                );
              })}
            </List>
            // <List spacing={3}>
            //   {userTasks.map(task => (
            //     <ListItem key={task._id}>
            //       <RouterLink to={`/tasks/${task._id}`}>
            //         <Text>{task.title}</Text>
            //         <Text>{task.dueDate?.toLocaleString()}</Text>
            //       </RouterLink>
            //     </ListItem>
            //   ))}
            // </List>
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
