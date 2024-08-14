import React, { createContext, useState, useContext, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { ITask } from '~tasks/types';
import {
  onTaskCreated,
  onTaskUpdated,
  onTaskDeleted,
  cleanupTaskSockets
} from '~tasks/sockets';

interface TaskContextProps {
  taskSocket: Socket | null;
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [taskSocket, setTaskSocket] = useState<Socket | null>(null);
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const newTaskSocket = io('http://localhost:5000/tasks');
    setTaskSocket(newTaskSocket);

    onTaskCreated((task: ITask) => {
      setTasks((prevTasks) => [...prevTasks, task]);
    });

    onTaskUpdated((updatedTask: ITask) => {
      setTasks((prevTasks) => prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
    });

    onTaskDeleted((taskId: string) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    });

    return () => {
      cleanupTaskSockets();
      newTaskSocket.disconnect();
    };
  }, []);

  return (
    <TaskContext.Provider value={{ taskSocket, tasks, setTasks }}>
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
