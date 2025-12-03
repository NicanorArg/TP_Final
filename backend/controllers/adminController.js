const {Producto, Usuario, Venta, VentaDetalle} =  require('../model/core');

const showLogin = (req, res) => {
    res.render('admin/login', {
        titulo: 'Dadisimo - Admin Login',
        error: null
    });
};

const processLogin = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        const user = await Usuario.findOne({ where: {correo, activo: true } });

        if (!user) {
            return res.render('admin/login', {
                titulo: 'Dadisimo - Admin Login',
                error: 'Credenciales inválidas'
            });
        }

        const isPasswordValid = await user.verificarcontrasena(contrasena);

        if (!isPasswordValid) {
            return res.render('admin/login', {
                titulo: 'Dadisimo - Admin Login',
                error: 'Credenciales inválidas'
            });
        }

        res.redirect('/api/admin/dashboard');
    } catch (error) {
        res.render('admin/login', {
            titulo: 'Dadisimo - Admin Login',
            error: 'Error en el servidor'
        });
    }
};

const showDashboard = async (req, res) => {
    try {
        const productos = await Producto.findAll({order: [['tipo', 'DESC'], ['id', 'ASC']]});

        res.render('admin/dashboard', {
            titulo: 'Dadisimo - Admin Dashboard',
            productos
        });
    } catch (error) {
        res.status(500).send('Error al cargar el dashboard');
    }
};

const showFormNewProduct = (req, res) => {
    res.render('admin/producto-form', {
        titulo: 'Dadisimo - Nuevo Producto',
        producto: null,
        accion: 'crear'
    });
};

const showFormEditProduct = async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);
        if (!producto) {
            return res.status(404).send('Producto no encontrado');
        }

        res.render('admin/producto-form', {
            titulo: 'Dadisimo - Editar Producto',
            producto,
            accion: 'editar'
        });
    } catch (error) {
        res.status(500).send('Error al cargar el formulario de edición');
    }
};

const showVentas = async (req, res) => {
    try {
        const ventas = await Venta.findAll({
            include: [{ model: VentaDetalle }],
            order: [['fecha', 'DESC']]
        });

        res.render('admin/ventas', {
            titulo: 'Dadisimo - Gestión de Ventas',
            ventas
        });
    } catch (error) {
        res.status(500).send('Error al cargar las ventas');
    }
};
module.exports = {
    showLogin,
    processLogin,
    showDashboard,
    showFormNewProduct,
    showFormEditProduct,
    showVentas
};