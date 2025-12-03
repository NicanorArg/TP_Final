const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const VentaDetalle = sequelize.define('VentaDetalle', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ventaId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  tableName: 'venta_detalles',
  timestamps: false
});

module.exports = VentaDetalle;