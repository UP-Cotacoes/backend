const { JsonWebTokenError } = require("jsonwebtoken");

const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../config/auth');

module.exports.authMiddleware = async function (req, res, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.json({status: 'Não autorizado'});
    const [, token] = authHeader.split(' ');
    
    try {
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);
        req.body.id = decoded.id;
        return next();
    } catch(err) {
        return res.json({status: 'Token inválido'});
    }
    return next();
}