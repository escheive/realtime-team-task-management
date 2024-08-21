import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from '@chakra-ui/react';
import { useAuth } from '~auth/context/AuthContext';
import { Link as RouterLink } from 'react-router-dom';
import { ChevronDownIcon } from '@chakra-ui/icons';

const UserMenu = () => {
  const { logout } = useAuth();

  return (
    <Menu>
      <MenuButton as={IconButton} icon={<Avatar size="sm" />} variant="link">
        <ChevronDownIcon />
      </MenuButton>
      <MenuList>
        <RouterLink to='/user'><MenuItem>Profile</MenuItem></RouterLink>
        <RouterLink to='/user/settings'><MenuItem>Settings</MenuItem></RouterLink>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
