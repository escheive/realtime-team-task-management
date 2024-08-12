import React from 'react';
import TaskCard from './TaskCard';
import { ITask } from '~types/taskTypes';
import { Box, Heading, Stack } from '@chakra-ui/react';

interface TaskColumnProps {
  columnTitle: string;
  tasks: ITask[];
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDrop: (e: React.DragEvent, status: string) => void;
  onDelete: (taskId: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ columnTitle, tasks, onDragStart, onDrop, onDelete }) => {
  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
      bg="white"
      minW="300px"
      maxW="350px"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, columnTitle)}
    >
      <Heading as="h2" size="md" mb={4}>
        {columnTitle}
      </Heading>
      <Stack spacing={4}>
        {tasks.map(task => (
          <TaskCard 
            key={task._id} 
            task={task} 
            onDragStart={onDragStart} 
            onDelete={onDelete} 
          />
        ))}
      </Stack>
    </Box>
  );
};

export default TaskColumn;