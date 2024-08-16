import React, { useEffect, useState } from 'react';
import { Box, useDisclosure, Button } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { ITask } from '~tasks/types';
import { updateTask } from '~tasks/api';
import { isEqual } from 'lodash';
import { useTaskContext } from '~/features/tasks/context';
import { useUser } from '~/features/users/context/UserContext';
import { TaskHeader } from '~tasks/components/taskDetails/TaskHeader';
import { TaskDetailsForm } from '~tasks/components/taskDetails/TaskDetailsForm';
import { ActivityLog } from '~tasks/components/taskDetails/ActivityLog';
import { Attachments } from '~tasks/components/taskDetails/Attachments';

export const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { paginatedTasks } = useTaskContext();
  const [editedTask, setEditedTask] = useState<ITask | null>(null);
  const [task, setTask] = useState<ITask | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newAttachmentUrl, setNewAttachmentUrl] = useState('');
  const [newAttachmentName, setNewAttachmentName] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const foundTask = paginatedTasks.tasks.find((task) => task._id === id);
    if (foundTask) {
      setEditedTask(foundTask);
      setTask({ ...foundTask });
    } else {
      navigate('/tasks');
    }
  }, [id, paginatedTasks.tasks, navigate]);

  useEffect(() => {
    // Compare original task to edited task for changes
    setIsEditing(!isEqual(task, editedTask));
  }, [task, editedTask]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editedTask) {
      setEditedTask({ ...editedTask, [name]: value });
    }
  };

  // Detect what was updated on task for activity log tracking
  const detectChanges = (original: ITask, updated: ITask) => {
    const changes: string[] = [];

    if (original.title !== updated.title) changes.push(`Title changed from "${original.title}" to "${updated.title}"`);

    if (original.description !== updated.description) changes.push(`Description changed from "${original.description}" to "${updated.description}"`);

    if (original.status !== updated.status) changes.push(`Status changed from "${original.status}" to "${updated.status}"`);
    
    if (changes.length == 0) {
      return false
    }

    return changes;
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing && editedTask) {
      handleSaveChanges();
    }
  }

  const handleSaveChanges = async () => {
    setIsSaving(true);

    if (!task || !editedTask) {
      setIsSaving(false);
      return;
    }

    const changes = detectChanges(task, editedTask);

    if (!changes) {
      setIsSaving(false);
      return;
    }

    try {

      await updateTask({
        ...editedTask,
        activityLog: [
          {
            user: user.email,
            action: `Updated task: ${changes.join(', ')}`,
            timestamp: new Date(),
          },
          ...editedTask.activityLog
        ]
      });

      setTask({ ...editedTask })
      setIsSaving(false);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  }

  const handleAddAttachment = () => {
    if (newAttachmentUrl && newAttachmentName) {
      const updatedAttachments = [...(editedTask?.attachments || []), { filename: newAttachmentName, url: newAttachmentUrl }];
      setEditedTask({ ...editedTask!, attachments: updatedAttachments });
      onClose();
      setNewAttachmentUrl('');
      setNewAttachmentName('');
    }
  };

  const handleRemoveAttachment = (index: number) => {
    if (!editedTask?.attachments) return;

    const updatedAttachments = editedTask?.attachments.filter((_, i) => i !== index);
    setEditedTask({ ...editedTask!, attachments: updatedAttachments });
  };

  return (
    <Box p={6} maxW="800px" mx="auto">
      {task && editedTask && (
        <Box>
          <TaskHeader
            task={editedTask!}
            onInputChange={handleInputChange}
          />

          <TaskDetailsForm 
            task={editedTask!} 
            onInputChange={handleInputChange} 
          />

          <Attachments
            attachments={editedTask.attachments}
            newAttachmentUrl={newAttachmentUrl}
            newAttachmentName={newAttachmentName}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            setNewAttachmentUrl={setNewAttachmentUrl}
            setNewAttachmentName={setNewAttachmentName}
            handleAddAttachment={handleAddAttachment}
            handleRemoveAttachment={handleRemoveAttachment}
          />

          <ActivityLog activityLog={task.activityLog} />

          <Box mt={4}>
            <Button 
              colorScheme="blue" 
              onClick={handleSaveChanges} 
              isDisabled={!isEditing}
              mr={2}
            >
              Save Changes
            </Button>
            <Button 
              colorScheme="red" 
              onClick={handleCancel}
              isDisabled={!isEditing}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};