import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(localStorage.getItem('authToken'));

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
    setAuthToken(token);
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
