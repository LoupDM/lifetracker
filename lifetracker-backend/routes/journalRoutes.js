// routes/journalRoutes.js
const express = require('express');
const router = express.Router();
const Journal = require('../models/Journal');

// Get all journal entries
// This is like opening your journal and seeing all your past entries
router.get('/', async (req, res) => {
    try {
        // Find all entries and sort them by date, newest first
        const entries = await Journal.find().sort({ date: -1 });
        res.json(entries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new journal entry
// This is like starting a new page in your journal
router.post('/', async (req, res) => {
    try {
        const newEntry = await Journal.create({
            text: req.body.text,
            // If no date is provided, it will use the current date
            date: req.body.date || new Date()
        });
        res.status(201).json(newEntry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a specific journal entry
// This is like editing something you've already written
router.put('/:id', async (req, res) => {
    try {
        const updatedEntry = await Journal.findByIdAndUpdate(
            req.params.id,
            {
                text: req.body.text,
                // We'll keep the original date but add an 'edited' timestamp
                lastEdited: new Date()
            },
            { new: true } // This option returns the updated version
        );
        
        if (!updatedEntry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        
        res.json(updatedEntry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a journal entry
// This is like tearing out a page from your journal
router.delete('/:id', async (req, res) => {
    try {
        const deletedEntry = await Journal.findByIdAndDelete(req.params.id);
        
        if (!deletedEntry) {
            return res.status(404).json({ message: 'Entry not found' });
        }
        
        res.json({ message: 'Entry deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;