import React from 'react';
import { Spinner } from '@chakra-ui/react';

import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '~auth/context/AuthContext';
import { TaskProvider } from '~/features/tasks/context';
import { UserProvider } from '~/features/users/context/UserContext';

type AppProviderProps = {
  children: React.ReactNode;
};

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        _disabled: {
          bg: "gray.400",
          cursor: "not-allowed",
        },
      },
    },
  },
});

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
              {children}
            </TaskProvider>
          </UserProvider>
        </AuthProvider>
      </ChakraProvider>
    </React.Suspense>
  );
};