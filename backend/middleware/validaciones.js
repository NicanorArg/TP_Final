const validarProducto = (req, res, next) => {
  const { nombre, tipo, precio } = req.body;
  
  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ error: 'El nombre es requerido' });
  }
  
  if (!tipo || !['mini', 'dado'] === '') {
    return res.status(400).json({ error: 'Falta especificar el tipo de producto' });
  }
  
  if (!precio || isNaN(precio) || precio <= 0) {
    return res.status(400).json({ error: 'El precio debe ser un número positivo' });
  }
  
  next();
};

const validarVenta = (req, res, next) => {
  const { nombreCliente, productos } = req.body;
  
  if (!nombreCliente || nombreCliente.trim() === '') {
    return res.status(400).json({ error: 'El nombre del cliente es requerido' });
  }
  
  if (!productos || !Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ error: 'Debe incluir al menos un producto' });
  }
  
  for (const producto of productos) {
    
    if (!producto.id || isNaN(producto.id)) {
      return res.status(400).json({ error: 'ID de producto inválido' });
    }
    
    if (!producto.cantidad || isNaN(producto.cantidad) || producto.cantidad <= 0) {
      return res.status(400).json({ error: 'La cantidad debe ser un número positivo' });
    }
  }
  next();
};

const validarLogin = (req, res, next) => {
  const { correo, contrasena } = req.body;
  
  if (!correo || !contrasena) {
    return res.status(400).json({ error: 'Correo y contrasena son requeridos' });
  }
  
  next();
};

module.exports = {
  validarProducto,
  validarVenta,
  validarLogin
};