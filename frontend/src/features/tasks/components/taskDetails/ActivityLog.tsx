import React from 'react';
import { Box, List, ListItem, ListIcon, Text } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';

interface ActivityLogProps {
  activityLog: Array<{ user: string, action: string, timestamp: Date, comment?: string }>;
}

export const ActivityLog: React.FC<ActivityLogProps> = ({ activityLog }) => (
  <Box>
    <Text fontSize='lg' fontWeight='bold' mb={4}>Activity Log</Text>
    <List maxH='400px' overflowY='auto' spacing={3} mb={6}>
      {activityLog.map((log, index) => (
        <ListItem key={index}>
          <ListIcon as={CalendarIcon} color='gray.500' />
          {log.user} {log.action} on {new Date(log.timestamp).toLocaleString()}
          {log.comment && <Text ml={8}>{log.comment}</Text>}
        </ListItem>
      ))}
    </List>
  </Box>
);
