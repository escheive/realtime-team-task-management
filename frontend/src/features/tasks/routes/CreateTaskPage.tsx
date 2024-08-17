import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { TaskForm } from '~tasks/components';

export const CreateTaskPage: React.FC = () => {
  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>Create or Edit Task</Text>
      <TaskForm />
    </Box>
  );
};
