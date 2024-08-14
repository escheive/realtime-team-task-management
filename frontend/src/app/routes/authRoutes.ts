
export const authRoutes = [
  {
    path: '/auth/login',
    lazy: async () => {
      const { LoginPage } = await import('~auth/routes/Login');
      return { Component: LoginPage };
    }
  },
  {
    path: '/auth/register',
    lazy: async () => {
      const { RegisterPage } = await import('~auth/routes/Register');
      return { Component: RegisterPage };
    }
  }
];
