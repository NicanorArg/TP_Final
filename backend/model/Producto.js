const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');

const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    material: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    tipo: {
        type: DataTypes.ENUM('dado', 'mini'),
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    imagen: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'productos',
    timestamps: true
});

module.exports = Producto;