const jwt = require("jsonwebtoken");

const SECRET_KEY = "your-secret-key"; //Replace with env var later

//Generate a token
function generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" }); //Token valid for 2 hours
}

//Verify a token
function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (err) {
        return null;
    }
}

module.exports = {
    generateToken,
    verifyToken,
};