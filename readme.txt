# 🚀 Proyecto Backend - Entrega Final

## 📋 Cambios realizados

### ✅ Migración de JSON a MongoDB
- Modelos de Mongoose para Product y Cart
- Managers actualizados para usar MongoDB
- Populate para traer productos completos en carritos

### ✅ Nuevos endpoints de productos
- `GET /api/products` con paginación, filtros y ordenamiento
  - Query params: `limit`, `page`, `sort`, `query`
  - Respuesta estructurada con metadatos

### ✅ Nuevos endpoints de carritos
- `DELETE /api/carts/:cid/products/:pid` - Eliminar producto
- `PUT /api/carts/:cid` - Actualizar carrito completo
- `PUT /api/carts/:cid/products/:pid` - Actualizar cantidad
- `DELETE /api/carts/:cid` - Vaciar carrito

### ✅ Vistas con Handlebars
- `/products` - Listado con paginación
- `/products/:pid` - Detalle de producto
- `/carts/:cid` - Visualizar carrito

---

## 🔧 Instalación

### 1. Instalar dependencias
```bash
npm install
```

Esto instalará:
- mongoose
- mongoose-paginate-v2
- express
- express-handlebars
- socket.io
- uuid

### 2. Configurar MongoDB

**Opción A: MongoDB Local**
1. Instala MongoDB Community Edition
2. Ejecuta `mongod`
3. En `config/database.js` usa:
```javascript
const MONGODB_URI = 'mongodb://localhost:27017/ecommerce';
```

**Opción B: MongoDB Atlas (Cloud)**
1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crea un cluster gratuito
3. Obtén tu connection string
4. En `config/database.js` usa:
```javascript
const MONGODB_URI = 'mongodb+srv://usuario:password@cluster.mongodb.net/ecommerce';
```

### 3. Estructura de carpetas a crear

Crea estas carpetas y archivos:

```
PROYECTOS-CURSO-BACKEND/
├── config/
│   └── database.js          ← CREAR ESTE ARCHIVO
├── src/
│   ├── models/              ← CREAR ESTA CARPETA
│   │   ├── Product.js       ← CREAR ESTE ARCHIVO
│   │   └── Cart.js          ← CREAR ESTE ARCHIVO
│   ├── managers/            (ya existe)
│   │   ├── ProductManager.js  ← REEMPLAZAR
│   │   └── CartManager.js     ← REEMPLAZAR
│   ├── routes/              (ya existe)
│   │   ├── products.router.js ← REEMPLAZAR
│   │   └── carts.router.js    ← REEMPLAZAR
│   └── views/               (ya existe)
│       ├── products.handlebars      ← CREAR
│       ├── productDetail.handlebars ← CREAR
│       └── cart.handlebars          ← CREAR
├── server.js                ← REEMPLAZAR
└── package.json             ← REEMPLAZAR
```

### 4. Iniciar el servidor
```bash
npm run dev
```

---

## 🧪 Probar los endpoints

### Productos

**1. Listar productos con paginación**
```bash
GET http://localhost:8080/api/products?limit=5&page=1
```

**2. Filtrar por categoría**
```bash
GET http://localhost:8080/api/products?query=category:electronicos
```

**3. Filtrar por disponibilidad**
```bash
GET http://localhost:8080/api/products?query=status:true
```

**4. Ordenar por precio ascendente**
```bash
GET http://localhost:8080/api/products?sort=asc
```

**5. Combinación de filtros**
```bash
GET http://localhost:8080/api/products?limit=5&page=1&sort=desc&query=category:ropa
```

### Carritos

**1. Crear carrito**
```bash
POST http://localhost:8080/api/carts
```

**2. Agregar producto al carrito**
```bash
POST http://localhost:8080/api/carts/:cid/product/:pid
```

**3. Obtener carrito (con populate)**
```bash
GET http://localhost:8080/api/carts/:cid
```

**4. Actualizar cantidad de producto**
```bash
PUT http://localhost:8080/api/carts/:cid/products/:pid
Body: { "quantity": 5 }
```

**5. Eliminar producto del carrito**
```bash
DELETE http://localhost:8080/api/carts/:cid/products/:pid
```

**6. Actualizar todo el carrito**
```bash
PUT http://localhost:8080/api/carts/:cid
Body: {
  "products": [
    { "product": "productId1", "quantity": 2 },
    { "product": "productId2", "quantity": 3 }
  ]
}
```

**7. Vaciar carrito**
```bash
DELETE http://localhost:8080/api/carts/:cid
```

---

## 🌐 Vistas disponibles

- `http://localhost:8080/` - Home simple
- `http://localhost:8080/products` - Listado con paginación
- `http://localhost:8080/products/:pid` - Detalle de producto
- `http://localhost:8080/carts/:cid` - Ver carrito
- `http://localhost:8080/realtimeproducts` - Vista con WebSockets

---

## 📊 Poblar la base de datos

Puedes crear productos usando Postman o crear un script:

```javascript
// scripts/seed.js
const mongoose = require('mongoose');
const Product = require('./src/models/Product');

mongoose.connect('mongodb://localhost:27017/ecommerce');

const products = [
  {
    title: "Laptop HP",
    description: "Laptop de alto rendimiento",
    code: "LAP001",
    price: 15000,
    stock: 10,
    category: "electronicos"
  },
  {
    title: "Mouse Logitech",
    description: "Mouse inalámbrico",
    code: "MOU001",
    price: 500,
    stock: 50,
    category: "accesorios"
  }
  // ... más productos
];

Product.insertMany(products)
  .then(() => {
    console.log('Productos creados');
    mongoose.disconnect();
  });
```

---

## ✨ Características implementadas

✅ Paginación con mongoose-paginate-v2  
✅ Filtros por categoría y disponibilidad  
✅ Ordenamiento por precio (asc/desc)  
✅ Populate en carritos para traer productos completos  
✅ CRUD completo de productos  
✅ CRUD completo de carritos  
✅ Vistas con Handlebars  
✅ WebSockets para actualización en tiempo real  

---

## 🐛 Troubleshooting

**Error: Cannot find module 'mongoose'**
```bash
npm install mongoose mongoose-paginate-v2
```

**Error: connect ECONNREFUSED**
- Verifica que MongoDB esté corriendo
- Revisa la URI en `config/database.js`

**Error al crear producto: E11000 duplicate key**
- El código del producto ya existe
- Usa códigos únicos

---

## 📝 Notas

- Los IDs ahora son ObjectId de MongoDB (no UUID)
- Los archivos JSON en `src/data/` ya no se usan
- El populate trae los productos completos en los carritos
- localStorage se usa en el frontend para guardar el cartId del usuario