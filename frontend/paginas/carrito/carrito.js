import { crearVenta } from "../../api/api.js";

// ===============================
//     CARGAR CARRITO
// ===============================
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ===============================
//     ACTUALIZAR TABLA
// ===============================
function renderCarrito() {
    const tbody = document.getElementById("carrito-body");
    const totalLabel = document.getElementById("total");

    let carrito = obtenerCarrito();
    tbody.innerHTML = "";

    let total = 0;

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${item.nombre}</td>
            <td>$${item.precio}</td>
            <td>
                <div class="cantidad-controls">
                    <button class="btn btn-warning btn-small" data-accion="restar" data-index="${index}">-</button>
                    <span>${item.cantidad}</span>
                    <button class="btn btn-warning btn-small" data-accion="sumar" data-index="${index}">+</button>
                </div>
            </td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-danger btn-small" data-accion="eliminar" data-index="${index}">Eliminar</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    totalLabel.textContent = `Total: $${total.toFixed(2)}`;
}

// ===============================
//     MANEJAR ACCIONES
// ===============================
document.addEventListener("click", e => {
    const accion = e.target.dataset.accion;
    const index = e.target.dataset.index;

    if (!accion) return;

    let carrito = obtenerCarrito();

    switch (accion) {
        case "sumar":
            carrito[index].cantidad++;
            break;

        case "restar":
            carrito[index].cantidad--;
            if (carrito[index].cantidad <= 0) carrito.splice(index, 1);
            break;

        case "eliminar":
            carrito.splice(index, 1);
            break;
    }

    guardarCarrito(carrito);
    renderCarrito();
});

// ===============================
//     VACIAR CARRITO
// ===============================
document.getElementById("vaciarCarrito").addEventListener("click", () => {
    localStorage.removeItem("carrito");
    renderCarrito();
});

// ===============================
//     REALIZAR COMPRA
// ===============================
document.getElementById("realizarCompra").addEventListener("click", async () => {
    const carrito = obtenerCarrito();
    const nombreUsuario = localStorage.getItem("nombreUsuario");

    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    try {
        const data = await crearVenta({
            nombreCliente: nombreUsuario || "Cliente Anónimo",
            productos: carrito
        });

        console.log("Venta creada:", data);
        alert("Compra realizada con éxito");

        sessionStorage.setItem("ultimaVenta", JSON.stringify(data));

        // Vaciar carrito local
        localStorage.removeItem("carrito");
        window.location.href = `../ticket/index.html`;

    } catch (err) {
        console.error("Error al procesar la compra:", err);
        alert("Error al procesar la compra: " + err.message);
    }
});
// ===============================
//     INICIALIZAR
// ===============================
renderCarrito();
