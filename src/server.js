import app from './app.js';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Inicializa la conexión a la base de datos
connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});