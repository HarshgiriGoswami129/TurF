const { LOGIN, REGISTRATION } = require("../models/login_registraion");
const bcrypt = require('bcryptjs');
const config = require('../config/jwt_config');
const jwt = require('jsonwebtoken');

// REGISTER USER
async function registrationUser(req, res) {
    try {
        const { fullName, email, birthDate, phoneNumber, password } = req.body;

        const existingUser = await REGISTRATION.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const registration = new REGISTRATION({
            fullName,
            email,
            birthDate,
            phoneNumber,
            password: hashedPassword
        });

        await registration.save();

        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

// GET USERS
async function getUser(req, res) {
    try {
        const users = await REGISTRATION.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

// LOGIN USER
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const loginUser = await REGISTRATION.findOne({ email });
        if (!loginUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, loginUser.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Wrong password' });
        }

        const token = jwt.sign({ userId: loginUser._id }, config.secret_key, {
            expiresIn: config.expiresIn,
        });

        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = { registrationUser, getUser, loginUser };
