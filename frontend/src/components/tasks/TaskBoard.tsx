import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskColumn from './TaskColumn';
import { ITask } from '~types/taskTypes';


const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        console.log('Fetched tasks:', response.data);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const columns = ['To Do', 'In Progress', 'Done'];

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    const taskId = e.dataTransfer.getData('taskId');
    const updatedTasks = tasks.map(task =>
      task._id === taskId ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="task-board">
      {columns.map((column) => (
        <TaskColumn
          key={column}
          columnTitle={column}
          tasks={tasks.filter(task => task.status === column)}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
};

export default TaskBoard;
