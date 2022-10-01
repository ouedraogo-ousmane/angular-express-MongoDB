const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

module.exports = function(req, res, next) {

    const token = req.header('authentification-token');

    if (!token) return res.status(401).send('Access Denied');

    try {

        const verified = jwt.verify(token, process.env.TOKEN_SECRET);

        req.account = verified;

        next();

    } catch (err) {

        res.status(40).send('Invalid Token');

    }
}