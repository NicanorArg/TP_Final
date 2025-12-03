const Producto = require('../model/Producto');

const listarProductos = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const activo = req.query.activo !== undefined ? req.query.activo === 'true' : undefined;
        const tipo = req.query.tipo;
        
        const where = {};
        if (activo !== undefined) {
        where.activo = activo;
        }
        if (tipo) {
        where.tipo = tipo;
        }

        const { count, rows } = await Producto.findAndCountAll({
            where,
            limit,
            offset,
            order: [['id', 'DESC']]
        });

        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            productos: rows.map(producto => producto.toJSON())
        });
    }  catch (error) { 
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

const crearProducto = async (req, res) => {
    try {
        const{
            nombre,
            descripcion,
            material,
            tipo,
            precio,
            stock,
        } = req.body;

        let imagen = null;

        if (req.files && req.files.imagen) {
            const file = req.files.imagen;
            const fileName = Date.now() + '-' + file.name;
            const uploadPath = __dirname + '/../public/images/' + fileName;
            
            await file.mv(uploadPath);
            imagen = '/images/' + fileName;
        }

        const producto = await Producto.create({
            nombre,
            descripcion,
            material,
            tipo,
            precio,
            stock,
            imagen,
            stock: stock || 0,
            activo: true
        });

        res.status(201).json(producto.toJSON());

    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const {
            nombre,
            descripcion,
            material,
            tipo,
            precio,
            stock
        } = req.body;

        let imagen = producto.imagen;

        if (req.files && req.files.imagen) {
            const file = req.files.imagen;
            const fileName = Date.now() + '-' + file.name;
            const uploadPath = __dirname + '/../public/images/' + fileName;

            await file.mv(uploadPath);
            imagen = '/images/' + fileName;
        }

        await producto.update({
            nombre,
            descripcion,
            material,
            tipo,
            precio,
            stock,
            imagen
        });

        res.json(producto.toJSON());
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

const cambiarEstado = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        await producto.update({ activo: !producto.activo });
        res.json(producto.toJSON());
    } catch (error) {
        res.status(500).json({ error: 'Error al cambiar el estado del producto' });
    }
};

const obtenerTipos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      attributes: ['tipo'],
      group: ['tipo']
    });
    
    const tipos = productos.map(p => p.tipo);
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    listarProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    cambiarEstado,
    obtenerTipos
};