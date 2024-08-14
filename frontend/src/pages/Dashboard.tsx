// import React from 'react';
// import TaskBoard from '../components/tasks/TaskBoard';

// export const Dashboard: React.FC = () => {
//   return (
//     <div className="dashboard">
//       <TaskBoard />
//     </div>
//   );
// };

import React, { useEffect, useState } from 'react';
import axios from "~utils/axiosConfig";
import { Box, Grid, Flex, Text } from '@chakra-ui/react';

export const Dashboard = () => {
  const [incompleteCount, setIncompleteCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchIncompleteCount = async () => {
      try {
        const response = await axios.get('/api/tasks/incomplete/count');
        setIncompleteCount(response.data.count);
      } catch (error) {
        console.error('Error fetching incomplete tasks count:', error);
      }
    };

    fetchIncompleteCount();
  }, []);

  return (
    <Box p={4}>
      {/* Top Sections */}
      <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={4}>
        {/* Data Breakdown */}
        <Box bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="lg" mb={2}>Data Breakdown</Text>
          <Box padding="4" borderWidth="1px" borderRadius="lg">
            <Text fontSize="lg" fontWeight="bold">Incomplete Tasks</Text>
            <Text fontSize="xl">{incompleteCount !== null ? incompleteCount : 'Loading...'}</Text>
          </Box>
        </Box>

        {/* Current Tasks */}
        <Box bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="lg" mb={2}>Current Tasks</Text>
          {/* tasks content here */}
        </Box>
      </Grid>

      {/* Bottom Sections */}
      <Flex direction={{ base: "column", md: "row" }} mt={4} gap={4}>
        {/* Section 1 */}
        <Box flex="1" bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="lg" mb={2}>Section 1</Text>
          {/* section 1 content here */}
        </Box>

        {/* Section 2 */}
        <Box flex="1" bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="lg" mb={2}>Section 2</Text>
          {/* section 2 content here */}
        </Box>

        {/* Section 3 */}
        <Box flex="1" bg="gray.100" p={4} borderRadius="md">
          <Text fontSize="lg" mb={2}>Section 3</Text>
          {/* section 3 content here */}
        </Box>
      </Flex>
    </Box>
  );
};
