import express from 'express';
import cors from 'cors';
import productRoutes from './products/product.routes.js';
import authRoutes from './auth/auth.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/login', authRoutes);
app.use('/products', productRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

export default app;
