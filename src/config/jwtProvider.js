const jwt = require('jsonwebtoken');


const SECRET_KEY = 'rkjhdsjc984kbfvhj##dklsmncbvg%%fhuewi$$jlkdsanb123vf'

const generateToken = (userId) => {
    const token = jwt.sign({userId}, SECRET_KEY, {expiresIn:'48h'});
    return token;
}

const getUserIdFromToken = (token) => {
    const decodedToken = jwt.verify(token,SECRET_KEY );
    return decodedToken.userId;
}

module.exports = {
    generateToken,
    getUserIdFromToken
}