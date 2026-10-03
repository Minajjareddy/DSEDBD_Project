const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "History API working",
        history: []
    });
});

router.post("/", (req, res) => {
    res.status(201).json({
        message: "History record added successfully",
        record: req.body
    });
});

module.exports = router;