const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { addStudent, getStudents } = require('../controllers/studentController');

router.post('/', auth, addStudent);
router.get('/', auth, getStudents);

module.exports = router;
