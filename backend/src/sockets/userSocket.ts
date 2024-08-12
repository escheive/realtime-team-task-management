import { Server as SocketIOServer, Socket } from 'socket.io';
import { User } from '../models/User';

export const setupUserSockets = (io: SocketIOServer) => {
  io.on('connection', async (socket: Socket) => {
    console.log('A user connected');

    const username = socket.handshake.query.username as string;

    // Create or update the user in the database
    let user = await User.findOne({ username });
    if (user) {
      user.socketId = socket.id;
      user.isOnline = true;
    } else {
      user = new User({ username, socketId: socket.id, isOnline: true });
    }
    await user.save();

    // Emit to all clients that a user connected
    io.emit('userConnected', { username, isOnline: true });

    socket.on('disconnect', async () => {
      console.log('A user disconnected');
      await User.findOneAndUpdate({ socketId: socket.id }, { isOnline: false });

      // Emit to all clients that a user disconnected
      io.emit('userDisconnected', { username, isOnline: false });
    });
  });
};
