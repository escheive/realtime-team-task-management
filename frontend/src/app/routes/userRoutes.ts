
export const userRoutes = [
  {
    path: '/user',
    lazy: async () => {
      const { ProfilePage } = await import('~users/routes');
      return { Component: ProfilePage };
    }
  },
  {
    path: '/user/settings',
    lazy: async () => {
      const { SettingsPage } = await import('~users/routes');
      return { Component: SettingsPage };
    }
  },
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
  {
    path: '/users/:id',
    lazy: async () => {
      const { UserDetailsPage } = await import('~users/routes');
      return { Component: UserDetailsPage };
    }
  }
];
