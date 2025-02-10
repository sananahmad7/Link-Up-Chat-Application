import express from "express";
const app = express();
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDB } from "./libs/db.js";
import cookieParser from "cookie-parser";

dotenv.config();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(cookieParser());

const Port = process.env.PORT;

//Middleware to allow to extract json data

app.listen(5001, () => {
  console.log("Server is running on port", Port);
  connectDB();
});
