import axios from '~utils/axiosConfig';
import { ITask, GetTasksResponse, GetTasksParams } from '~tasks/types';


export const getTasks = async (params: GetTasksParams): Promise<GetTasksResponse> => {
  const response = await axios.get(`/api/tasks`, { params });
  return response.data;
};

export const createTask = async (task: Omit<ITask, '_id'>): Promise<ITask> => {
  const response = await axios.post<ITask>(`/api/tasks`, task);
  return response.data;
};

export const updateTask = async (task: ITask): Promise<ITask> => {
  const response = await axios.put<ITask>(`/api/tasks/${task._id}`, task);
  return response.data;
};

export const deleteTask = async (taskId: string): Promise<void> => {
  await axios.delete(`/api/tasks/${taskId}`);
};