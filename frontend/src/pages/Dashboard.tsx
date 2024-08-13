import React from 'react';
import TaskBoard from '../components/tasks/TaskBoard';

export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <TaskBoard />
    </div>
  );
};
