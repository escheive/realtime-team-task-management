import { createBrowserRouter } from 'react-router-dom';
import { AppRoot } from '~app/root';
import { authRoutes } from './authRoutes';
import { taskRoutes } from './taskRoutes';
import { userRoutes } from './userRoutes';
import { calendarRoute, dashboardRoute, ProtectedRoute } from './miscRoutes';

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
      calendarRoute,
      ...taskRoutes,
      ...userRoutes,
    ]
  }
]);

export default router;
