const jwt = require('jsonwebtoken')
require('dotenv').config();
const secret = process.env.secret;
function setUser(user){
    const payload = {
         ...user
    };
    return jwt.sign(payload, secret, {
        expiresIn: '24h', // Set expiration to 24 hours
      })
}
function getUser(token){
    if(!token) return null;
    return jwt.verify(token, secret);
}
module.exports = {setUser, getUser};