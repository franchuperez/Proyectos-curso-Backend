const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class CartManager {
constructor(filePath) {
    this.path = filePath || path.join(__dirname, '../../data/carts.json');
}

async #readFile() {
    try {
    const data = await fs.readFile(this.path, 'utf8');
    return JSON.parse(data || '[]');
    } catch (err) {
    if (err.code === 'ENOENT') {
        await this.#writeFile([]);
        return [];
    }
    throw err;
    }
}

async #writeFile(data) {
    await fs.mkdir(path.dirname(this.path), { recursive: true });
    await fs.writeFile(this.path, JSON.stringify(data, null, 2), 'utf8');
}

async createCart() {
    const carts = await this.#readFile();
    const newCart = {
    id: uuidv4(),
    products: []
    };
    carts.push(newCart);
    await this.#writeFile(carts);
    return newCart;
}

async getCartById(cid) {
    const carts = await this.#readFile();
    return carts.find(c => String(c.id) === String(cid)) || null;
}

async addProductToCart(cid, pid, quantity = 1) {
    const carts = await this.#readFile();
    const idx = carts.findIndex(c => String(c.id) === String(cid));
    if (idx === -1) return null;

    const cart = carts[idx];

    const prodIdx = cart.products.findIndex(p => String(p.product) === String(pid));
    if (prodIdx === -1) {
    cart.products.push({ product: String(pid), quantity: Number(quantity) });
    } else {
    cart.products[prodIdx].quantity = Number(cart.products[prodIdx].quantity) + Number(quantity);
    }

    carts[idx] = cart;
    await this.#writeFile(carts);
    return cart;
}
}

module.exports = CartManager;
