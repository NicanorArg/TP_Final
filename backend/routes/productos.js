const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const { validarProducto } = require('../middleware/validaciones');

router.get('/', productoController.listarProductos);
router.get('/tipos', productoController.obtenerTipos);
router.get('/:id' , productoController.obtenerProductoPorId);
router.post('/', validarProducto, productoController.crearProducto);
router.put('/:id', validarProducto, productoController.actualizarProducto);
router.patch('/:id/estado', productoController.cambiarEstado);

module.exports = router;