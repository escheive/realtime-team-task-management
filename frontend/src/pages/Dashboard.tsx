import React from 'react';
import TaskBoard from '../components/tasks/TaskBoard';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <TaskBoard />
    </div>
  );
};

export default Dashboard;
