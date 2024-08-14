import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';
import axios from '~utils/axiosConfig';
import { TaskList } from '~components/tasks/TaskList';
import { ITask } from '~types/taskTypes';

export const TaskListPage: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleEdit = (task: ITask) => {
    // Handle edit logic
  };

  const handleDelete = (taskId: string) => {
    // Handle delete logic
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4}>
        Task List
      </Text>
      <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
    </Box>
  );
};
