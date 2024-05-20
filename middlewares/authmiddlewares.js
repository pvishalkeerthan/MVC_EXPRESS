const jwt = require('jsonwebtoken');

exports.authorizeToken = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.render('login');
    }
    jwt.verify(token, "123", (err, decoded) => {
        if (err) {
            return res.render('login');
        }
        req.userId = decoded.userId;
        next();
    });
};
