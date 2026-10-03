const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "AI Health Assistant API working"
    });
});

router.post("/", (req, res) => {
    res.json({
        message: "AI request received",
        data: req.body
    });
});

module.exports = router;