import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from '~pages/Dashboard';
import LoginPage from '~pages/auth/LoginPage';
import RegisterPage from '~pages/auth/RegisterPage';
import AuthWrapper from '~components/auth/AuthWrapper';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: (
      <AuthWrapper>
        <Dashboard />
      </AuthWrapper>
    ),
  },
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
