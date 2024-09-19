import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

class AuthService {
  public async login(
    email: string,
    password: string
  ): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const accessToken = this.generateToken(user, "15m");
    const refreshToken = this.generateToken(user, "7d");

    user.refreshToken = refreshToken;
    await user.save();

    return { user, accessToken, refreshToken };
  }

  public generateToken(user: IUser, expiresIn: string): string {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn,
    });
  }
}

export default new AuthService();
