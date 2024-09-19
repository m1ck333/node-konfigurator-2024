import express, { Application } from "express";
import i18next from './i18n';
import i18nextMiddleware from 'i18next-http-middleware'
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import generalRoutes from "./routes/index";
import { errorHandler } from "./middleware/errorHandler";
import { jwtAuth } from "./middleware/JWTAuthentication";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

app.use(bodyParser.json());
app.use(i18nextMiddleware.handle(i18next));

app.use("/api/auth", authRoutes);
app.use("/api/users", jwtAuth, userRoutes)
app.use("/api", generalRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
