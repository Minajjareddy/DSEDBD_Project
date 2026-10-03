const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../db");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {

    try {

        const {
            full_name,
            email,
            password
        } = req.body;

        if (!full_name || !email || !password) {
            return res.status(400).json({
                message: "Full name, email and password are required"
            });
        }

        const [existingUsers] = await db.execute(
            "SELECT user_id FROM users WHERE email = ?",
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await db.execute(
            `INSERT INTO users
            (full_name, email, password)
            VALUES (?, ?, ?)`,
            [
                full_name,
                email,
                hashedPassword
            ]
        );

        res.status(201).json({
            message: "Registration successful",
            user_id: result.insertId
        });

    } catch (error) {

        console.error("REGISTER ERROR:", error);

        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });

    }

});


// LOGIN
router.post("/login", async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const [users] = await db.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const user = users[0];

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                user_id: user.user_id,
                email: user.email,
                full_name: user.full_name
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.json({
            message: "Login successful",
            token: token,
            user: {
                user_id: user.user_id,
                full_name: user.full_name,
                email: user.email
            }
        });

    } catch (error) {

        console.error("LOGIN ERROR:", error);

        res.status(500).json({
            message: "Login failed",
            error: error.message
        });

    }

});


module.exports = router;