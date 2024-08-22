import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~auth/context/AuthContext';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { authToken } = useAuth();

  if (!authToken) {
    navigate("/")
  }

  return children;
};

export const dashboardRoute = {
  path: '',
  lazy: async () => {
    const { Dashboard } = await import('~dashboard/routes');
    return { Component: Dashboard };
  }
}

export const calendarRoute = {
  path: '/calendar',
  lazy: async () => {
    const { CalendarPage } = await import('~calendar/routes');
    return { Component: CalendarPage }
  }
}

