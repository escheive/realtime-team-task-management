import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

interface ActivityLogProps {
  activityLog: {
    action: string;
    timestamp: Date;
  }[];
}

export const ActivityLog: React.FC<ActivityLogProps> = ({ activityLog }) => {
  return (
    <Box mt={4}>
      <Text fontSize='lg' fontWeight='bold' mb={2}>Activity Log</Text>
      <VStack align='start' spacing={2}>
        {activityLog.map((log, index) => (
          <Box key={index} p={3} borderWidth={1} borderRadius='md' bg='gray.50'>
            <Text fontWeight='bold'>{log.action}</Text>
            <Text fontSize='sm' color='gray.500'>{new Date(log.timestamp).toLocaleString()}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
