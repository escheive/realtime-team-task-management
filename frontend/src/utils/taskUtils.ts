import axios from '~utils/axiosConfig';
import { ITask } from '~types/taskTypes';
import { emitTaskCreated, emitTaskUpdated, emitTaskDeleted } from '~services/sockets';

export const onTaskCreated = async (task: Omit<ITask, '_id'>) => {
  try {
    console.log('Creating task:', task);

    // Emit the deletion event to WebSocket
    emitTaskCreated(createdTask);

  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

export const onTaskDelete = async (taskId: string, setTasks: React.Dispatch<React.SetStateAction<ITask[]>>) => {
  try {
    console.log('Deleting task:', taskId);
    // Delete task from the database
    await axios.delete(`/api/tasks/${taskId}`);

    // Emit the deletion event to WebSocket
    emitTaskDeleted(taskId);

    // Update local state immediately (optimistic UI)
    setTasks((prevTasks) => prevTasks.filter((t) => t._id !== taskId));
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

export const onTaskEdit = async (task: ITask, setTasks: React.Dispatch<React.SetStateAction<ITask[]>>) => {
  try {
    // Update task in the database
    const response = await axios.put(`/api/tasks/${task._id}`, task);
    const updatedTask = response.data;

    // Emit the update event to WebSocket
    emitTaskUpdated(updatedTask);

    // Update local state immediately (optimistic UI)
    setTasks((prevTasks) => 
      prevTasks.map((t) => (t._id === updatedTask._id ? updatedTask : t))
    );
  } catch (error) {
    console.error('Error updating task:', error);
  }
};
