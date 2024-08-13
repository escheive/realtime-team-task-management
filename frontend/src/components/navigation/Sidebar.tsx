import { Box, Stack, useColorModeValue } from '@chakra-ui/react';
import NavLink from './NavLink';

const Sidebar = () => {
  return (
    <Box
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <Stack spacing={4} mt={4}>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </Stack>
    </Box>
  );
};

export default Sidebar;
