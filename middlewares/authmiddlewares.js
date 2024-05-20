const jwt = require('jsonwebtoken');

exports.authorizeToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        req.flash('error', 'Please log in to access this page');
        return res.render('login');
    }
    jwt.verify(token, "123", (err, decoded) => {
        if (err) {
            req.flash('error', 'Please log in to access this page');
            return res.render('login');
        }
        req.userId = decoded.userId;
        next();
    });
};
