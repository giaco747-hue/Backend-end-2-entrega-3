const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Reemplaza la URL si usas MongoDB Atlas
        await mongoose.connect('mongodb://127.0.0.1:27017/backend-2');
        console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    }
};

module.exports = connectDB;