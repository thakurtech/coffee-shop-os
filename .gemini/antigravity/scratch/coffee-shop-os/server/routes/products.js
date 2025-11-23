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
        // If file doesn't exist or is empty, return default structure
        return { products: [], orders: [] };
    }
};

const writeDB = async (data) => {
    await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
};

// Get all products
router.get('/', async (req, res) => {
    try {
        const db = await readDB();
        res.json(db.products || []);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a product
router.post('/', async (req, res) => {
    try {
        const db = await readDB();
        const newProduct = {
            id: Date.now().toString(),
            _id: Date.now().toString(), // For frontend compatibility
            ...req.body,
            available: true
        };
        if (!db.products) db.products = [];
        db.products.push(newProduct);
        await writeDB(db);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a product
router.delete('/:id', async (req, res) => {
    try {
        const db = await readDB();
        if (db.products) {
            db.products = db.products.filter(p => p.id !== req.params.id && p._id !== req.params.id);
            await writeDB(db);
        }
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
