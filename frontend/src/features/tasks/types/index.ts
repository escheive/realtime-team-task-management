export interface ITask {
  _id: string;             // Unique identifier
  title: string;           // Title
  description?: string;    // Optional description
  status: TaskStatus;      // Current status of task
  createdBy: string;       // User ID or name who created
  assignedTo?: string;     // Optional user ID or name assigned
  dueDate?: Date;          // Optional due date
  priority?: TaskPriority; // Priority of the task
  tags?: string[];         // Optional tags
  activityLog?: {          // Optional activity log
    timestamp: Date;
    user: string;
    action: string;
    comment?: string;
  };
  attachments?: {          // Option for attachments
    filename: string;
    url: string;
  }[];
  reminder?: {             // Option for reminders
    date: Date;
    message: string;
  };
  completedAt?: Date;      // When task was completed
  createdAt?: Date;        // Optional timestamp for when the task was created
  updatedAt?: Date;        // Optional timestamp for when the task was last updated
}

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
