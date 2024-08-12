import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your server URL

const useWebSocket = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    socket.on('taskUpdate', (updatedTask) => {
      setTasks((prevTasks) => {
        const taskIndex = prevTasks.findIndex((task) => task.id === updatedTask.id);
        if (taskIndex > -1) {
          return [
            ...prevTasks.slice(0, taskIndex),
            updatedTask,
            ...prevTasks.slice(taskIndex + 1),
          ];
        }
        return [...prevTasks, updatedTask];
      });
    });

    return () => {
      socket.off('taskUpdate');
    };
  }, []);

  const sendTaskUpdate = (taskData: any) => {
    socket.emit('taskUpdate', taskData);
  };

  return { tasks, sendTaskUpdate };
};

export default useWebSocket;
