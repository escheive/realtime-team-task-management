import React from 'react';
import { Spinner } from '@chakra-ui/react';

import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '~auth/context/AuthContext';
import { TaskProvider } from '~/features/tasks/context';
import { UserProvider } from '~users/context';
import { PresenceProvider } from '~context/PresenceContext';
import theme from '~/theme';

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
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <UserProvider>
            <TaskProvider>
              <PresenceProvider>
                {children}
              </PresenceProvider>
            </TaskProvider>
          </UserProvider>
        </AuthProvider>
      </ChakraProvider>
    </React.Suspense>
  );
};