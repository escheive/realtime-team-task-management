import React from 'react';
import { ITask } from '~types/taskTypes';

interface TaskCardProps {
  task: ITask;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart }) => {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task._id)}
      className="task-card"
    >
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskCard;
