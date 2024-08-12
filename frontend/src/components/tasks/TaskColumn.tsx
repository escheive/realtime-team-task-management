import React from 'react';
import TaskCard from './TaskCard';
import { ITask } from '~types/taskTypes';

interface TaskColumnProps {
  columnTitle: string;
  tasks: ITask[];
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDrop: (e: React.DragEvent, status: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ columnTitle, tasks, onDragStart, onDrop }) => {
  return (
    <div
      className="task-column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e, columnTitle)}
    >
      <h2>{columnTitle}</h2>
      {tasks.map(task => (
        <TaskCard key={task._id} task={task} onDragStart={onDragStart} />
      ))}
    </div>
  );
};

export default TaskColumn;