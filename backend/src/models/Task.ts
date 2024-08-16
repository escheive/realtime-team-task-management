import mongoose, { Schema, Document } from 'mongoose';

// Enum for task statuses
export enum TaskStatus {
  UNASSIGNED = 'Unassigned',
  INCOMPLETE = 'Incomplete',
  IN_PROGRESS = 'In Progress',
  CANCELLED = 'Cancelled',
  COMPLETE = 'Complete',
}

export enum TaskPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  URGENT = 'Urgent',
}

export interface IActivityLog {
  user: string;       // User who performed the action
  action: string;     // Description of the action
  comment: string;    // Optional comment left by user
  timestamp: Date;    // When the action was performed
}

// Interface for TS
export interface ITask extends Document {
  title: string;
  description: string;
  status: TaskStatus;
  createdBy: string;
  assignedTo?: string;
  dueDate?: Date;
  priority?: TaskPriority;
  tags?: string[];
  activityLog: IActivityLog[];
  attachments?: {
    filename: string;
    url: string;
  }[];
  reminder?: {
    date: Date;
    message: string;
  };
  completedAt?: Date;
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String, 
    enum: Object.values(TaskStatus),
    default: TaskStatus.UNASSIGNED
  },
  createdBy: { 
    type: String, 
    required: true 
  },
  assignedTo: { type: String },
  dueDate: { type: Date },
  priority: { 
    type: String, 
    enum: Object.values(TaskPriority) 
  },
  tags: [{ type: String }],
  activityLog: [
    {
      user: { type: String, required: true },
      action: { type: String, required: true },
      comment: { type: String },
      timestamp: { type: Date, default: Date.now }
    }
  ],
  attachments: [{
    filename: { type: String },
    url: { type: String }
  }],
  reminder: {
    date: { type: Date },
    message: { type: String }
  },
  completedAt: { type: Date },
}, {
  timestamps: true // Auto adds createdAt and updatedAt timestamps
});

export const Task = mongoose.model<ITask>('Task', TaskSchema);
