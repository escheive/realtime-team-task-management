import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  socketId: { type: String, required: true },
  isOnline: { type: Boolean, default: true },
});

export const User = mongoose.model('User', userSchema);
