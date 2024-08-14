import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from '~components/auth/ProtectedRoute';
import { WebSocketProvider } from '~context/WebSocketContext';
import { AppRoot } from '~pages/Root';

const router = createBrowserRouter([
  {
    path: '/auth/login',
    lazy: async () => {
      const { LoginPage } = await import('~auth/routes/Login')
      return { Component: LoginPage }
    }
  },
  {
    path: '/auth/register',
    lazy: async () => {
      const { RegisterPage } = await import('~auth/routes/Register')
      return { Component: RegisterPage }
    }
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <WebSocketProvider>
          <AppRoot />
        </WebSocketProvider>
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        lazy: async () => {
          const { Dashboard } = await import('~dashboard/routes')
          return { Component: Dashboard }
        }
      },
      {
        path: '/tasks',
        lazy: async () => {
          const { TasksPage } = await import('~pages/tasks')
          return { Component: TasksPage }
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
