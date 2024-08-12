import React, { useState } from 'react';
import TaskColumn from './TaskColumn';

const initialTasks = [
  // Sample tasks
  { id: '1', title: 'Task 1', description: 'Description 1', status: 'To Do' },
  { id: '2', title: 'Task 2', description: 'Description 2', status: 'In Progress' },
];

const TaskBoard: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = (e: React.DragEvent, status: string) => {
    const taskId = e.dataTransfer.getData('taskId');
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="task-board">
      {['To Do', 'In Progress', 'Done'].map(status => (
        <TaskColumn
          key={status}
          columnTitle={status}
          tasks={tasks.filter(task => task.status === status)}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
};

export default TaskBoard;
