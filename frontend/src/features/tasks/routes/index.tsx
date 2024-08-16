import React, { useEffect, useState } from 'react';
import { Box, Heading, Stack, Text, VStack, Button } from '@chakra-ui/react';
import { useTaskContext } from '~/features/tasks/context';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TaskStatus } from '~tasks/types';

export const TasksPage: React.FC = () => {
  const navigate = useNavigate();
  const { paginatedTasks, fetchTasks } = useTaskContext();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10; // Number of tasks per page

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        // Build query string from all search params
        const filters = Object.fromEntries(searchParams.entries());

        await fetchTasks(currentPage, limit, filters);
      } catch (error) {
        setError('Error fetching tasks.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [currentPage, fetchTasks, limit]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= paginatedTasks.totalPages) {
      setCurrentPage(page);
    }
  };

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await axios.get('/api/tasks');
  //       setTasks(response.data);
  //     } catch (error) {
  //       setError('Error fetching tasks.');
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box p={4}>
      <Heading mb={4}>All Tasks</Heading>
      <Stack spacing={4}>
        {paginatedTasks.tasks.length === 0 ? (
          <Text>No tasks available.</Text>
        ) : (
          paginatedTasks.tasks.map((task) => (
            <Box
              key={task._id}
              p={4}
              borderWidth={1}
              borderRadius="md"
              boxShadow="md"
              bg="white"
              onClick={() => navigate(`/tasks/${task._id}`)}
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

      {/* Pagination Controls */}
      <Box mt={4}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage <= 1}
        >
          Previous
        </Button>
        <Text mx={4} display="inline">Page {currentPage} of {paginatedTasks.totalPages}</Text>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage >= paginatedTasks.totalPages}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};
