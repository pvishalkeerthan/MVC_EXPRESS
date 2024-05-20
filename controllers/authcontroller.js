const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render('login', { error: 'Invalid username or password' });
        }
        const token = jwt.sign({ userId: user._id }, "123");
        res.cookie('jwt', token, { httpOnly: true });
        res.redirect('/home');
        console.log('Login successful');
    } catch (err) {
        res.status(500).send('Error in login');
    }
};

exports.getRegister = (req, res) => {
    res.render('register');
};

exports.postRegister = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.render("../views/login");
        console.log('Registration successful');
    } catch (err) {
        res.status(500).send('Error in registration');
    }
};
