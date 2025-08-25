// // server/controllers/ClerkWebhooks.js
import express from "express";
import User from "../models/User.js";
import { Webhook } from "svix";

const router = express.Router();

// POST /api/clerk
router.post("/", async (req, res) => {
  try {
    // Initialize Svix webhook verifier
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Collect headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Verify webhook payload
    await whook.verify(JSON.stringify(req.body), headers);

    const { data, type } = req.body;

    // Prepare user data
    const userData = {
      _id: data.id, // make sure this exists
      email: data.email_addresses?.[0]?.email_address || "",
      username: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url || "",
    };

    // Handle event type
    switch (type) {
      case "user.created":
        await User.create(userData);
        console.log("✅ User created:", userData);
        break;
      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        console.log("ℹ️ User updated:", userData);
        break;
      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        console.log("🗑️ User deleted:", data.id);
        break;
      default:
        console.log("⚠️ Unhandled event type:", type);
        break;
    }

    res.status(200).json({ success: true, message: "Webhook received" });
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
