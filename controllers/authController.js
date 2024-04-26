const bcrypt = require("bcryptjs");
const passport = require("../config/passport-config");
const User = require("../models/User");
const generateUniqueId = require("../utils/utils.generateId");
const { generateAccessToken, generateRefreshToken, verifyAceessToken } = require("../middleware/authMiddleware");

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

        // Generate access token
        const accessToken = await generateAccessToken(user.userId);
        const refreshToken = await generateRefreshToken(user.userId);

        return res.status(201).json({ message: "User created successfully", user, accessToken, refreshToken });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

// Loin logic
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    };

    try {
        // Find user by email
        const user = await User.findOne({ where: { email } });

        // If not found or password does not match
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate access token
        const accessToken = await generateAccessToken(user.userId);
        const refreshToken = await generateRefreshToken(user.userId);

        /* 
            In a real application, you would store the refresh token securely (e.g., in a database)
            Here, we're just sending it in the response for simplicity
        */

        return res.status(200).json({ message: "User logged in successfully", accessToken, refreshToken });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error logging in user", error: error.message });
    }
};

// Delete account logic
const deleteAccount = async (req, res) => {
    try {
        const user = await User.findOne({ where: { userId: req.user.userId } });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.destroy();
        return res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error deleting user", error: error.message });
    }
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

module.exports = { register, login, logout, getProfile, deleteAccount }