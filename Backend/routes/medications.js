const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Medications API working",
        medications: []
    });
});

router.post("/", (req, res) => {
    res.status(201).json({
        message: "Medication added successfully",
        medication: req.body
    });
});

module.exports = router;