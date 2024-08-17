import React, { useEffect, useState } from 'react';
import { Box, Text, Stack, Badge, Flex, Tooltip, IconButton, Button } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { TaskStatus } from '~tasks/types';
import { updateTask, deleteTask } from '~tasks/api';
import { useTaskContext } from '~/features/tasks/context';
import { useNavigate, useParams } from 'react-router-dom';

export const TaskListPage: React.FC = () => {
  const navigate = useNavigate();
  const { paginatedTasks, fetchTasks } = useTaskContext();
  const { status } = useParams<{ status?: TaskStatus }>();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10; // Number of tasks per page

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
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
    const loadTasks = async () => {
      setLoading(true);
      try {
        const filters = { status };
        await fetchTasks(currentPage, limit, filters);
      } catch (error) {
        setError('Error fetching tasks.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [currentPage, fetchTasks, limit, status]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>
        Task List
      </Text>
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
                      onClick={(e) => {
                        e.stopPropagation();
                        updateTask(task);
                      }}
                      mr={2}
                    />
                  </Tooltip>
                  <Tooltip label="Delete Task">
                    <IconButton
                      aria-label="Delete Task"
                      icon={<DeleteIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task._id);
                      }}
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
          ))
        )}
      </Stack>

      {/* Pagination Controls */}
      <Box mt={4}>
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          isDisabled={currentPage <= 1}
        >
          Previous
        </Button>
        <Text mx={4} display="inline">Page {currentPage} of {paginatedTasks.totalPages}</Text>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, paginatedTasks.totalPages))}
          isDisabled={currentPage >= paginatedTasks.totalPages}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

// import React, { useEffect } from 'react';
// import { Box, Text, Stack, Badge, Flex, Tooltip, IconButton } from '@chakra-ui/react';
// import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
// import axios from '~utils/axiosConfig';
// import { TaskStatus } from '~tasks/types';
// import { updateTask, deleteTask } from '~tasks/api';
// import { useTaskContext } from '~/features/tasks/context';
// import { useNavigate } from 'react-router-dom';

// export const TaskListPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { paginatedTasks } = useTaskContext();

//   const getStatusColor = (status: TaskStatus) => {
//     switch (status) {
//       case TaskStatus.UNASSIGNED:
//         return 'gray';
//       case TaskStatus.INCOMPLETE:
//         return 'yellow';
//       case TaskStatus.IN_PROGRESS:
//         return 'blue';
//       case TaskStatus.CANCELLED:
//         return 'red';
//       case TaskStatus.COMPLETE:
//         return 'green';
//       default:
//         return 'gray';
//     }
//   };

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get('/api/tasks');
//         setTasks(response.data);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   return (
//     <Box p={4}>
//       <Text fontSize="2xl" mb={4}>
//         Task List
//       </Text>
//       <Stack spacing={4}>
//         {tasks.map((task) => (
//           <Box
//             key={task._id}
//             p={4}
//             borderWidth={1}
//             borderRadius="md"
//             boxShadow="md"
//             bg="white"
//             onClick={() => navigate(`/tasks/${task._id}`)}
//           >
//             <Flex justify="space-between" align="center">
//               <Box>
//                 <Text fontSize="lg" fontWeight="bold">
//                   {task.title}
//                 </Text>
//                 <Text fontSize="sm" color="gray.500">
//                   {task.description || 'No description provided'}
//                 </Text>
//                 <Badge
//                   mt={2}
//                   colorScheme={getStatusColor(task.status)}
//                   fontSize="0.8em"
//                 >
//                   {task.status}
//                 </Badge>
//               </Box>
//               <Flex>
//                 <Tooltip label="Edit Task">
//                   <IconButton
//                     aria-label="Edit Task"
//                     icon={<EditIcon />}
//                     onClick={() => updateTask(task)}
//                     mr={2}
//                   />
//                 </Tooltip>
//                 <Tooltip label="Delete Task">
//                   <IconButton
//                     aria-label="Delete Task"
//                     icon={<DeleteIcon />}
//                     onClick={() => deleteTask(task._id)}
//                   />
//                 </Tooltip>
//               </Flex>
//             </Flex>
//             {task.dueDate && (
//               <Text fontSize="sm" mt={2} color="gray.600">
//                 Due: {new Date(task.dueDate).toLocaleDateString()}
//               </Text>
//             )}
//             {task.tags && (
//               <Flex mt={2}>
//                 {task.tags.map((tag) => (
//                   <Badge key={tag} colorScheme="purple" mr={2}>
//                     {tag}
//                   </Badge>
//                 ))}
//               </Flex>
//             )}
//           </Box>
//         ))}
//       </Stack>
//     </Box>
//   );
// };