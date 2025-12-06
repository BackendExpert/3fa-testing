import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import csurf from "csurf";
import { rateLimiter } from "./middlewares/rateLimit.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// CSRF
// app.use(csurf({ cookie: true }));

// Rate limit
app.use("/api/auth", rateLimiter);

app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log("Server running on 5000"));
