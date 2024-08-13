import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, useColorModeValue } from '@chakra-ui/react';

interface NavLinkProps {
  to: string;
  children: ReactNode;
}

const NavLink = ({ to, children }: NavLinkProps) => {
  return (
    <Link
      as={RouterLink}
      to={to}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
    >
      {children}
    </Link>
  );
};

export default NavLink;
