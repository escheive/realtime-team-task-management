import React from 'react';
import { ITask } from '~types/taskTypes';
import { Box, Text, Badge, Stack, IconButton } from '@chakra-ui/react';
import { DragHandleIcon } from '@chakra-ui/icons';
interface TaskCardProps {
  task: ITask;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart }) => {
  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      bg="gray.50"
      mb={4}
      minW="250px"
      draggable
      onDragStart={(e) => onDragStart(e, task._id)}
    >
      <Stack spacing={3}>
        <Text fontSize="lg" fontWeight="bold">{task.title}</Text>
        <Text>{task.description}</Text>
        <Badge colorScheme={task.status === 'Done' ? 'green' : task.status === 'In Progress' ? 'yellow' : 'blue'}>
          {task.status}
        </Badge>
        <Text fontSize="sm" color="gray.600">Assigned to: {task.assignedTo}</Text>
        <Text fontSize="sm" color="gray.600">Due: {new Date(task.dueDate).toLocaleDateString()}</Text>
        <IconButton
          aria-label="Drag"
          icon={<DragHandleIcon />}
          variant="outline"
          size="sm"
          isRound
        />
      </Stack>
    </Box>
  );
};

export default TaskCard;
