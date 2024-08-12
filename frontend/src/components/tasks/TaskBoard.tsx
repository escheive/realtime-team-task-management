import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskColumn from './TaskColumn';
import TaskForm from './TaskForm';
import { ITask } from '~types/taskTypes';
import { Box, Grid, useBreakpointValue } from '@chakra-ui/react';


const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error('Unexpected data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskCreated = (task: ITask) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleTaskDeleted = async (taskId: string) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const columns = ['To Do', 'In Progress', 'Done'];

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = async (e: React.DragEvent, status: string) => {
    const taskId = e.dataTransfer.getData('taskId');

    try {
      // Update the task locally
      const updatedTasks = tasks.map(task =>
        task._id === taskId ? { ...task, status } : task
      );
      setTasks(updatedTasks);
  
      // Send a request to update the task in the database
      await axios.put(`/api/tasks/${taskId}`, { status });
  
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  // Use Chakra UI Grid for responsive column layout
  const gridTemplateColumns = useBreakpointValue({
    base: '1fr', // Single column on small screens
    md: 'repeat(3, 1fr)', // Three columns on medium and larger screens
  });

  return (
    <Box p={4} bg="gray.100" minHeight="100vh">
      <Box mb={6}>
        <TaskForm onTaskCreated={handleTaskCreated} />
      </Box>
      <Grid templateColumns={gridTemplateColumns} gap={4}>
        {columns.map((column) => (
          <TaskColumn
            key={column}
            columnTitle={column}
            tasks={tasks.filter(task => task.status === column)}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDelete={handleTaskDeleted}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default TaskBoard;
