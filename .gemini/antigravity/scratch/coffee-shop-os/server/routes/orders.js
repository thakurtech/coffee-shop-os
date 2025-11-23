import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, '../db.json');

const readDB = async () => {
    try {
        const data = await fs.readFile(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return { products: [], orders: [] };
    }
};

const writeDB = async (data) => {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
};

// Get all orders
router.get('/', async (req, res) => {
    try {
        const db = await readDB();
        res.json((db.orders || []).reverse());
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create an order
router.post('/', async (req, res) => {
    try {
        const db = await readDB();
        const newOrder = {
            _id: Date.now().toString(),
            ...req.body,
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        if (!db.orders) db.orders = [];
        db.orders.push(newOrder);
        await writeDB(db);
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update order status
router.patch('/:id', async (req, res) => {
    try {
        const db = await readDB();
        if (db.orders) {
            const orderIndex = db.orders.findIndex(o => o._id === req.params.id);
            if (orderIndex > -1) {
                db.orders[orderIndex].status = req.body.status;
                await writeDB(db);
                res.json(db.orders[orderIndex]);
            } else {
                res.status(404).json({ message: 'Order not found' });
            }
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;
