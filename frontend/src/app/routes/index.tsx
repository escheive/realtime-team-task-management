import { createBrowserRouter } from 'react-router-dom';
import { WebSocketProvider } from '~context/WebSocketContext';
import { AppRoot } from '~pages/Root';
import { authRoutes } from './authRoutes';
import { taskRoutes } from './taskRoutes';
import { dashboardRoute, ProtectedRoute } from './miscRoutes';

const router = createBrowserRouter([
  ...authRoutes,
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
      dashboardRoute,
      ...taskRoutes,
    ]
  }
]);

export default router;
