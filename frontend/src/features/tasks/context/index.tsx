import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import axios from '~utils/axiosConfig';
import { ITask } from '~tasks/types';
import { useUser } from '~features/users/context/UserContext';
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
  userTasks: ITask[];
  userTasksLoading: boolean;
  fetchUserTasks: () => void;
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
  const [userTasks, setUserTasks] = useState<ITask[]>([]);
  const [userTasksLoading, setUserTasksLoading] = useState(true);
  const { user } = useUser();
  const toast = useToast();

  // Fetch user tasks
  const fetchUserTasks = async () => {

    if (user && user._id) {
      setUserTasksLoading(true);
      try {
        const response = await axios.get('/api/tasks', {
          params: {
            assignedTo: user._id
          },
        });
        setUserTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching user tasks:', error);
      } finally {
        setUserTasksLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUserTasks();
  }, [user]);

  useEffect(() => {
    const newTaskSocket = io('http://localhost:5000/tasks');
    setTaskSocket(newTaskSocket);

    onTaskCreated((task: ITask) => {
      setPaginatedTasks((prev) => ({
        ...prev,
        tasks: [...prev.tasks, task]
      }));
    });

    onTaskUpdated(({ oldTask, updatedTask }: { oldTask: ITask; updatedTask: ITask }) => {
      if (user && updatedTask.assignedTo === user._id) {
        // Identify what was updated 
        const updatedFields: string[] = [];
        if (oldTask.title !== updatedTask.title) updatedFields.push(`Title is now ${updatedTask.title}`);

        toast({
          title: `Task: "${oldTask.title}" Updated`,
          description: `${updatedFields.join('.\n')}`,
          status: 'info',
          position: 'top',
          duration: 5000,
          isClosable: true,
        });

        setUserTasks(prevUserTasks => {
          // Find index of the updated task
          const index = prevUserTasks.findIndex(task => task._id === updatedTask._id);
          if (index !== -1) {
            // Update the task in the array
            const updatedTasks = [...prevUserTasks];
            updatedTasks[index] = updatedTask;
            return updatedTasks;
          }
          return prevUserTasks;
        });
      }

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
    <TaskContext.Provider value={{ taskSocket, paginatedTasks, fetchTasks, userTasks, userTasksLoading, fetchUserTasks }}>
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
