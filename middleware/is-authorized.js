const jwt = require('jsonwebtoken');
const { Error } = require('mongoose');

module.exports = (req, res, next) => {
    if (!req.get('Authorization')) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'securitykeyforpassword');
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
}