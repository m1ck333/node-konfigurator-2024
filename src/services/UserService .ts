import bcrypt from "bcryptjs";
import User, { IUser } from "../models/User";

class UserService {
  // Register a new user
  public async register(userData: Partial<IUser>): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(userData.password!, 10);
    const user = new User({ ...userData, password: hashedPassword });
    return user.save();
  }

  // Get current user info
  public async getUserById(userId: string): Promise<IUser | null> {
    return User.findById(userId);
  }

  // Get all users
  public async getAllUsers(): Promise<IUser[]> {
    return User.find();
  }

  // Update user information
  public async updateUser(
    userId: string,
    updateData: Partial<IUser>
  ): Promise<IUser | null> {
    return User.findByIdAndUpdate(userId, updateData, { new: true });
  }

  // Delete a user
  public async deleteUser(userId: string): Promise<void> {
    await User.findByIdAndDelete(userId);
  }
}

export default new UserService();
