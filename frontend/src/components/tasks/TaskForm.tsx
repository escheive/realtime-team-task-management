import React, { useState } from 'react';
import axios from 'axios';
import { ITask } from '~types/taskTypes';

const TaskForm: React.FC<{ onTaskCreated: (task: ITask) => void }> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Omit<ITask, '_id' | 'createdBy'> = {
      title,
      description,
      status,
      createdBy: 'user-id-placeholder', // Replace with actual user ID logic
      assignedTo,
      dueDate: new Date(dueDate),
    };

    try {
      const response = await axios.post('/api/tasks', newTask);
      onTaskCreated(response.data);
      setTitle('');
      setDescription('');
      setStatus('To Do');
      setAssignedTo('');
      setDueDate('');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div>
        <label>Assigned To:</label>
        <input
          type="text"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />
      </div>
      <div>
        <label>Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
