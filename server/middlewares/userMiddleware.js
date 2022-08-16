const expressJwt = require('express-jwt');

const requireSignin = expressJwt.expressjwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"] 
});

module.exports = {
    requireSignin
}