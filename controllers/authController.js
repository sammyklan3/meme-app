const bcrypt = require("bcryptjs");
const passport = require("../config/passport-config");
const User = require("../models/User");
const generateUniqueId = require("../utils/utils.generateId");

// Register logic
const register = async (req, res) => {
    try {
        const { username, email, password, phoneNumber } = req.body;

        if (!username || !email || !password || !phoneNumber) {
            return res.status(400).json({ message: "All fields are required" });
        };

        const user_id = generateUniqueId(10);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            userId: user_id,
            username,
            password: hashedPassword,
            email,
            phoneNumber
        });

        return res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

// Loin logic
const login = async (req, res) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })
};

// Logout logic
const logout = async (req, res) => {
    req.logout();
    return res.redirect("/");
};

// Get profile logic
const getProfile = async (req, res) => {
    return res.json(req.user);
}

module.exports = { register, login, logout, getProfile }