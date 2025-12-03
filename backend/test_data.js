const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
const sequelize = require('./config/db');
const Producto = require('./model/Producto');
const Usuario = require('./model/Usuario');
require('./model/Venta');
require('./model/VentaDetalle');


async function seed() {
    try {
        // Sincronizar modelos con la base de datos
        await sequelize.sync({ force: true});
        console.log('Base de datos sincronizada');

        // Verificar si ya existen productos
        const productosExistentes = await Producto.count();
        if (productosExistentes > 0) {
            console.log(`Ya existen ${productosExistentes} productos en la base de datos.`);
        }

        // Crear 10 productos de prueba
        const productos = [
            {
                nombre: 'Dado de 20 caras - Resina Premium',
                descripcion: 'Dado de 20 caras de alta calidad fabricado en resina premium. Perfecto para juegos de rol.',
                material: 'Resina',
                tipo: 'dado',
                precio: 15.99,
                stock: 50,
                imagen: "/images/d_20_resina_premium.jpeg",
                activo: true
            },
            {
                nombre: 'Miniatura Guerrero Orco',
                descripcion: 'Miniatura detallada de un guerrero orco lista para pintar. Incluye base.',
                material: 'Plástico',
                tipo: 'mini',
                precio: 8.50,
                stock: 30,
                imagen:"/images/guerrero_orco_mini.jpeg",
                activo: true
            },
            {
                nombre: 'Set de Dados de Metal',
                descripcion: 'Set completo de 7 dados (d4, d6, d8, d10, d12, d20, d100) en metal pulido.',
                material: 'Metal',
                tipo: 'dado',
                precio: 45.00,
                stock: 20,
                imagen: "/images/set_dados_metal.jpeg",
                activo: true
            },
            {
                nombre: 'Miniatura Mago Elfo',
                descripcion: 'Miniatura de mago elfo con báculo y capa. Detalles finos y listo para pintar.',
                material: 'Resina',
                tipo: 'mini',
                precio: 9.99,
                stock: 25,
                imagen: "/images/mini_mago_elfo.png",
                activo: true
            },
            {
                nombre: 'Dado de 6 caras - Madera',
                descripcion: 'Dado clásico de 6 caras tallado en madera de roble. Diseño elegante y natural.',
                material: 'Madera',
                tipo: 'dado',
                precio: 5.50,
                stock: 100,
                imagen: "/images/dado_madera.jpeg",
                activo: true
            },
            {
                nombre: 'Miniatura Dragón Rojo',
                descripcion: 'Impresionante miniatura de dragón rojo con alas desplegadas. Tamaño grande.',
                material: 'Plástico',
                tipo: 'mini',
                precio: 25.00,
                stock: 15,
                imagen: "/images/mini_dragon_rojo.jpeg",
                activo: true
            },
            {
                nombre: 'Dado de 12 caras - Acrílico',
                descripcion: 'Dado de 12 caras transparente en acrílico de colores. Incluye números dorados.',
                material: 'Acrílico',
                tipo: 'dado',
                precio: 12.75,
                stock: 40,
                imagen: "/images/d_12_acrilico.jpeg",
                activo: true
            },
            {
                nombre: 'Miniatura Paladín Humano',
                descripcion: 'Miniatura de paladín humano con armadura completa y espada. Muy detallada.',
                material: 'Metal',
                tipo: 'mini',
                precio: 11.25,
                stock: 35,
                imagen: "/images/mini_paladin_humano.jpeg",
                activo: true
            },
            {
                nombre: 'Set de Dados de Colores',
                descripcion: 'Set de 7 dados en diferentes colores neón. Perfecto para identificar rápidamente.',
                material: 'Plástico',
                tipo: 'dado',
                precio: 18.90,
                stock: 60,
                imagen: "/images/dados_colores.jpeg",
                activo: true
            },
            {
                nombre: 'Miniatura Esqueleto Guerrero',
                descripcion: 'Miniatura de esqueleto guerrero con espada y escudo. Ideal para campañas de fantasía oscura.',
                material: 'Plástico',
                tipo: 'mini',
                precio: 7.50,
                stock: 45,
                imagen: "/images/mini_esqueleto_guerrero.jpeg",
                activo: true
            }
        ];

        // Insertar productos
        for (const productoData of productos) {
            await Producto.create(productoData);
        }
        console.log('✓ 10 productos creados exitosamente');

        // Verificar si ya existe un usuario administrador
        const usuarioExistente = await Usuario.findOne({ where: { correo: 'admin@test.com' } });
        if (usuarioExistente) { 
            console.log('Ya existe un usuario administrador con el correo admin@test.com');
        } else {
            // Crear usuario administrador de prueba
            await Usuario.create({
                nombre: 'Administrador',
                correo: 'admin@test.com',
                contrasena: 'admin123',
                activo: true
            });
            console.log('✓ Usuario administrador creado exitosamente');
            console.log('  Correo: admin@test.com');
            console.log('  contrasena: admin123');
        }

        console.log('\n¡Seed completado exitosamente!');
        process.exit(0);
    } catch (error) {
        console.error('Error al ejecutar el seed:', error);
        process.exit(1);
    }
}

seed();

