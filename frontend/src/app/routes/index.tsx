import { createBrowserRouter } from 'react-router-dom';
import { AppRoot } from '~app/Root';
import { authRoutes } from './authRoutes';
import { taskRoutes } from './taskRoutes';
import { dashboardRoute, ProtectedRoute } from './miscRoutes';

const router = createBrowserRouter([
  ...authRoutes,
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppRoot />
      </ProtectedRoute>
    ),
    children: [
      dashboardRoute,
      ...taskRoutes,
    ]
  }
]);

export default router;
