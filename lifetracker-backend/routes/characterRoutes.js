// routes/characterRoutes.js
const express = require('express');
const router = express.Router();
const Character = require('../models/Character');

// Get character data
router.get('/', async (req, res) => {
    try {
        let character = await Character.findOne();
        if (!character) {
            // If no character exists, create one with default values
            character = await Character.create({
                name: 'New Character',
                stats: {
                    strength: { totalXP: 0 },
                    endurance: { totalXP: 0 },
                    vigor: { totalXP: 0 },
                    creativity: { totalXP: 0 },
                    knowledge: { totalXP: 0 },
                    wisdom: { totalXP: 0 }
                },
                quests: []
            });
        }
        res.json(character);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update character data
router.put('/', async (req, res) => {
    try {
        let character = await Character.findOne();
        if (character) {
            character = await Character.findByIdAndUpdate(
                character._id,
                req.body,
                { new: true }
            );
        } else {
            character = await Character.create(req.body);
        }
        res.json(character);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;