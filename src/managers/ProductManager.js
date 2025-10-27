const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class ProductManager {
constructor(filePath) {
    this.path = filePath || path.join(__dirname, '../../data/products.json');
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

async getAll() {
    return await this.#readFile();
}

async getById(pid) {
    const products = await this.#readFile();
    return products.find(p => String(p.id) === String(pid)) || null;
}

async addProduct(productData) {
    const required = ['title','description','code','price','status','stock','category','thumbnails'];
    for (const field of required) {
    if (productData[field] === undefined) {
        throw new Error(`Falta campo obligatorio: ${field}`);
    }
    }

    const products = await this.#readFile();


    if (products.some(p => p.code === productData.code)) {
    throw new Error('El código del producto ya existe');
    }

    const newProduct = {
    id: uuidv4(),
    title: String(productData.title),
    description: String(productData.description),
    code: String(productData.code),
    price: Number(productData.price),
    status: Boolean(productData.status),
    stock: Number(productData.stock),
    category: String(productData.category),
    thumbnails: Array.isArray(productData.thumbnails) ? productData.thumbnails : []
    };

    products.push(newProduct);
    await this.#writeFile(products);
    return newProduct;
}

async updateProduct(pid, fieldsToUpdate) {
    const products = await this.#readFile();
    const idx = products.findIndex(p => String(p.id) === String(pid));
    if (idx === -1) return null;


    delete fieldsToUpdate.id;

    const updated = { ...products[idx], ...fieldsToUpdate };

    if (fieldsToUpdate.price !== undefined) updated.price = Number(fieldsToUpdate.price);
    if (fieldsToUpdate.stock !== undefined) updated.stock = Number(fieldsToUpdate.stock);
    if (fieldsToUpdate.status !== undefined) updated.status = Boolean(fieldsToUpdate.status);
    if (fieldsToUpdate.thumbnails !== undefined && !Array.isArray(fieldsToUpdate.thumbnails)) {
    updated.thumbnails = products[idx].thumbnails;
    }

    products[idx] = updated;
    await this.#writeFile(products);
    return updated;
}

async deleteProduct(pid) {
    const products = await this.#readFile();
    const idx = products.findIndex(p => String(p.id) === String(pid));
    if (idx === -1) return false;
    products.splice(idx,1);
    await this.#writeFile(products);
    return true;
}
}

module.exports = ProductManager;
