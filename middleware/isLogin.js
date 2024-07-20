const User = require('../models/users.js');
const jwt = require('jsonwebtoken');

const isLogin = async (req, res,next) => {

    const token = req.headers["x-token"];
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        req.userId = decoded.userid;
        next();
    } catch (error) {
        res.status(401).send('Unauthorized');
    }
}

module.exports = isLogin;