const Student = require('../models/student');

exports.getNewStudentForm = async(req, res) => {
    const students = await Student.find();
    res.render('new',{students});
};

exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.render('students', { students });
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
};

exports.postStudent = async (req, res) => {
    const { name, rollno, course } = req.body;
    const newStudent = new Student({ name, rollno, course });
    try {
        await newStudent.save();
        res.redirect('/students');
    } catch (err) {
        res.status(500).send('Error in adding student: ' + err.message);
    }
};

exports.getEditStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findById(id);
        res.render("editstudents", { student });
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
};

exports.updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, rollno, course } = req.body;
    try {
        await Student.findByIdAndUpdate(id, { name, rollno, course }, { new: true });
        res.redirect('/students');
    } catch (err) {
        res.status(500).send('Error in updating student: ' + err.message);
    }
};
