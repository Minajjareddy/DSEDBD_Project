
const express = require("express");

const db = require("../db");
const authenticateToken = require("../middleware/auth");

const router = express.Router();


// GET PROFILE
router.get("/", authenticateToken, async (req, res) => {

    try {

        const [rows] = await db.execute(
            `SELECT
                profile_id,
                user_id,
                age,
                gender,
                blood_group,
                height_cm,
                weight_kg,
                allergies,
                chronic_conditions,
                emergency_contact,
                emergency_phone
             FROM health_profiles
             WHERE user_id = ?`,
            [req.user.user_id]
        );

        res.json(rows);

    } catch (error) {

        console.error("GET PROFILE ERROR:", error);

        res.status(500).json({
            message: "Failed to fetch profile",
            error: error.message
        });

    }

});


// SAVE / UPDATE PROFILE
router.post("/", authenticateToken, async (req, res) => {

    try {

        const {
            age,
            gender,
            blood_group,
            height,
            weight,
            allergies,
            existing_conditions,
            emergency_contact,
            emergency_phone
        } = req.body;


        // Check if profile already exists
        const [existing] = await db.execute(
            "SELECT profile_id FROM health_profiles WHERE user_id = ?",
            [req.user.user_id]
        );


        // UPDATE EXISTING PROFILE
        if (existing.length > 0) {

            await db.execute(
                `UPDATE health_profiles
                 SET age = ?,
                     gender = ?,
                     blood_group = ?,
                     height_cm = ?,
                     weight_kg = ?,
                     allergies = ?,
                     chronic_conditions = ?,
                     emergency_contact = ?,
                     emergency_phone = ?
                 WHERE user_id = ?`,
                [
                    age || null,
                    gender || null,
                    blood_group || null,
                    height || null,
                    weight || null,
                    allergies || null,
                    existing_conditions || null,
                    emergency_contact || null,
                    emergency_phone || null,
                    req.user.user_id
                ]
            );

        }

        // INSERT NEW PROFILE
        else {

            await db.execute(
                `INSERT INTO health_profiles
                 (
                    user_id,
                    age,
                    gender,
                    blood_group,
                    height_cm,
                    weight_kg,
                    allergies,
                    chronic_conditions,
                    emergency_contact,
                    emergency_phone
                 )
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    req.user.user_id,
                    age || null,
                    gender || null,
                    blood_group || null,
                    height || null,
                    weight || null,
                    allergies || null,
                    existing_conditions || null,
                    emergency_contact || null,
                    emergency_phone || null
                ]
            );

        }


        res.json({
            message: "Profile saved successfully"
        });


    } catch (error) {

        console.error("SAVE PROFILE ERROR:", error);

        res.status(500).json({
            message: "Failed to save profile",
            error: error.message
        });

    }

});


module.exports = router;

