
export const taskRoutes = [
  {
    path: '/tasks',
    lazy: async () => {
      const { TasksPage } = await import('~tasks/routes');
      return { Component: TasksPage };
    }
  },
  {
    path: '/tasks/new',
    lazy: async () => {
      const { CreateTaskPage } = await import('~tasks/routes');
      return { Component: CreateTaskPage };
    }
  },
  {
    path: '/tasks/:id',
    lazy: async () => {
      const { TaskDetailPage } = await import('~tasks/routes');
      return { Component: TaskDetailPage };
    }
  },
  {
    path: '/tasks/status/:status',
    lazy: async () => {
      const { TaskListPage } = await import('~tasks/routes');
      return { Component: TaskListPage };
    }
  }
];
