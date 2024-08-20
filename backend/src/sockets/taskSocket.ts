import { Namespace, Socket } from 'socket.io';
// import { Task } from '../models/Task';

export const setupTaskSockets = (taskNamespace: Namespace) => {
  taskNamespace.on('connection', (socket: Socket) => {

    // socket.on('taskCreated', async (taskData) => {
    //   const task = new Task({
    //     ...taskData,
    //     _id: undefined
    //   });

    //   await task.save();

    //   taskNamespace.emit('taskCreated', task);
    // });

    // socket.on('taskUpdated', async (taskData) => {
    //   // const task = await Task.findByIdAndUpdate(taskData._id, taskData, { new: true });

    //   taskNamespace.emit('taskUpdated', taskData);
    // });

    // socket.on('taskDeleted', async (taskId) => {
    //   // await Task.findByIdAndDelete(taskId);

    //   taskNamespace.emit('taskDeleted', taskId);
    // });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};