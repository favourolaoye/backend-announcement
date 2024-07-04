const Student = require('../models/student');

exports.addStudent = async (req, res) => {
    const { name, whatsappNumber, level, department } = req.body;
    
    try {
        // Check for existing student with the same WhatsApp number
        let existingStudent = await Student.findOne({ whatsappNumber });
        if (existingStudent) {
            return res.status(400).json({ msg: 'Student with this WhatsApp number already exists' });
        }
        
        // Add new student
        let student = new Student({ name, whatsappNumber, level, department });
        await student.save();
        res.status(201).json({ msg: 'Student added successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
