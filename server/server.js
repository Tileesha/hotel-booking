// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware } from '@clerk/express'
// import ClerkWebhooks from "./controllers/ClerkWebhooks.js";
//  // if controllers is inside server/




// dotenv.config();

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(clerkMiddleware());
// app.use(express.json());


// app.use("/api/clerk", ClerkWebhooks)

// // Routes
// app.get("/", (req, res) => res.send("API is working!"));

// // Start server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import ClerkWebhooks from "./controllers/ClerkWebhooks.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(clerkMiddleware());
app.use(express.json());

// Routes
app.use("/api/clerk", ClerkWebhooks); // webhook route

app.get("/", (req, res) => res.send("API is working!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

