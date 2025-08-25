import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import ClerkWebhooks from "./controllers/ClerkWebHooks.js";



dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(clerkMiddleware());
app.use(express.json());


app.use("/api/clerk", ClerkWebhooks)

// Routes
app.get("/", (req, res) => res.send("API is working!"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
