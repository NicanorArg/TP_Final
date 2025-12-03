const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { validarLogin } = require('../middleware/validaciones');

router.post('/login', validarLogin ,usuarioController.login);
router.post('/register', usuarioController.crearUsuario);

module.exports = router;