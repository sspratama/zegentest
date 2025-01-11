const express = require('express');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const protect = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Dapatkan daftar semua tugas
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: Daftar tugas berhasil didapatkan
 *       500:
 *         description: Terjadi kesalahan server
 */
router.get('/', protect, getTodos);

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Tambah tugas baru
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tugas berhasil ditambahkan
 *       400:
 *         description: Validasi input gagal
 */
router.post('/', protect, createTodo);

router.put('/:id', protect, updateTodo);
router.delete('/:id', protect, deleteTodo);

module.exports = router;
