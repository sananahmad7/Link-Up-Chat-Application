import express from "express";
const app = express();
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./libs/db.js";
dotenv.config();
const Port = process.env.PORT;
app.use("/api/auth", authRoutes);

app.listen(5001, () => {
  console.log("Server is running on port", Port);
  connectDB();
});
