import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from '@chakra-ui/react';
import { useAuth } from '~auth/context/AuthContext';
import { ChevronDownIcon } from '@chakra-ui/icons';

const UserMenu = () => {
  const { logout } = useAuth();

  return (
    <Menu>
      <MenuButton as={IconButton} icon={<Avatar size="sm" />} variant="link">
        <ChevronDownIcon />
      </MenuButton>
      <MenuList>
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
