
export const taskRoutes = [
  {
    path: '/tasks',
    lazy: async () => {
      const { TasksPage } = await import('~tasks/routes');
      return { Component: TasksPage };
    }
  },
  {
    path: '/tasks/:status',
    lazy: async () => {
      const { TaskListPage } = await import('~tasks/routes/TaskListPage');
      return { Component: TaskListPage };
    }
  }
];
