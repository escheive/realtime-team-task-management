export interface ITask {
  _id: string;              // Unique identifier for the task
  title: string;           // Title of the task
  description?: string;    // Optional description of the task
  status: string;          // Current status of the task (e.g., 'To Do', 'In Progress', 'Done')
  createdBy: string;       // User ID or name who created the task
  assignedTo?: string;     // Optional user ID or name assigned to the task
  dueDate?: Date;          // Optional due date for the task
  createdAt?: Date;        // Optional timestamp for when the task was created
  updatedAt?: Date;        // Optional timestamp for when the task was last updated
}
