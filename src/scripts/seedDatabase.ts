import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    const adminPassword = await bcrypt.hash(
      process.env.ADMIN_INITIAL_PASSWORD!,
      10
    );
    const adminUser = new User({
      email: "admin@algreen.rs",
      password: adminPassword,
      name: "Admin",
      surname: "Konfigurator",
      role: "admin",
    });

    const userPassword = await bcrypt.hash("password1", 10);
    const regularUser = new User({
      email: "user1@example.com",
      password: userPassword,
      name: "User1",
      surname: "Example1",
      role: "user",
    });

    await adminUser.save();
    await regularUser.save();

    console.log("Admin and regular user seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
