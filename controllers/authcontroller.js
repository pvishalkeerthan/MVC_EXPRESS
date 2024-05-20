const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const flash = require('connect-flash');

exports.getLogin = (req, res) => {
    res.render('login', { error: req.flash('error') }); // Pass error flash message to the view
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            req.flash('error', 'Invalid username or password');
            return res.redirect('/login');
        }
        const token = jwt.sign({ userId: user._id }, "123");
        res.cookie('jwt', token, { httpOnly: true });
        req.flash('success', 'Login successful!');
        res.redirect('/home');
        console.log('Login successful');
    } catch (err) {
        req.flash('error', 'Error in login');
        res.status(500).send('Error in login');
    }
};

exports.getRegister = (req, res) => {
    res.render('register', { error: req.flash('error') });
};

exports.postRegister = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        req.flash('success', 'Registration successful!');
        res.redirect('/login');
        console.log('Registration successful');
    } catch (err) {
        req.flash('error', 'Error in registration');
        res.status(500).send('Error in registration');
    }
};
