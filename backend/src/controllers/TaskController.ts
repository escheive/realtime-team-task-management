import { Request, Response } from 'express';
import { Task, TaskStatus } from '../models/Task';
import { taskNamespace } from '../sockets';

// Query all tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    // Extract page and limit from query params, with default values
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;

    // Calculate start index of the tasks
    const startIndex = (page - 1) * limit;

    // Fetch tasks with pagination
    const tasks = await Task.find()
      .skip(startIndex)
      .limit(limit);

    // Return total number of tasks for client side pagination
    const totalTasks = await Task.countDocuments();

    res.status(200).json({
      totalTasks,
      currentPage: page,
      totalPages: Math.ceil(totalTasks / limit),
      tasks
    });
  } catch (error) {
    console.error('Error retrieving tasks:', error);
    res.status(500).json({ message: 'Error retrieving tasks' });
  }
};

// Query tasks with multiple parameters
export const queryTasks = async (req: Request, res: Response) => {
  try {
    const { assignedTo, createdBy, status, createdAfter, tag } = req.query;

    const query: any = {};

    if (assignedTo) {
      query.assignedTo = assignedTo;
    }
    if (createdBy) {
      query.createdBy = createdBy;
    }
    if (status) {
      query.status = status;
    }
    if (createdAfter) {
      query.createdAt = { $gte: new Date(createdAfter as string) };
    }
    if (tag) {
      query.tags = { $in: [tag] };
    }

    const tasks = await Task.find(query);
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error querying tasks:', error);
    res.status(500).json({ message: 'Error querying tasks' });
  }
};


// Get incomplete task count
export const getTaskStatusCounts = async (req: Request, res: Response) => {
  try {
    // Count tasks for each status
    const unassignedCount = await Task.countDocuments({ status: TaskStatus.UNASSIGNED });
    const incompleteCount = await Task.countDocuments({ status: TaskStatus.INCOMPLETE });
    const inProgressCount = await Task.countDocuments({ status: TaskStatus.IN_PROGRESS });

    // Respond with the counts
    res.status(200).json({
      unassigned: unassignedCount,
      incomplete: incompleteCount,
      inProgress: inProgressCount,
    });
  } catch (error) {
    console.error('Error retrieving task count:', error);
    res.status(500).json({ message: 'Error retrieving task count' });
  }
};

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    const task = new Task(req.body);
    await task.save();

    taskNamespace.emit('taskCreated', task);

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Error creating task' });
  }
};

// Update a task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    taskNamespace.emit('taskUpdated', task);

    res.status(200).json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Error updating task' });
  }
};

// Delete task by id
export const deleteTask = async (req: Request, res: Response) => {
  try {
    console.log('Deleting task from db:', req.params.id);
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    taskNamespace.emit('taskDeleted', task._id);

    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Error deleting task' });
  }
};
