const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');
const CartManager = require('../managers/CartManager');

const productManager = new ProductManager();
const cartManager = new CartManager();

// Vista de productos con paginación
router.get('/products', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    
    const result = await productManager.getAll({ limit, page, sort, query });
    
    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
    const buildLink = (pageNum) => {
      if (!pageNum) return null;
      const params = new URLSearchParams();
      if (limit) params.append('limit', limit);
      params.append('page', pageNum);
      if (sort) params.append('sort', sort);
      if (query) params.append('query', query);
      return `${baseUrl}/products?${params.toString()}`;
    };

    res.render('productshandlebars', {
      products: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: buildLink(result.prevPage),
      nextLink: buildLink(result.nextPage)
    });
  } catch (error) {
    res.status(500).send('Error al cargar productos');
  }
});

// Vista de detalle de producto
router.get('/products/:pid', async (req, res) => {
  try {
    const product = await productManager.getById(req.params.pid);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }
    res.render('productDetail', { product });
  } catch (error) {
    res.status(500).send('Error al cargar producto');
  }
});

// Vista de carrito
router.get('/carts/:cid', async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid);
    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }
    res.render('cart', { cart });
  } catch (error) {
    res.status(500).send('Error al cargar carrito');
  }
});

// Ruta raíz redirige a productos
router.get('/', (req, res) => {
  res.redirect('/products');
});

module.exports = router;