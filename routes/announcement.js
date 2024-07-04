const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createAnnouncement } = require('../controllers/announcementController');
const Announcement = require('../models/announcement');
// @route    POST api/announcements
// @desc     Create an announcement
// @access   Private

router.post('/', auth, createAnnouncement);


// GET all announcements
router.get('/', auth, async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.json(announcements);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;

