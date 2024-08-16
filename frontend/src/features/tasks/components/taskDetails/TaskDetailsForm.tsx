import React from 'react';
import { FormControl, FormLabel, Input, Select, Divider } from '@chakra-ui/react';
import { ITask, TaskStatus, TaskPriority } from '~tasks/types';

interface TaskDetailsFormProps {
  task: ITask;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const TaskDetailsForm: React.FC<TaskDetailsFormProps> = ({ task, onInputChange }) => (
  <>
    <FormControl mb={4}>
      <FormLabel>Status</FormLabel>
      <Select name="status" value={task.status} onChange={onInputChange}>
        {Object.values(TaskStatus).map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </Select>
    </FormControl>

    <FormControl mb={4}>
      <FormLabel>Priority</FormLabel>
      <Select name="priority" value={task.priority} onChange={onInputChange}>
        {Object.values(TaskPriority).map((priority) => (
          <option key={priority} value={priority}>{priority}</option>
        ))}
      </Select>
    </FormControl>

    <FormControl mb={4}>
      <FormLabel>Due Date</FormLabel>
      <Input name="dueDate" type="date" value={task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''} onChange={onInputChange} />
    </FormControl>

    <FormControl mb={4}>
      <FormLabel>Assigned To</FormLabel>
      <Input name="assignedTo" value={task.assignedTo || ''} onChange={onInputChange} />
    </FormControl>

    <Divider my={6} />
  </>
);
