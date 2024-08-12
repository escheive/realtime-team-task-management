import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import TaskColumn from './TaskColumn';
import TaskForm from './TaskForm';
import { ITask } from '~types/taskTypes';
import { Box, Grid, useBreakpointValue } from '@chakra-ui/react';

// Connect to the tasks namespace websocket
const socket = io('http://localhost:5000/tasks');


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

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('taskCreated', (newTask: ITask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
    });

    socket.on('taskDeleted', (deletedTaskId: string) => {
      setTasks((prevTasks) => prevTasks.filter(task => task._id !== deletedTaskId));
    });
    

    socket.on('taskUpdated', (updatedTask: ITask) => {
      console.log('Task updated on socket')
      if (updatedTask._id) {
        setTasks((prevTasks) => {
          const existingTaskIndex = prevTasks.findIndex(task => task._id === updatedTask._id);
          if (existingTaskIndex > -1) {
            const updatedTasks = [...prevTasks];
            updatedTasks[existingTaskIndex] = updatedTask;
            return updatedTasks;
          }
          return [...prevTasks, updatedTask];
        });
      } else {
        setTasks((prevTasks) => prevTasks.filter(task => task._id !== updatedTask._id));
      }
    });

    // Cleanup
    return () => {
      socket.off('taskCreated');
      socket.off('taskUpdated');
      socket.off('taskDeleted');
    };

  }, []);

  const handleTaskCreated = (task: ITask) => {
    // Emit the taskCreated event to server
    socket.emit('taskCreated', task)
  };

  const handleTaskDeleted = async (taskId: string) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);

      // Emit the taskDeleted event to server
      socket.emit('taskDeleted', taskId)
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

      // Emit WebSocket event to notify other clients
      socket.emit('taskUpdated', { _id: taskId, status })
  
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
