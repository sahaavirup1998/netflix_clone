import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World 2!");
});


app.listen(PORT, () => {
    connectDB();
  console.log(`Server is running on port http://localhost:${PORT}`);
});