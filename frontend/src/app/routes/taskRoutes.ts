
export const taskRoutes = [
  {
    path: '/tasks',
    lazy: async () => {
      const { TasksPage } = await import('~tasks/routes');
      return { Component: TasksPage };
    }
  },
  {
    path: '/tasks/:id',
    lazy: async () => {
      const { TaskDetailPage } = await import('~tasks/routes/TaskDetailPage');
      return { Component: TaskDetailPage };
    }
  },
  {
    path: '/tasks/status/:status',
    lazy: async () => {
      const { TaskListPage } = await import('~tasks/routes/TaskListPage');
      return { Component: TaskListPage };
    }
  }
];
