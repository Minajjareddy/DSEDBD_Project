const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Activities API working",
        activities: []
    });
});

router.post("/", (req, res) => {
    res.status(201).json({
        message: "Activity added successfully",
        activity: req.body
    });
});

module.exports = router;