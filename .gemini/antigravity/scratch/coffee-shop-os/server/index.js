import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Database: Using local JSON file for reliability

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send('CoffeeShopOS API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Keep process alive
setInterval(() => { }, 10000);

process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
});
