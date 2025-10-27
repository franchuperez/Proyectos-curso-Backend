const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');

const productManager = new ProductManager();

router.get('/', async (req, res) => {
try {
    const products = await productManager.getAll();
    res.json(products);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

router.get('/:pid', async (req, res) => {
try {
    const product = await productManager.getById(req.params.pid);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

router.post('/', async (req, res) => {
try {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).json(newProduct);
} catch (err) {
    res.status(400).json({ error: err.message });
}
});

router.put('/:pid', async (req, res) => {
try {
    const updated = await productManager.updateProduct(req.params.pid, req.body);
    if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(updated);
} catch (err) {
    res.status(400).json({ error: err.message });
}
});

router.delete('/:pid', async (req, res) => {
try {
    const deleted = await productManager.deleteProduct(req.params.pid);
    if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

module.exports = router;
