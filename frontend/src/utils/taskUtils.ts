import axios from '~utils/axiosConfig';
import { ITask } from '~types/taskTypes';

export const createTask = async (task: Omit<ITask, '_id'>) => {
  try {
    console.log('Creating task:', task);
    await axios.post(`/api/tasks`, task);

  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

export const deleteTask = async (taskId: string, setTasks: React.Dispatch<React.SetStateAction<ITask[]>>) => {
  try {
    console.log('Deleting task:', taskId);
    // Delete task from the database
    await axios.delete(`/api/tasks/${taskId}`);

  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

export const updateTask = async (task: ITask, setTasks: React.Dispatch<React.SetStateAction<ITask[]>>) => {
  try {
    console.log('Updating task:', task);
    // Update task in the database
    await axios.put(`/api/tasks/${task._id}`, task);

  } catch (error) {
    console.error('Error updating task:', error);
  }
};
