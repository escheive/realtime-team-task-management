import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { Dashboard } from '~pages/Dashboard';
// import AuthWrapper from '~components/auth/AuthWrapper';
import { ProtectedRoute } from '~components/auth/ProtectedRoute';
import { AppRoot } from '~pages/Root';

const router = createBrowserRouter([
  {
    path: '/login',
    lazy: async () => {
      const { LoginPage } = await import('~pages/auth/LoginPage')
      return { Component: LoginPage }
    }
  },
  {
    path: '/register',
    lazy: async () => {
      const { RegisterPage } = await import('~pages/auth/RegisterPage')
      return { Component: RegisterPage }
    }
  },
  {
    path: '/*',
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
      }
    ]
  },
  // {
  //   path: '/',
  //   element: (
  //     <AuthWrapper>
  //       <Dashboard />
  //     </AuthWrapper>
  //   ),
  // },
]);


const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
    // <Router>
    //   <Routes>
    //     <Route path="/login" element={<LoginPage />} />
    //     <Route path="/register" element={<RegisterPage />} />
    //     <Route 
    //       path="/" 
    //       element={
    //         <AuthWrapper>
    //           <Dashboard />
    //         </AuthWrapper>
    //       } 
    //     />
    //   </Routes>
    // </Router>
  );
};

export default App;
