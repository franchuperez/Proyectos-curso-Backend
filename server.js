const express = require('express');
const { engine } = require('express-handlebars');
const mongoose = require('mongoose');

const productsRouter = require('./src/routes/products.router.js');
const cartsRouter = require('./src/routes/carts.router.js');
const viewsRouter = require('./src/routes/views.router.js');

const app = express();

// ⭐ Configurar Handlebars con helper multiply
app.engine('handlebars', engine({
  helpers: {
    multiply: (a, b) => a * b
  },
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// ⭐ Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/tu_base_de_datos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB conectado'))
.catch(err => console.error('❌ Error MongoDB:', err));

// ⭐ Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter); // Router de vistas

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
