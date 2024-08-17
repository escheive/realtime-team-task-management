
export const userRoutes = [
  {
    path: '/users',
    lazy: async () => {
      const { UsersPage } = await import('~users/routes');
      return { Component: UsersPage };
    }
  },
  {
    path: '/users/new',
    lazy: async () => {
      const { CreateUserPage } = await import('~users/routes');
      return { Component: CreateUserPage };
    }
  },
  // {
  //   path: '/users/:id',
  //   lazy: async () => {
  //     const { UserDetailPage } = await import('~users/routes');
  //     return { Component: UserDetailPage };
  //   }
  // }
];
