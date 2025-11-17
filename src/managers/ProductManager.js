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
    const products = await this.#readFile();

    // Si vienen pocos campos desde WebSocket, generamos valores por defecto
    const newProduct = {
        id: uuidv4(),
        title: productData.title ?? "Sin título",
        description: productData.description ?? "",
        code: productData.code ?? uuidv4().slice(0, 6),
        price: Number(productData.price ?? 0),
        status: productData.status !== undefined ? Boolean(productData.status) : true,
        stock: Number(productData.stock ?? 0),
        category: productData.category ?? "general",
        thumbnails: Array.isArray(productData.thumbnails) ? productData.thumbnails : []
    };

    // Verificar código duplicado
    if (products.some(p => p.code === newProduct.code)) {
        throw new Error("El código del producto ya existe");
    }

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
