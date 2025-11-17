const express = require('express');
const productsRouter = require('./src/routes/products.router');
const cartsRouter = require('./src/routes/carts.router');
const ProductManager = require('./src/managers/ProductManager');

const path = require('path');
const { Server } = require('socket.io');
const exphbs = require('express-handlebars');

const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// HANDLEBARS
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Routers API
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Vista HOME
app.get('/', async (req, res) => {
    const pm = new ProductManager();
    const products = await pm.getAll();
    res.render('home', { products });
});

// Vista REALTIME
app.get('/realtimeproducts', async (req, res) => {
    const pm = new ProductManager();
    const products = await pm.getAll();
    res.render('realTimeProducts', { products });
});

// Servidor HTTP + WebSocket
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});

const io = new Server(httpServer);

// WEBSOCKETS
io.on("connection", async socket => {
    console.log("Cliente conectado");

    const pm = new ProductManager();

    // Enviar lista inicial
    socket.emit("updateProducts", await pm.getAll());

    // Crear producto desde WebSocket
    socket.on("newProduct", async data => {
        await pm.addProduct(data);
        io.emit("updateProducts", await pm.getAll());
    });

    // Eliminar producto
    socket.on("deleteProduct", async id => {
        await pm.deleteProduct(id);
        io.emit("updateProducts", await pm.getAll());
    });
});
