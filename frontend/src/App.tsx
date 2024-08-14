import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from '~components/auth/ProtectedRoute';
import { AppRoot } from '~pages/Root';

const router = createBrowserRouter([
  {
    path: '/auth/login',
    lazy: async () => {
      const { LoginPage } = await import('~pages/auth/LoginPage')
      return { Component: LoginPage }
    }
  },
  {
    path: '/auth/register',
    lazy: async () => {
      const { RegisterPage } = await import('~pages/auth/RegisterPage')
      return { Component: RegisterPage }
    }
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppRoot />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        lazy: async () => {
          const { Dashboard } = await import('~pages/Dashboard')
          return { Component: Dashboard }
        }
      },
      {
        path: '/tasks/:status',
        lazy: async () => {
          const { TaskListPage } = await import('~pages/tasks/TaskListPage')
          return { Component: TaskListPage }
        }
      },
    ]
  },
]);


const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
