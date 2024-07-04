const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    whatsappNumber: { type: String, required: true },
    level: { type: String, required: true },
    department: { type: String, required: true }
});
module.exports = mongoose.model('Student', StudentSchema);
