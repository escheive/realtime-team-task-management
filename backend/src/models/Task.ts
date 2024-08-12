import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  status: string;
  createdBy: string;
  assignedTo: string;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'To Do' },
  createdBy: { type: String, required: true },
  assignedTo: { type: String }
}, {
  timestamps: true
});

export const Task = mongoose.model<ITask>('Task', TaskSchema);
