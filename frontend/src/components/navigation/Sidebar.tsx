// components/Navigation/Sidebar.tsx
import { Box, Stack, Button } from '@chakra-ui/react';
import NavLink from './NavLink';

const Sidebar = ({ isOpen, onOpen, onClose }: { isOpen: boolean, onOpen: () => void, onClose: () => void }) => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      height="100vh"
      width={isOpen ? '250px' : '60px'}
      bg="gray.700"
      transition="width 0.2s"
      zIndex="999"
    >
      <Button onClick={isOpen ? onClose : onOpen} mt="4" ml="4">
        {isOpen ? 'Close' : 'Open'}
      </Button>
      <Stack spacing={4} mt={4}>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </Stack>
    </Box>
  );
};

export default Sidebar;
