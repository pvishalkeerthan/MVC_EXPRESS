const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const dbConfig = require('./config/db');
const authController = require('./controllers/authcontroller');
const studentController = require('./controllers/studentcontroller');
const { authorizeToken } = require('./middlewares/authmiddlewares');
const methodOverride=require('method-override')
const flash = require('connect-flash');
app.use(cookieParser());
app.use(flash());

dbConfig.connect();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get('/login', authController.getLogin);
app.post('/login', authController.postLogin);
app.get('/register', authController.getRegister);
app.post('/register', authController.postRegister);
app.get('/students',authorizeToken, studentController.getNewStudentForm);
app.get('/students/new', authorizeToken,studentController.getStudents);
app.post('/students/new', studentController.postStudent);
app.get('/students/:id/edit',authorizeToken, studentController.getEditStudent);
app.put('/students/:id', studentController.updateStudent);

app.get('/home', (req, res) => {
    res.render('home');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
