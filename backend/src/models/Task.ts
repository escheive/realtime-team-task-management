import mongoose, { Schema, Document } from 'mongoose';

// Interface for TS
export interface ITask extends Document {
  title: string;
  description: string;
  status: string;
  createdBy: string;
  assignedTo?: string; // Optional
  dueDate?: Date; // Optional
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String, 
    default: 'To Do' 
  },
  createdBy: { 
    type: String, 
    required: true 
  },
  assignedTo: { type: String },
  dueDate: { type: Date },
}, {
  timestamps: true // Auto adds createdAt and updatedAt timestamps
});

export const Task = mongoose.model<ITask>('Task', TaskSchema);
