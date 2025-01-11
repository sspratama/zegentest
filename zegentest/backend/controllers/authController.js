const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register user
const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validasi input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Cek apakah username sudah ada
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash password sebelum menyimpan
        const hashedPassword = await bcrypt.hash(password, 10);

        // Membuat pengguna baru
        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error: error.message });
    }
};

// Login user
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validasi input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Cari pengguna berdasarkan username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verifikasi password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h',
                audience: 'yourApp',
                issuer: 'yourCompany'
            }
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

module.exports = { register, login };
