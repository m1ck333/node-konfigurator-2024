import { IUser } from "../models/User";

export const sanitizeUser = (user: IUser) => {
  const { password: _, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
};

export const sanitizeUsers = (users: IUser[]) => {
  return users.map(sanitizeUser);
};
