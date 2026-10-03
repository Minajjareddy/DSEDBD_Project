
const express = require("express");

const db = require("../db");
const authenticateToken = require("../middleware/auth");

const router = express.Router();


// GET SYMPTOMS
router.get("/", authenticateToken, async (req, res) => {

    try {

        const [rows] = await db.execute(
            `SELECT
                symptom_id,
                user_id,
                symptom_name,
                description,
                severity,
                start_date,
                status,
                created_at
             FROM symptoms
             WHERE user_id = ?
             ORDER BY symptom_id DESC`,
            [req.user.user_id]
        );

        res.json(rows);

    } catch (error) {

        console.error("GET SYMPTOMS ERROR:", error);

        res.status(500).json({
            message: "Failed to fetch symptoms",
            error: error.message
        });

    }

});


// ADD SYMPTOM
router.post("/", authenticateToken, async (req, res) => {

    try {

        const {
            symptom,
            severity,
            description,
            status,
            symptom_date
        } = req.body;


        const [result] = await db.execute(
            `INSERT INTO symptoms
            (
                user_id,
                symptom_name,
                description,
                severity,
                start_date,
                status
            )
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                req.user.user_id,
                symptom,
                description || null,
                severity || null,
                symptom_date || new Date(),
                status || "Active"
            ]
        );


        res.status(201).json({
            message: "Symptom added successfully",
            symptom_id: result.insertId
        });


    } catch (error) {

        console.error("ADD SYMPTOM ERROR:", error);

        res.status(500).json({
            message: "Failed to add symptom",
            error: error.message
        });

    }

});


// DELETE SYMPTOM
router.delete("/:id", authenticateToken, async (req, res) => {

    try {

        await db.execute(
            `DELETE FROM symptoms
             WHERE symptom_id = ?
             AND user_id = ?`,
            [
                req.params.id,
                req.user.user_id
            ]
        );


        res.json({
            message: "Symptom deleted successfully"
        });


    } catch (error) {

        console.error("DELETE SYMPTOM ERROR:", error);

        res.status(500).json({
            message: "Failed to delete symptom",
            error: error.message
        });

    }

});


module.exports = router;

