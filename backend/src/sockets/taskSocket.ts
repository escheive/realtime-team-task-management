import { Namespace, Socket } from 'socket.io';
import { Task } from '../models/Task';

export const setupTaskSockets = (taskNamespace: Namespace) => {
  taskNamespace.on('connection', (socket: Socket) => {
    console.log(`${taskNamespace} A user connected`);

    socket.on('taskCreated', async (taskData) => {
      const task = new Task({
        ...taskData,
        _id: undefined
      });
      await task.save();
      taskNamespace.emit('taskCreated', task);
    });

    socket.on('taskUpdated', async (taskData) => {
      const task = await Task.findByIdAndUpdate(taskData._id, taskData, { new: true });
      taskNamespace.emit('taskUpdated', task);
    });

    socket.on('taskDeleted', async (taskId) => {
      await Task.findByIdAndDelete(taskId);
      console.log('Emitting taskDeleted:', taskId);
      taskNamespace.emit('taskDeleted', taskId);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
};
// import { Server as SocketIOServer, Socket } from 'socket.io';
// import { Task } from '../models/Task';

// export const setupTaskSockets = (io: SocketIOServer) => {
//   io.on('connection', (socket: Socket) => {
//     console.log('A user connected');

//     socket.on('taskCreated', async (taskData) => {
//       const task = new Task({
//         ...taskData,
//         _id: undefined
//       });
//       await task.save();
//       io.emit('taskCreated', task);
//     });

//     socket.on('taskUpdated', async (taskData) => {
//       const task = await Task.findByIdAndUpdate(taskData._id, taskData, { new: true });
//       io.emit('taskUpdated', task);
//     });

//     socket.on('taskDeleted', async (taskId) => {
//       await Task.findByIdAndDelete(taskId);
//       io.emit('taskDeleted', taskId);
//     });

//     socket.on('disconnect', () => {
//       console.log('A user disconnected');
//     });
//   });
// };
