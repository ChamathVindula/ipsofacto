const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

const router = express.Router();

// This route is used to register a new user
router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        const userExists = await User.findOne({ where: { email: email } });

        if (userExists) {
            return res
                .status(400)
                .json({ message: "Email already registered" });
        }
        await User.create({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: await bcrypt.hash(password, 8), // Hash the password
        });
        res.status(201).json({ message: "User registered" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// This route is used to login a user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        let passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const payload = { id: user.id, email: user.email };
        // Sign the token with the payload and secret
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        let userData = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
        };
        res.json({ token, user: userData });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports.router = router;
