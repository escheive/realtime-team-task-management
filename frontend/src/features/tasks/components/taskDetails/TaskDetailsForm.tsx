import React from 'react';
import { FormControl, FormLabel, Input, Select, Divider } from '@chakra-ui/react';
import { ITask, TaskStatus, TaskPriority } from '~tasks/types';
import { formatDateTimeLocal } from '~utils/helpers';

interface TaskDetailsFormProps {
  task: ITask;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  isDisabled: boolean;
}

export const TaskDetailsForm: React.FC<TaskDetailsFormProps> = ({ task, onInputChange, isDisabled }) => {

  return (
    <>
      <FormControl mb={4}>
        <FormLabel>Status</FormLabel>
        <Select name="status" value={task.status} onChange={onInputChange} isDisabled={isDisabled}>
          {Object.values(TaskStatus).map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </Select>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Priority</FormLabel>
        <Select name="priority" value={task.priority} onChange={onInputChange} isDisabled={isDisabled}>
          {Object.values(TaskPriority).map((priority) => (
            <option key={priority} value={priority}>{priority}</option>
          ))}
        </Select>
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Due Date</FormLabel>
        <Input name="dueDate" type="datetime-local" value={task.dueDate ? formatDateTimeLocal(new Date(task.dueDate)) : ''} onChange={onInputChange} isDisabled={isDisabled} />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Assigned To</FormLabel>
        <Input name="assignedTo" value={task.assignedTo || ''} onChange={onInputChange} isDisabled={isDisabled} />
      </FormControl>

      <Divider my={6} />
    </>
  );
};
