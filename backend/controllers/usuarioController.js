const Usuario = require('../model/Usuario');

const login = async (req, res) => {
    try {
        const { correo, contrasena } = req.body;

        const usuario = await Usuario.findOne({ where: { correo, activo: true } });

        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const contrasenaValida = await usuario.verificarcontrasena(contrasena);

        if (!contrasenaValida) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        res.json({
            message: 'Inicio de sesión exitoso',
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

const crearUsuario = async (req, res) => {
    try {
        console.log('Body recibido:', req.body); // <-- AGREGA ESTO
        
        const { nombre, correo, contrasena } = req.body;

        const usuarioExiste = await Usuario.findOne({ where: { correo } });
        if (usuarioExiste) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        const usuario = await Usuario.create({ nombre, correo, contrasena, activo: true });

        res.status(201).json({
            mensaje: 'Usuario creado exitosamente',
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo
            }
        });
    } catch (error) {
        console.error('Error completo:', error); // <-- AGREGA ESTO
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

module.exports = {
    login,
    crearUsuario
};