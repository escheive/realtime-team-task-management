import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from '~utils/axiosConfig';
import { ITask } from '~tasks/types';
import { useToast } from '@chakra-ui/react';
import {
  onTaskCreated,
  onTaskUpdated,
  onTaskDeleted,
  cleanupTaskSockets
} from '~tasks/sockets';

interface PaginatedTasks {
  tasks: ITask[];
  totalPages: number;
  currentPage: number;
  totalTasks: number;
}

interface TaskContextProps {
  taskSocket: Socket | null;
  paginatedTasks: PaginatedTasks;
  fetchTasks: (page: number, limit: number, filters?: any) => Promise<void>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [taskSocket, setTaskSocket] = useState<Socket | null>(null);
  const [paginatedTasks, setPaginatedTasks] = useState<PaginatedTasks>({
    tasks: [],
    totalPages: 0,
    currentPage: 1,
    totalTasks: 0
  });
  const toast = useToast();

  useEffect(() => {
    const newTaskSocket = io('http://localhost:5000/tasks');
    setTaskSocket(newTaskSocket);

    onTaskCreated((task: ITask) => {
      setPaginatedTasks((prev) => ({
        ...prev,
        tasks: [...prev.tasks, task]
      }));
    });

    onTaskUpdated((updatedTask: ITask) => {
      toast({
        title: 'Task Updated',
        description: `Task "${updatedTask.title}" has been updated.`,
        position: 'top',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });

      setPaginatedTasks((prev) => ({
        ...prev,
        tasks: prev.tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
      }));
    });

    onTaskDeleted((taskId: string) => {
      setPaginatedTasks((prev) => ({
        ...prev,
        tasks: prev.tasks.filter((task) => task._id !== taskId)
      }));
    });

    return () => {
      cleanupTaskSockets();
      newTaskSocket.disconnect();
    };
  }, []);

  const fetchTasks = useCallback(async (page: number, limit: number, filters: Record<string, string>) => {
    try {
      // Fetch tasks with filter query params
      const response = await axios('/api/tasks',
        {
          params: {
            ...filters,
            page,
            limit
          }
        });
      const data = await response.data;
      setPaginatedTasks({
        tasks: data.tasks,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
        totalTasks: data.totalTasks
      });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, []);

  return (
    <TaskContext.Provider value={{ taskSocket, paginatedTasks, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
