const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/venta');
const { validarVenta } = require('../middleware/validaciones');

router.post('/', validarVenta, ventaController.crearVenta);
router.get('/', ventaController.listarVentas);
router.get('/:id', ventaController.obtenerVenta);

module.exports = router;