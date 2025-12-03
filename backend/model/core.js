const sequelize = require('../config/db');
const Usuario = require('./Usuario');
const Producto = require('./Producto');
const Venta = require('./Venta');
const VentaDetalle = require('./VentaDetalle');

Producto.belongsToMany(Venta, {
    through: VentaDetalle,
    foreignKey: 'productoId',
    otherKey: 'ventaId'
});

Venta.belongsToMany(Producto, {
    through: VentaDetalle,
    foreignKey: 'ventaId',
    otherKey: 'productoId'
});

Venta.hasMany(VentaDetalle, { foreignKey: 'ventaId' });
VentaDetalle.belongsTo(Venta, { foreignKey: 'ventaId' });

Producto.hasMany(VentaDetalle, { foreignKey: 'productoId' });
VentaDetalle.belongsTo(Producto, { foreignKey: 'productoId' });

module.exports = {
    sequelize, 
    Usuario,
    Producto,
    Venta,
    VentaDetalle
};