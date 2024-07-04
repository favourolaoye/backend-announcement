const Student = require('../models/student');
const Announcement = require('../models/announcement');
const twilio = require('twilio');
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

exports.createAnnouncement = async (req, res) => {
    const { title, content, level, department } = req.body;
    try {
        const announcement = new Announcement({ title, content, level, department });
        await announcement.save();

        const students = await Student.find({ level, department });
        students.forEach(student => {
            client.messages.create({
                body: `*${title}*\n${content}`,
                from: "whatsapp:+14155238886",
                to: `whatsapp:${student.whatsappNumber}`
            });
        });

        res.status(201).json({ msg: 'Announcement sent successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
