// init.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user');
const config = require('./config.js');

const createDefaultAdminUser = async () => {
    try {
        // Conexión a la base de datos
        await mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

        // Verificar si existe un usuario administrador
        const adminExists = await User.findOne({ rol: 'admin' });

        if (!adminExists) {
            // Hash de la contraseña
            const hashedPassword = await bcrypt.hash('AdminPassword14@', 10);

            // Crear un nuevo usuario administrador
            const adminUser = new User({
                username: 'admin2@example.com',
                name: 'Admin User',
                password: hashedPassword,
                rol: 'admin',
            });

            // Guardar el usuario administrador en la base de datos
            await adminUser.save();
            console.log('Usuario administrador predeterminado creado exitosamente.');
        } else {
            console.log('Ya existe un usuario administrador en la base de datos.');
        }

        // Cerrar la conexión a la base de datos
        mongoose.connection.close();
    } catch (error) {
        console.error('Error al crear el usuario administrador predeterminado:', error);
    }
};

createDefaultAdminUser();
