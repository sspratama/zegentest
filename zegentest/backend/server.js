const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs'); // Untuk membaca file YAML

dotenv.config();
const app = express();

// Middleware untuk parsing JSON
app.use(express.json());

// Swagger setup
const swaggerDocument = YAML.load(path.join(__dirname, './swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rute API
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Menyajikan file statis React (frontend)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

// Koneksi ke database dan server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
