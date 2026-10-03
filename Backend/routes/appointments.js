const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Appointments API working",
        appointments: []
    });
});

router.post("/", (req, res) => {
    res.status(201).json({
        message: "Appointment added successfully",
        appointment: req.body
    });
});

module.exports = router;