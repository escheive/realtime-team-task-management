import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '~utils/axiosConfig';
import { useAuth } from '~auth/context/AuthContext';

interface UserContextType {
  user: any;
  loading: boolean;
  error: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { authToken } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log(user)

  useEffect(() => {
    const fetchUserData = async () => {
      if (authToken) {
        try {
          const response = await axios.get('/api/users/me');
          setUser(response.data);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError('Error fetching user data');
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    };

    const fetchAllUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        console.log('Users:', response.data)
      } catch (err) {
        console.error('Error fetching all user data:', err);
        setError('Error fetching all user data');
      }
    };

    fetchUserData();
  }, [authToken]);

  return (
    <UserContext.Provider value={{ user, loading, error }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
