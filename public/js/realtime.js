const socket = io();

const list = document.getElementById("productList");

// Actualizar lista
socket.on("updateProducts", products => {
    list.innerHTML = "";
    products.forEach(p => {
        const li = document.createElement("li");
        li.setAttribute('data-id', p.id);
        li.innerHTML = `
            <strong>${p.title}</strong> - $${p.price}
            <button class="delete-btn" data-id="${p.id}">Eliminar</button>
        `;
        list.appendChild(li);
    });
});

// Agregar producto
document.getElementById("addForm").addEventListener("submit", e => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const price = document.getElementById("price").value;

    socket.emit("newProduct", { title, price });

    e.target.reset();
});

// Eliminar producto desde botón en la lista
document.addEventListener("click", e => {
    if (e.target.classList.contains("delete-btn")) {
        const id = e.target.dataset.id;
        socket.emit("deleteProduct", id); // enviamos el ID del producto al servidor
    }
});
