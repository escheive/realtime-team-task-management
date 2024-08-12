import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('authToken');
  return Boolean(token); // Check if the token exists
};

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
