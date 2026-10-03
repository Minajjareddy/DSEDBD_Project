const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Reminders API working",
        reminders: []
    });
});

router.post("/", (req, res) => {
    res.status(201).json({
        message: "Reminder added successfully",
        reminder: req.body
    });
});

module.exports = router;