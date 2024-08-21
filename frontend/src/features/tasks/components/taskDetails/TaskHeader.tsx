import React from 'react';
import { Box, Input, Textarea, Flex } from '@chakra-ui/react';
import { ITask } from '~tasks/types';

interface TaskHeaderProps {
  task: ITask;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isDisabled: boolean;
}

export const TaskHeader: React.FC<TaskHeaderProps> = ({ task, onInputChange, isDisabled }) => (
  <Flex justify='space-between' align='center' mb={6}>
    <Box>
      <>
        <Input name='title' value={task.title} onChange={onInputChange} fontSize='2xl' fontWeight='bold' isDisabled={isDisabled} />
        <Textarea name='description' value={task.description} onChange={onInputChange} fontSize='md' color='gray.500' isDisabled={isDisabled} />
      </>
    </Box>
  </Flex>
);