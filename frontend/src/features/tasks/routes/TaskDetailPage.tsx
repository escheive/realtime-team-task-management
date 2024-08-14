// src/features/tasks/pages/TaskDetailPage.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  Badge,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  Stack,
  Avatar,
  List,
  ListItem,
  ListIcon,
  Divider,
  IconButton,
} from '@chakra-ui/react';
import { EditIcon, CheckIcon, AttachmentIcon, CalendarIcon } from '@chakra-ui/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { ITask, TaskStatus, TaskPriority } from '~tasks/types';
import { updateTask } from '~tasks/api';
import { useTaskContext } from '~/features/tasks/context';

export const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { tasks, setTasks } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  // const task = tasks.find((task) => task._id === id);
  const [task, setTask] = useState<ITask | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundTask = tasks.find((task) => task._id === id);
    if (foundTask) setTask(foundTask);
  }, [id, tasks]);

  if (!task) return <Text>Task not found</Text>;

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask((prevTask) => (prevTask ? { ...prevTask, [name]: value } : null));
  };

  const handleSaveChanges = async () => {
    if (!task) return;

    try {
      await updateTask(task);
      // setTasks((prevTasks) => prevTasks.map((t) => (t._id === task._id ? updatedTask : t)));
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <Box p={6} boxShadow="lg" bg="white" borderRadius="md">
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          {isEditing ? (
            <Input name="title" value={task.title} onChange={handleInputChange} fontSize="2xl" fontWeight="bold" />
          ) : (
            <Text fontSize="2xl" fontWeight="bold">
              {task.title}
            </Text>
          )}
          {isEditing ? (
            <Textarea name="description" value={task.description} onChange={handleInputChange} fontSize="md" color="gray.500" />
          ) : (
            <Text fontSize="md" color="gray.500">
              {task.description || 'No description provided'}
            </Text>
          )}
        </Box>
        <IconButton
          icon={isEditing ? <CheckIcon /> : <EditIcon />}
          aria-label="Edit task"
          onClick={isEditing ? handleSaveChanges : handleEditToggle}
        />
      </Flex>

      {isEditing ? (
        <>
          <FormControl mb={4}>
            <FormLabel>Status</FormLabel>
            <Select name="status" value={task.status} onChange={handleInputChange}>
              {Object.values(TaskStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Priority</FormLabel>
            <Select name="priority" value={task.priority} onChange={handleInputChange}>
              {Object.values(TaskPriority).map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Due Date</FormLabel>
            <Input
              name="dueDate"
              type="date"
              value={task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Assigned To</FormLabel>
            <Input name="assignedTo" value={task.assignedTo || ''} onChange={handleInputChange} />
          </FormControl>
        </>
      ) : (
        <>
          <Stack direction="row" align="center" mb={4}>
            <Badge colorScheme="blue">{task.status}</Badge>
            <Badge colorScheme="red">{task.priority}</Badge>
          </Stack>

          <Text mb={4}>
            <strong>Assigned To:</strong> {task.assignedTo || 'Unassigned'}
          </Text>

          <Text mb={4}>
            <strong>Created By:</strong> {task.createdBy}
          </Text>

          {task.dueDate && (
            <Text mb={4}>
              <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
            </Text>
          )}
        </>
      )}
    </Box>
  );
};


//   return (
//     <Box p={6} boxShadow="lg" bg="white" borderRadius="md">
//       <Flex justify="space-between" align="center" mb={6}>
//         <Box>
//           <Text fontSize="2xl" fontWeight="bold">
//             {task.title}
//           </Text>
//           <Text fontSize="md" color="gray.500">
//             {task.description || 'No description provided'}
//           </Text>
//         </Box>
//         <IconButton
//           icon={isEditing ? <CheckIcon /> : <EditIcon />}
//           aria-label="Edit task"
//           onClick={isEditing ? handleSaveChanges : handleEditToggle}
//         />
//       </Flex>

//       {isEditing ? (
//         <>
//           <FormControl mb={4}>
//             <FormLabel>Title</FormLabel>
//             <Input defaultValue={task.title} />
//           </FormControl>

//           <FormControl mb={4}>
//             <FormLabel>Description</FormLabel>
//             <Textarea defaultValue={task.description} />
//           </FormControl>

//           <FormControl mb={4}>
//             <FormLabel>Status</FormLabel>
//             <Select defaultValue={task.status}>
//               {Object.values(TaskStatus).map((status) => (
//                 <option key={status} value={status}>
//                   {status}
//                 </option>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl mb={4}>
//             <FormLabel>Priority</FormLabel>
//             <Select defaultValue={task.priority}>
//               {Object.values(TaskPriority).map((priority) => (
//                 <option key={priority} value={priority}>
//                   {priority}
//                 </option>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl mb={4}>
//             <FormLabel>Due Date</FormLabel>
//             <Input type="date" defaultValue={task.dueDate?.toISOString().split('T')[0]} />
//           </FormControl>

//           <FormControl mb={4}>
//             <FormLabel>Assigned To</FormLabel>
//             <Input defaultValue={task.assignedTo} />
//           </FormControl>
//         </>
//       ) : (
//         <>
//           <Stack direction="row" align="center" mb={4}>
//             <Badge colorScheme="blue">{task.status}</Badge>
//             <Badge colorScheme="red">{task.priority}</Badge>
//           </Stack>

//           <Text mb={4}>
//             <strong>Assigned To:</strong> {task.assignedTo || 'Unassigned'}
//           </Text>

//           <Text mb={4}>
//             <strong>Created By:</strong> {task.createdBy}
//           </Text>

//           {task.dueDate && (
//             <Text mb={4}>
//               <strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}
//             </Text>
//           )}

//           {task.reminder && (
//             <Text mb={4}>
//               <strong>Reminder:</strong> {new Date(task.reminder.date).toLocaleDateString()} -{' '}
//               {task.reminder.message}
//             </Text>
//           )}

//           {task.completedAt && (
//             <Text mb={4} color="green.500">
//               <strong>Completed At:</strong> {new Date(task.completedAt).toLocaleDateString()}
//             </Text>
//           )}
//         </>
//       )}

//       <Divider my={6} />

//       <Text fontSize="lg" fontWeight="bold" mb={4}>
//         Activity Log
//       </Text>
//       <List spacing={3} mb={6}>
//         {task.activityLog?.map((log, index) => (
//           <ListItem key={index}>
//             <ListIcon as={CalendarIcon} color="gray.500" />
//             {log.user} {log.action} on {new Date(log.timestamp).toLocaleString()}
//             {log.comment && <Text ml={8}>{log.comment}</Text>}
//           </ListItem>
//         ))}
//       </List>

//       <Text fontSize="lg" fontWeight="bold" mb={4}>
//         Attachments
//       </Text>
//       <List spacing={3}>
//         {task.attachments?.map((attachment, index) => (
//           <ListItem key={index}>
//             <ListIcon as={AttachmentIcon} color="gray.500" />
//             <a href={attachment.url} target="_blank" rel="noopener noreferrer">
//               {attachment.filename}
//             </a>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );
// }
