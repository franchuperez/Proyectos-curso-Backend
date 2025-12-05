const Product = require('../models/Products');

class ProductManager {
  // ⭐ NUEVO: Método con paginación y filtros
  async getAll(queryParams = {}) {
    try {
      const { limit = 10, page = 1, sort, query } = queryParams;
      
      // Construir filtro
      const filter = {};
      
      if (query) {
        // Permite buscar por categoría o por disponibilidad (status)
        if (query === 'available') {
          filter.status = true;
        } else {
          filter.category = query;
        }
      }
      
      // Opciones de paginación
      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        lean: true
      };
      
      // Ordenamiento por precio
      if (sort === 'asc') {
        options.sort = { price: 1 };
      } else if (sort === 'desc') {
        options.sort = { price: -1 };
      }
      
      const result = await Product.paginate(filter, options);
      return result;
    } catch (error) {
      throw new Error(`Error getting products: ${error.message}`);
    }
  }

  async getById(pid) {
    try {
      return await Product.findById(pid).lean();
    } catch (error) {
      throw new Error(`Error getting product: ${error.message}`);
    }
  }

  async addProduct(productData) {
    try {
      const newProduct = new Product(productData);
      await newProduct.save();
      return newProduct;
    } catch (error) {
      throw new Error(`Error adding product: ${error.message}`);
    }
  }

  async updateProduct(pid, fieldsToUpdate) {
    try {
      delete fieldsToUpdate._id; // No permitir actualizar el ID
      const updated = await Product.findByIdAndUpdate(
        pid,
        fieldsToUpdate,
        { new: true, runValidators: true }
      ).lean();
      return updated;
    } catch (error) {
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  async deleteProduct(pid) {
    try {
      const deleted = await Product.findByIdAndDelete(pid);
      return deleted ? true : false;
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }
}

module.exports = ProductManager;