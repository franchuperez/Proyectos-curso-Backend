PreEntrega 2 – Servidor con Handlebars y WebSockets
Curso Backend – CoderHouse
Alumno: Fran Pérez
Descripción del proyecto

Este proyecto corresponde a la PreEntrega Nº2 del curso de Desarrollo Backend. El objetivo principal es integrar un motor de plantillas (Handlebars) y una comunicación en tiempo real mediante WebSockets utilizando Socket.io.

El sistema permite visualizar productos a través de dos vistas:

Home: muestra una lista de productos renderizados mediante Handlebars.

RealTimeProducts: actualiza la lista de productos en tiempo real ante la creación o eliminación de un producto.

Además, se mantiene la API REST desarrollada en la PreEntrega 1 para la administración de productos y carritos, utilizando persistencia mediante archivos JSON.

Tecnologías utilizadas

Node.js

Express

Express-Handlebars

Socket.io

UUID para generación de identificadores

File System (fs) para persistencia local

Nodemon para entorno de desarrollo

Características principales
Integración con Handlebars

El servidor utiliza Handlebars como motor de plantillas para renderizar vistas dinámicas tanto en la página principal como en la vista de actualización en tiempo real.

Comunicación en tiempo real

A través de Socket.io, el servidor mantiene comunicación bidireccional con los clientes. Esto permite actualizar automáticamente la lista de productos cuando un usuario agrega o elimina un producto, sin necesidad de recargar la página.

Formulario de interacción

La vista de actualización en tiempo real incluye formularios para:

Crear un nuevo producto

Eliminar un producto con un solo botón (sin necesidad de copiar el ID manualmente)

API REST

Se conserva y extiende la API creada en la primera entrega. A través de los endpoints /api/products y /api/carts es posible administrar productos y carritos, además de emitir eventos WebSocket desde las operaciones HTTP que modifican la estructura de datos.

Estructura del proyecto
Proyecto/
├── data/
│   ├── products.json
│   └── carts.json
├── public/
│   └── js/
│       └── realtime.js
├── views/
│   ├── home.handlebars
│   ├── realTimeProducts.handlebars
│   └── layouts/
│       └── main.handlebars
├── src/
│   ├── managers/
│   ├── routes/
│   └── server.js
└── README.md

Vistas principales
Home

Muestra la lista de productos cargados en el sistema utilizando Handlebars.

RealTimeProducts

Permite visualizar y modificar los productos en tiempo real. Los cambios se reflejan automáticamente en todos los clientes conectados gracias a Socket.io. Cada producto incluye un botón de eliminación, que envía el ID correspondiente al servidor para ser procesado.

Endpoints relevantes
Vistas renderizadas

GET /
Renderiza la vista home con la lista actual de productos.

GET /realtimeproducts
Renderiza la vista con funcionalidad en tiempo real.

API REST de productos

GET /api/products

GET /api/products/:pid

POST /api/products

PUT /api/products/:pid

DELETE /api/products/:pid

API REST de carritos

POST /api/carts

GET /api/carts/:cid

POST /api/carts/:cid/product/:pid

Instalación

Clonar el repositorio:

git clone https://github.com/franchuperez/TU-REPO.git
cd TU-REPO


Instalar dependencias:

npm install

Ejecución
Modo desarrollo
npm run dev

Modo producción
npm start


El servidor se ejecuta en:

http://localhost:8080/

Conclusión

Este proyecto implementa los conceptos fundamentales solicitados para la PreEntrega 2: uso de Handlebars, configuración de websockets, actualización en tiempo real de información y correcta estructuración de rutas y vistas. El sistema demuestra manejo de eventos, modularización del código y combinación efectiva entre HTTP tradicional y comunicación WebSocket.
