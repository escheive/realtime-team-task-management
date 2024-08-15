import React from 'react';
import { Spinner } from '@chakra-ui/react';

import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '~auth/context/AuthContext';
import { TaskProvider } from '~/features/tasks/context';
import { UserProvider } from '~/features/users/context/UserContext';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {

  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <Spinner size="xl" />
        </div>
      }
    >
      <ChakraProvider>
        <AuthProvider>
          <UserProvider>
            <TaskProvider>
              {children}
            </TaskProvider>
          </UserProvider>
        </AuthProvider>
      </ChakraProvider>
    </React.Suspense>
  );
};