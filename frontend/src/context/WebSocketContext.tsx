import React, { createContext, useState, useContext, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { ITask } from '~tasks/types';
import { onTaskCreated } from '~services/sockets';

interface WebSocketContextProps {
  taskSocket: Socket | null;
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }: { children: React.ReactNode }) => {
  const [taskSocket, setTaskSocket] = useState<Socket | null>(null);
  const [tasks, setTasks] = useState<ITask[]>([]);

  const handleTaskCreated = (newTask: ITask) => {
    setTasks((prevTasks) => {
      // Check if the task already exists
      if (prevTasks.some(task => task._id === newTask._id)) {
          return prevTasks; // Do not add a duplicate task
      }
      return [...prevTasks, newTask];
  });
  }

  useEffect(() => {
    const newTaskSocket = io('http://localhost:5000/tasks');
    setTaskSocket(newTaskSocket);

    onTaskCreated(handleTaskCreated)
    // newTaskSocket.on('taskCreated', handleTaskCreated);

    // newTaskSocket.on('taskCreated', (task: ITask) => {
    //   setTasks((prevTasks) => [...prevTasks, task]);
    // });

    newTaskSocket.on('taskUpdated', (updatedTask: ITask) => {
      setTasks((prevTasks) => prevTasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
    });

    newTaskSocket.on('taskDeleted', (taskId: string) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    });

    // Cleanup sockets
    return () => {
      newTaskSocket.disconnect();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ taskSocket, tasks, setTasks }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSockets = () => {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error('useWebSockets must be used within an WebSocketProvider');
  };

  return context;
}
