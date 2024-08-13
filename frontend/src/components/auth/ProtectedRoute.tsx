import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '~context/AuthContext';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { authToken } = useAuth();
  // const isAuthenticated = !!localStorage.getItem('authToken');

  if (!authToken) {
    return (
      <Navigate
        to={`/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return children;
};