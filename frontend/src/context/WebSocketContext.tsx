import React, { createContext, useState, useContext, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { ITask } from '~types/taskTypes';

interface WebSocketContextProps {
  taskSocket: Socket | null;
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }: { children: React.ReactNode }) => {
  const [taskSocket, setTaskSocket] = useState<Socket | null>(null);
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const newTaskSocket = io('http://localhost:5000/tasks');
    setTaskSocket(newTaskSocket);

    newTaskSocket.on('taskCreated', (task: ITask) => {
      setTasks((prevTasks) => [...prevTasks, task]);
    });

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
