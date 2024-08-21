import React, { useState } from 'react';
import { Box, Heading, Stack, Text, VStack, Button, Avatar } from '@chakra-ui/react';
import { useUser } from '~users/context';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

export const UsersPage: React.FC = () => {
  const navigate = useNavigate();
  const { paginatedUsers } = useUser();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= paginatedUsers.totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Box p={4}>
      <Heading mb={4}>All Users</Heading>
      <Button
        as={RouterLink}
        to="/users/new"
        colorScheme="blue"
        variant="solid"
        size="lg"
        mb={4}
      >
        Create New User
      </Button>
      <Stack spacing={4}>
        {paginatedUsers.users.length === 0 ? (
          <Text>No users available.</Text>
        ) : (
          paginatedUsers.users.map((user) => (
            <Box
              key={user._id}
              p={4}
              borderWidth={1}
              borderRadius="md"
              boxShadow="md"
              bg="white"
              onClick={() => navigate(`/users/${user._id}`)}
            >
              <VStack align="start">
                <Avatar
                  name={user.fullName}
                  src={user.profilePicture}
                  boxSize="100px"
                />
                <Heading size="md">{user.fullName}</Heading>
                <Text>Email: {user.email}</Text>
                <Text>Phone: {user.phoneNumber || 'N/A'}</Text>
                <Text>Status: {user.status}</Text>
                <Text>Last Login: {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}</Text>
                <Text>Online: {user.isOnline ? 'Yes' : 'No'}</Text>
              </VStack>
            </Box>
          ))
        )}
      </Stack>

      {/* Pagination Controls */}
      <Box mt={4}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          isDisabled={currentPage <= 1}
        >
          Previous
        </Button>
        <Text mx={4} display="inline">Page {currentPage} of {paginatedUsers.totalPages}</Text>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          isDisabled={currentPage >= paginatedUsers.totalPages}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};
