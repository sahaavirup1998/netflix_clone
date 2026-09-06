import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/db.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

// Middlewares

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// Routes

app.get("/", (req, res) => {
  res.send("Hello World 2!");
});

app.use("/api/users", userRoutes);

// Start Server

app.listen(PORT, async () => {
  await connectDB();

  console.log(`Server is running on http://localhost:${PORT}`);
});
