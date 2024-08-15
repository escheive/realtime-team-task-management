import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  authToken: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('authToken'));

  const isAuthenticated = !!authToken;

  const login = (token: React.SetStateAction<string | null>) => {
    if (token && typeof token == 'string') {
      localStorage.setItem('authToken', token);
      setAuthToken(token);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      console.log(jwtDecode(token))
    }

    setAuthToken(token);
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  };

  return context;
}
