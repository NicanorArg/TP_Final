import { getProductos } from "../../api/api.js";

let page = 1;
const limit = 10;
let filtroTipo = "";

const tbody = document.getElementById("productos-body");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// ===============================
//   CARGAR PRODUCTOS EN TABLA
// ===============================
async function cargarProductos() {
  try {
    const data = await getProductos(page, limit, filtroTipo);

    tbody.innerHTML = "";

    const productos = data.productos || data.rows || [];

    productos.forEach(prod => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${prod.id}</td>
        <td>
            ${prod.imagen 
              ? `<img src="http://localhost:3000${prod.imagen}" alt="${prod.nombre}">`
              : '<span>Sin imagen</span>'}
        </td>
        <td>${prod.nombre}</td>
        <td>${prod.tipo}</td>
        <td>${prod.descripcion}</td>
        <td>$${prod.precio}</td>
        <td>${prod.stock}</td>

        <!-- NUEVO: input cantidad -->
        <td>
            <input type="number" 
                   class="cantidad-input"
                   data-id="${prod.id}" 
                   min="1" 
                   value="1"
                   style="width: 60px;">
        </td>

        <td>
            <button class="btn-carrito"
                data-id="${prod.id}"
                data-nombre="${prod.nombre}"
                data-precio="${prod.precio}">
                Agregar
            </button>
        </td>
      `;

      const btn = tr.querySelector(".btn-carrito");

      // ===============================
      //   EVENTO: AGREGAR AL CARRITO
      // ===============================
      btn.addEventListener("click", function () {
        const id = btn.dataset.id;
        const nombre = btn.dataset.nombre;
        const precio = parseFloat(btn.dataset.precio);

        // Obtener la cantidad seleccionada
        const inputCantidad = tr.querySelector(`.cantidad-input[data-id="${id}"]`);
        const cantidad = parseInt(inputCantidad.value);

        if (!cantidad || cantidad < 1) {
          alert("Cantidad inválida");
          return;
        }

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        const existente = carrito.find(item => item.id == id);

        if (existente) {
          // Si ya existe → sumar cantidades
          existente.cantidad += cantidad;
        } else {
          carrito.push({
            id,
            nombre,
            precio,
            cantidad
          });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));

        console.log("Carrito actualizado:", carrito);
        alert(`Se agregaron ${cantidad} unidad(es) de "${nombre}"`);
      });

      tbody.appendChild(tr);
    });

    prevBtn.disabled = page === 1;
    nextBtn.disabled = productos.length < limit;

  } catch (err) {
    console.error("No se pudieron cargar los productos:", err);
  }
}

// ===============================
//           FILTRO TIPO
// ===============================
const selectTipo = document.getElementById("filtroTipo");

selectTipo.addEventListener("change", () => {
  filtroTipo = selectTipo.value;
  page = 1;
  cargarProductos();
});

// ===============================
//          PAGINACIÓN
// ===============================
prevBtn.addEventListener("click", () => {
  if (page > 1) {
    page--;
    cargarProductos();
  }
});

nextBtn.addEventListener("click", () => {
  page++;
  cargarProductos();
});

// ===============================
//    CARGAR AL INICIAR
// ===============================
cargarProductos();
