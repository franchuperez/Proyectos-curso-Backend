const Cart = require('../models/Cart');

class CartManager {
  async createCart() {
    try {
      const newCart = new Cart({ products: [] });
      await newCart.save();
      return newCart;
    } catch (error) {
      throw new Error(`Error creating cart: ${error.message}`);
    }
  }

  async getCartById(cid) {
    try {
      // ⭐ POPULATE para traer productos completos
      const cart = await Cart.findById(cid)
        .populate('products.product')
        .lean();
      return cart;
    } catch (error) {
      throw new Error(`Error getting cart: ${error.message}`);
    }
  }

  async addProductToCart(cid, pid, quantity = 1) {
    try {
      const cart = await Cart.findById(cid);
      if (!cart) return null;

      const productIndex = cart.products.findIndex(
        p => p.product.toString() === pid
      );

      if (productIndex === -1) {
        cart.products.push({ product: pid, quantity });
      } else {
        cart.products[productIndex].quantity += quantity;
      }

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error adding product to cart: ${error.message}`);
    }
  }

  // ⭐ NUEVO: Eliminar producto del carrito
  async removeProductFromCart(cid, pid) {
    try {
      const cart = await Cart.findById(cid);
      if (!cart) return null;

      cart.products = cart.products.filter(
        p => p.product.toString() !== pid
      );

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error removing product: ${error.message}`);
    }
  }

  // ⭐ NUEVO: Actualizar todo el carrito
  async updateCart(cid, products) {
    try {
      const cart = await Cart.findByIdAndUpdate(
        cid,
        { products },
        { new: true, runValidators: true }
      );
      return cart;
    } catch (error) {
      throw new Error(`Error updating cart: ${error.message}`);
    }
  }

  // ⭐ NUEVO: Actualizar cantidad de un producto
  async updateProductQuantity(cid, pid, quantity) {
    try {
      const cart = await Cart.findById(cid);
      if (!cart) return null;

      const productIndex = cart.products.findIndex(
        p => p.product.toString() === pid
      );

      if (productIndex === -1) return null;

      cart.products[productIndex].quantity = quantity;
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error updating quantity: ${error.message}`);
    }
  }

  // ⭐ NUEVO: Vaciar carrito
  async clearCart(cid) {
    try {
      const cart = await Cart.findByIdAndUpdate(
        cid,
        { products: [] },
        { new: true }
      );
      return cart;
    } catch (error) {
      throw new Error(`Error clearing cart: ${error.message}`);
    }
  }
}

module.exports = CartManager;