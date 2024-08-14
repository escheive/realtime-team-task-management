import React from 'react';
import { Spinner } from '@chakra-ui/react';

import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from '~context/AuthContext'

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
      <AuthProvider>
        <ChakraProvider>
          {children}
        </ChakraProvider>
      </AuthProvider>
    </React.Suspense>
  );
};