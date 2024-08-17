import React from 'react';
import { Box, Text, Editable, EditableInput, EditablePreview, IconButton, useEditableControls } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { IUser } from '~users/types';

interface UserHeaderProps {
  user: IUser;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: boolean;
}

const EditableControls: React.FC = () => {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps } = useEditableControls();
  return isEditing ? (
    <Box>
      <IconButton aria-label="Save" icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton aria-label="Cancel" icon={<CloseIcon />} {...getCancelButtonProps()} />
    </Box>
  ) : null;
};

export const Header: React.FC<UserHeaderProps> = ({ user, onInputChange, isDisabled }) => {
  return (
    <Box mb={4}>
      <Text fontSize="2xl" fontWeight="bold">{user.fullName}</Text>
      <Editable defaultValue={user.email} isDisabled={isDisabled}>
        <EditablePreview />
        <EditableInput name="email" onChange={onInputChange} />
        <EditableControls />
      </Editable>
      <Text fontSize="md">{user.username}</Text>
    </Box>
  );
};
