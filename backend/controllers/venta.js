const { parse } = require('dotenv');
const {Venta, VentaDetalle, Producto} = require('../model/core');

const crearVenta = async (req, res) => {
    try {
        const { nombreCliente, productos } = req.body;

        // Validación básica
        if (!nombreCliente || !productos || !Array.isArray(productos) || productos.length === 0) {
            return res.status(400).json({ error: 'Datos de venta incompletos' });
        }

        let precioTotal = 0;
        const ventaDetalles = [];

        // Recorrer productos
        for (const item of productos) {
            const productoId = Number(item.id);
            const cantidad = Number(item.cantidad);

            if (isNaN(productoId) || isNaN(cantidad) || cantidad < 1) {
                return res.status(400).json({ error: `Datos inválidos para el producto con ID ${item.id}` });
            }

            // Buscar producto en DB
            const producto = await Producto.findByPk(productoId);

            if (!producto || !producto.activo) {
                return res.status(404).json({ error: `Producto con ID ${item.id} no disponible` });
            }

            if (producto.stock < cantidad) {
                return res.status(400).json({ error: `Stock insuficiente para ${producto.nombre}. Hay ${producto.stock}, se pidieron ${cantidad}` });
            }

            const subtotal = producto.precio * cantidad;
            precioTotal += subtotal;

            // Guardar detalles
            ventaDetalles.push({
                productoId: producto.id,  // <-- CORRECTO, coincide con la FK
                cantidad,
                nombreProducto: producto.nombre,
                precioUnitario: producto.precio,
                subtotal
            });

            // Actualizar stock
            await producto.update({ stock: producto.stock - cantidad });
        }

        // Crear venta principal
        const venta = await Venta.create({
            nombreCliente,
            precioTotal,
            fecha: new Date()
        });

        // Crear detalles asociados
        for (const detalle of ventaDetalles) {
            await VentaDetalle.create({
                ventaId: venta.id,
                ...detalle // incluye productoId, cantidad, nombreProducto, precioUnitario, subtotal
            });
        }

        // Devolver venta completa con detalles
        const ventaCompleta = await Venta.findByPk(venta.id, {
            include: [{ 
              model: VentaDetalle,
              include: [Producto]
            }]
        });

        res.status(201).json(ventaCompleta);

    } catch (error) {
        console.error("Error en crearVenta:", error); // debug
        res.status(500).json({ error: error.message });
    }
};




const listarVentas = async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      include: [{ model: VentaDetalle}],
      order: [['fecha', 'DESC']]
    });
    
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerVenta = async (req, res) => {
  try {
    const venta = await Venta.findByPk(req.params.id, {
      include: [{ model: VentaDetalle}]
    });
    
    if (!venta) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    
    res.json(venta);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearVenta,
  listarVentas,
  obtenerVenta
};