const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const { sequelize } = require('./model/core');

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 3000;
const SYNC_STRATEGY = process.env.SYNC_STRATEGY || 'none';


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// ruta para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

// Rutas
app.use('/api/productos', require('./routes/productos'));
app.use('/api/ventas', require('./routes/ventas'));
app.use('/api/usuarios', require('./routes/usuarios'));

// Ruta vista admin
app.use('/api/admin', require('./routes/admin'));

// Sincronización de la base de datos y arranque del servidor
async function boot() {
    try {
        await sequelize.sync({ force: true });
        console.log('Base de datos recreada desde cero');

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Error al sincronizar la base de datos:', err);
    }
}

boot();