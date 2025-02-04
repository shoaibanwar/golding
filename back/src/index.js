import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Database from "./config/db.js";
import userRoutes from "./domains/user/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database
await Database.connect();

// Routes
app.use("/user", userRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));