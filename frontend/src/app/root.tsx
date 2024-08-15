import { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '~components/navigation/Header';
import Sidebar from '~components/navigation/Sidebar';

import { Box, Spinner, useDisclosure } from '@chakra-ui/react';

export const AppRoot = () => {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  let lastScrollY = 0;

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > lastScrollY) {
      setIsScrollingDown(true);
    } else {
      setIsScrollingDown(false);
    }
    lastScrollY = scrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box display="flex" minH="100vh">
      <Sidebar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Box flex="1" ml={isOpen ? '250px' : '0'} transition="margin-left 0.2s">
        <Header isScrollingDown={isScrollingDown} />
        <Box as="main" mt="60px" p="4">
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
      </Box>
    </Box>
  );
};
