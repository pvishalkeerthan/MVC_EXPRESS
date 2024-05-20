const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: String,
    rollno: String,
    course: String
});

module.exports = mongoose.model('Student', studentSchema);
