console.log("SERVER.JS STARTED");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
require("./db");

// Routes
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const symptomRoutes = require("./routes/symptoms");
const medicationRoutes = require("./routes/medications");
const appointmentRoutes = require("./routes/appointments");
const activityRoutes = require("./routes/activities");
const reminderRoutes = require("./routes/reminders");
const historyRoutes = require("./routes/history");
const aiRoutes = require("./routes/ai");

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "AI Personal Health Assistant Backend is running",
        status: "success"
    });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/symptoms", symptomRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/reminders", reminderRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/ai", aiRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error("SERVER ERROR:", err);

    res.status(500).json({
        message: "Internal server error",
        error: err.message
    });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("========================================");
    console.log("AI PERSONAL HEALTH ASSISTANT");
    console.log("Backend Server");
    console.log("========================================");
    console.log(`Server running at http://localhost:${PORT}`);
    console.log("========================================");
});