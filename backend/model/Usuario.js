const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  contrasena: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'usuarios_admin',
  timestamps: true
});

Usuario.beforeCreate(async (usuario) => {
  usuario.contrasena = await bcrypt.hash(usuario.contrasena, 10);
});

Usuario.prototype.verificarcontrasena = async function(contrasena) {
  return await bcrypt.compare(contrasena, this.contrasena);
};

module.exports = Usuario;