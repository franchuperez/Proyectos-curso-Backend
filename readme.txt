PreEntrega 1 - API Productos y Carritos
Descripción

Servidor Node.js + Express que gestiona productos y carritos con persistencia en archivos JSON.
Incluye dos grupos de rutas (/api/products y /api/carts) implementadas con el router de Express.

Estructura

/api/products

GET / → Listar todos los productos.

GET /:pid → Obtener un producto por su ID.

POST / → Agregar un nuevo producto.

PUT /:pid → Actualizar un producto existente.

DELETE /:pid → Eliminar un producto.

/api/carts

POST / → Crear un nuevo carrito.

GET /:cid → Ver los productos de un carrito.

POST /:cid/product/:pid → Agregar un producto a un carrito (incrementa la cantidad si ya existe).

Persistencia:
Los datos se guardan en data/products.json y data/carts.json.

Requisitos

Node.js v16 o superior (recomendado)

Puerto predeterminado: 8080

Instalación

Clonar el repositorio:

git clone https://github.com/tuusuario/PreEntrega1-Backend.git
cd PreEntrega1-Backend


Instalar dependencias:

npm install

Ejecución

Iniciar el servidor con:

npm run dev


Servidor disponible en:
http://localhost:8080

Pruebas con Postman

Ejemplos de requests:

Obtener todos los productos:
GET http://localhost:8080/api/products

Agregar un nuevo producto:
POST http://localhost:8080/api/products
Body (JSON):

{
  "title": "Filtro de aceite",
  "description": "Filtro sintético para motor",
  "code": "FIL-001",
  "price": 1500,
  "status": true,
  "stock": 20,
  "category": "Mantenimiento",
  "thumbnails": []
}


Crear un carrito:
POST http://localhost:8080/api/carts

Agregar un producto al carrito:
POST http://localhost:8080/api/carts/:cid/product/:pid

Autor

Fran Pérez
Curso: Desarrollo Backend I - Coderhouse
Entrega N°1
