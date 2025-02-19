import express from "express";
const app = express();
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./libs/db.js";
import cookieParser from "cookie-parser";
app.use(cookieParser());

dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const Port = process.env.PORT;

//Middleware to allow to extract json data

app.listen(5001, () => {
  console.log("Server is running on port", Port);
  connectDB();
});
