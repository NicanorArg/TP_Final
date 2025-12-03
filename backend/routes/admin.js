const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/login', adminController.showLogin);
router.post('/login', adminController.processLogin);

router.get('/dashboard', adminController.showDashboard);

router.get('/productos/nuevo', adminController.showFormNewProduct);
router.get('/productos/editar/:id', adminController.showFormEditProduct);

router.get('/ventas', adminController.showVentas);

module.exports = router;