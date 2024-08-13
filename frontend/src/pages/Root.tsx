import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, Flex, Spinner } from '@chakra-ui/react';
import Header from '~components/navigation/Header';
import Sidebar from '~components/navigation/Sidebar';

export const AppRoot = () => {
  const location = useLocation();
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Flex direction="row" flex="1">
        <Sidebar />
        <Box ml={{ base: 0, md: 60 }} p="4" flex="1">
          <Suspense
            fallback={
              <div className="flex size-full items-center justify-center">
                <Spinner size="xl" />
              </div>
            }
          >
            <ErrorBoundary
              key={location.pathname}
              fallback={<div>Something went wrong!</div>}
            >
              <Outlet />
            </ErrorBoundary>
          </Suspense>
        </Box>
      </Flex>
    </Flex>
  );
};