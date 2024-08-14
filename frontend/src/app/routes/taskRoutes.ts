
export const taskRoutes = [
  {
    path: '/tasks',
    lazy: async () => {
      const { TasksPage } = await import('~pages/tasks');
      return { Component: TasksPage };
    }
  },
  {
    path: '/tasks/:status',
    lazy: async () => {
      const { TaskListPage } = await import('~pages/tasks/TaskListPage');
      return { Component: TaskListPage };
    }
  }
];
