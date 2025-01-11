const express = require('express');
const { login } = require('../controllers/authController'); // Impor loginController
const router = express.Router();
const jwt = require('jsonwebtoken');

// Dummy User Login (simulasi)
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validasi user dummy
    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({ id: "64b5fd2e89400f01d44f9db0", username: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login pengguna
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login berhasil
 *       400:
 *         description: Email atau password salah
 */
router.post('/login', login);


module.exports = router;
