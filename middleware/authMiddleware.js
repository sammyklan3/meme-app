const jwt = require("jsonwebtoken");
const Token = require("../models/Token");
require("dotenv").config();

const jwt_secret = process.env.JWT_SECRET;

// Function to generate access token
const generateAccessToken = async(userId) => {
    return jwt.sign({ userId }, jwt_secret, { expiresIn: '15m' });
};

// Function to generate refresh token
const generateRefreshToken = async(userId) => {
    const tokenValue = jwt.sign({ userId }, jwt_secret);
    // Save refresh token to the database
    await Token.create({ tokenValue, UserId: userId });
    return tokenValue;
};

// Middleware function to verify access token
const verifyAceessToken = async(req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({ message: "Access token is missing" });
    }

    jwt.verify(token, jwt_secret, (err, decoded) => {
        if(err){
            return res.status(403).json({ message: "Access token is invalid" });
        }

        req.user = decoded;
        next();
    });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAceessToken
}