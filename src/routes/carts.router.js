const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');
const ProductManager = require('../managers/ProductManager');

const cartManager = new CartManager();
const productManager = new ProductManager();

router.post('/', async (req, res) => {
try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

router.get('/:cid', async (req, res) => {
try {
    const cart = await cartManager.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart.products);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});


router.post('/:cid/product/:pid', async (req, res) => {
try {
    const { cid, pid } = req.params;

    const product = await productManager.getById(pid);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado (en productos)' });

    const updatedCart = await cartManager.addProductToCart(cid, pid, 1);
    if (!updatedCart) return res.status(404).json({ error: 'Carrito no encontrado' });

    res.json(updatedCart);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

module.exports = router;
