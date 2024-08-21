import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from '~utils/axiosConfig';
import { useAuth } from '~auth/context/AuthContext';
import { IUser, PaginatedUsers } from '~users/types';
import { getUsers } from '../api';

interface UserContextType {
  user: IUser | null;
  loading: boolean;
  error: string | null;
  paginatedUsers: PaginatedUsers;
  // fetchUsers: (page: number, limit: number, filters: Record<string, string>) => Promise<void>;
  fetchAllUsers: (page: number, limit: number, filters: Record<string, string>) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { authToken } = useAuth();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginatedUsers, setPaginatedUsers] = useState<PaginatedUsers>({
    users: [],
    totalPages: 0,
    currentPage: 1,
    totalUsers: 0
  });

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

    fetchUserData();
  }, [authToken]);

  const fetchAllUsers = useCallback(async (page: number, limit: number, filters: Record<string, string>) => {
    setLoading(true);

    try {
      const response = await getUsers({
        ...filters,
        page,
        limit
      });
  
      setPaginatedUsers(response);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Error fetching users');
    } finally {
      setLoading(false);
    }
  }, []);

  // const fetchUsers = useCallback(async (page: number, limit: number, filters: Record<string, string>) => {
  //   setLoading(true);
  //   try {
  //     const response = await getUsers({
  //       ...filters,
  //       page,
  //       limit
  //     });

  //     setPaginatedUsers(response);
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //     setError('Error fetching users');
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  useEffect(() => {
    if (!user || paginatedUsers.totalUsers > 0) return;
    fetchAllUsers(1, 100, {});
  }, [paginatedUsers]);

  return (
    <UserContext.Provider value={{ user, loading, error, paginatedUsers, fetchAllUsers }}>
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
