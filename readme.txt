PreEntrega 1 - API Productos y Carritos

Descripción 
Servidor Node.js + Express que gestiona productos y carritos con persistencia en archivos JSON.

Estructura =
- `/api/products` rutas para manejar productos (GET, GET by id, POST, PUT, DELETE).
- `/api/carts` rutas para manejar carritos (crear, ver productos del carrito, agregar producto al carrito).
- Persistencia: `data/products.json` y `data/carts.json`.

Requisitos =
- Node 16+ (recomendado)
- Puerto: **8080**

Instalación =
1. Clonar repo.
2. Ejecutar:
```bash
npm install
