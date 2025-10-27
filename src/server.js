const express = require('express');
const productsRouter = require('./routes/products.router');
const cartsRouter = require('./routes/carts.router');

const app = express();
const PORT = 8080;

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/', (req, res) => {
res.send('API Productos y Carritos - Entrega 1 - Servidor corriendo');
});

app.use((req, res) => {
res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
