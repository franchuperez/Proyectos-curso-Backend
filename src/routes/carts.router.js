const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');
const ProductManager = require('../managers/ProductManager');

const cartManager = new CartManager();
const productManager = new ProductManager();

// Crear carrito
router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener carrito con populate
router.get('/:cid', async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity = 1 } = req.body;

    const product = await productManager.getById(pid);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });

    const updatedCart = await cartManager.addProductToCart(cid, pid, quantity);
    if (!updatedCart) return res.status(404).json({ error: 'Carrito no encontrado' });

    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ⭐ NUEVO: Eliminar producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await cartManager.removeProductFromCart(cid, pid);
    if (!updatedCart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ⭐ NUEVO: Actualizar todo el carrito
router.put('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    
    if (!Array.isArray(products)) {
      return res.status(400).json({ error: 'Products debe ser un array' });
    }
    
    const updatedCart = await cartManager.updateCart(cid, products);
    if (!updatedCart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ⭐ NUEVO: Actualizar cantidad de un producto
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Quantity debe ser un número mayor a 0' });
    }
    
    const updatedCart = await cartManager.updateProductQuantity(cid, pid, quantity);
    if (!updatedCart) return res.status(404).json({ error: 'Carrito o producto no encontrado' });
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ⭐ NUEVO: Vaciar carrito
router.delete('/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const updatedCart = await cartManager.clearCart(cid);
    if (!updatedCart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;