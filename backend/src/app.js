import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import seedAdmin from "./seeder/admin.seed.js";
import connectDB from "./config/db.js";

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Create Express app
const app = express();

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors());

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Seed admin user
seedAdmin();

// API routes
app.use("/api", routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Error handler middleware
app.use(errorHandler);

export default app;
