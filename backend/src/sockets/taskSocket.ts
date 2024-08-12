import { Server as SocketIOServer, Socket } from 'socket.io';
import { Task } from '../models/Task';

export const setupTaskSockets = (io: SocketIOServer) => {
  io.on('connection', (socket: Socket) => {
    console.log('A user connected');

    socket.on('createTask', async (taskData) => {
      const task = new Task(taskData);
      await task.save();
      io.emit('taskCreated', task);
    });

    socket.on('updateTask', async (taskData) => {
      const task = await Task.findByIdAndUpdate(taskData._id, taskData, { new: true });
      io.emit('taskUpdated', task);
    });

    socket.on('deleteTask', async (taskId) => {
      await Task.findByIdAndDelete(taskId);
      io.emit('taskDeleted', taskId);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};
