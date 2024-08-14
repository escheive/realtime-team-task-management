import io from 'socket.io-client';
import { ITask } from '~types/taskTypes';

const taskSocket = io('http://localhost:5000/tasks');

const onTaskCreated = (callback: (task: ITask) => void) => {
  taskSocket.on('taskCreated', callback);
};

const onTaskUpdated = (callback: (task: ITask) => void) => {
  taskSocket.on('taskUpdated', callback);
};

const onTaskDeleted = (callback: (taskId: string) => void) => {
  taskSocket.on('taskDeleted', callback);
};

const emitTaskCreated = (task: ITask) => {
  taskSocket.emit('taskCreated', task);
};

const emitTaskUpdated = (task: ITask) => {
  taskSocket.emit('taskUpdated', task);
};

const emitTaskDeleted = (taskId: string) => {
  taskSocket.emit('taskDeleted', taskId);
};

const cleanupTaskSockets = () => {
  taskSocket.disconnect();
}

export {
  onTaskCreated,
  onTaskUpdated,
  onTaskDeleted,
  emitTaskCreated,
  emitTaskUpdated,
  emitTaskDeleted,
  cleanupTaskSockets
};
