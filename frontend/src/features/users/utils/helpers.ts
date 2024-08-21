import { IUser } from "~users/types";

export const getUsernameById = (users: IUser[], id: string | undefined) => {
  const user = users.find(user => user._id === id);
  return user ? user.username : 'Unassigned';
};