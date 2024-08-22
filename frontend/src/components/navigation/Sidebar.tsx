import { Box, Stack, IconButton } from "@chakra-ui/react";
import NavLink from "./NavLink";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const LINKS = [
  { to: '/', label: 'Dashboard' },
  { to: '/calendar', label: 'Calendar' },
  { to: '/tasks', label: 'Tasks' },
  { to: '/users', label: 'Users' },
];

const Sidebar = ({ isOpen, onOpen, onClose }: { isOpen: boolean, onOpen: () => void, onClose: () => void }) => {
  return (
    <>
      <Box
        position="fixed"
        top="0"
        left={isOpen ? "0" : "-250px"} // Move out of view when closed
        height="100vh"
        width="250px"
        bg="gray.700"
        transition="left 0.3s ease" // Smooth transition for sliding effect
        zIndex="1100"
      >

        {/* Hide content when sidebar is closed */}
        <Box display={isOpen ? "block" : "none"}>
          <Stack spacing={4} mt={4}>
            {LINKS.map((link) => (
              <NavLink to={link.to}>{link.label}</NavLink>
            ))}
            {/* <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/tasks">Tasks</NavLink>
            <NavLink to="/users">Users</NavLink> */}
          </Stack>
        </Box>
      </Box>

      {/* Sidebar Toggle Button */}
      <IconButton
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        icon={isOpen ? <ArrowLeftIcon /> : <ArrowRightIcon />}
        onClick={isOpen ? onClose : onOpen}
        position="fixed"
        left={isOpen ? "250px" : "0"} // Position button based on sidebar state
        top="50%"
        transform="translateY(-50%)"
        transition="left 0.3s ease" // Smooth transition for button
        zIndex="1200" // Ensure button is above other content
        borderRadius="md"
        bg="blue.500"
        color="white"
        _hover={{ bg: "blue.600" }} // Color change on hover
        _active={{ bg: "blue.700" }} // Color change on active state
        css={{ // Set with css to allow size to dip below chakra button min
          width: "5vw",
          height: "70px",
          minWidth: "30px",
          maxWidth: "40px",
          minHeight: "70px",
          transform: isOpen ? "translateX(-50%)" : "translateX(0)", // Close button straddles sidebar
        }}
      />
    </>
  );
};

export default Sidebar;
